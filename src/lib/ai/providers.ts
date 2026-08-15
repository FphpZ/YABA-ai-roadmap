type AiResult = {
  text: string;
  provider: string;
  model: string;
};

const SYSTEM_PROMPT =
  'Tu es un assistant expert, clair et pratique. Tu reponds toujours en francais simple. Tu tiens compte du contexte africain (FCFA, WhatsApp, realites locales) quand c est pertinent.';

export type ProviderId = 'groq' | 'mistral' | 'gemini';

// Format compatible OpenAI (Groq, Mistral)
async function openAiCompatible(
  url: string,
  key: string,
  model: string,
  prompt: string,
  provider: string
): Promise<AiResult> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${provider} : erreur ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content ?? 'Pas de reponse.';

  return { text, provider, model };
}

// Format Gemini avec plusieurs modeles en fallback
async function gemini(key: string, prompt: string): Promise<AiResult> {
  // Liste des modeles Gemini a essayer dans l'ordre
  const models = [
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash-8b',
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Pas de reponse.';

        return { text, provider: 'Gemini', model };
      }

      // Si erreur 429 (quota) ou 404 (modele introuvable), on essaie le suivant
      const status = response.status;
      if (status === 429 || status === 404) {
        console.log(`Modele ${model} indisponible, essai du suivant...`);
        continue;
      }

      // Autre erreur, on la remonte
      const errorText = await response.text();
      throw new Error(`Gemini : erreur ${status} - ${errorText}`);
    } catch (error) {
      // Si c'est le dernier modele, on remonte l'erreur
      if (model === models[models.length - 1]) {
        throw error;
      }
      // Sinon on continue avec le modele suivant
      console.log(`Erreur avec ${model}, essai du suivant...`);
    }
  }

  throw new Error('Aucun modele Gemini disponible');
}

// Fonction principale avec fallback automatique entre providers
export async function generateAiResponse(
  prompt: string,
  preferredProvider?: ProviderId
): Promise<AiResult> {
  const groqKey = process.env.GROQ_API_KEY;
  const mistralKey = process.env.MISTRAL_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  // Ordre des providers a essayer
  const providerOrder: ProviderId[] = preferredProvider
    ? ([preferredProvider, 'groq', 'mistral', 'gemini'] as ProviderId[]).filter(
      (p, i, arr) => arr.indexOf(p) === i
    )
    : ['groq', 'mistral', 'gemini'];

  const errors: string[] = [];

  for (const providerId of providerOrder) {
    try {
      if (providerId === 'groq' && groqKey) {
        return await openAiCompatible(
          'https://api.groq.com/openai/v1/chat/completions',
          groqKey,
          'llama-3.3-70b-versatile',
          prompt,
          'Groq'
        );
      }

      if (providerId === 'mistral' && mistralKey) {
        return await openAiCompatible(
          'https://api.mistral.ai/v1/chat/completions',
          mistralKey,
          'mistral-small-latest',
          prompt,
          'Mistral'
        );
      }

      if (providerId === 'gemini' && geminiKey) {
        return await gemini(geminiKey, prompt);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erreur inconnue';
      errors.push(`${providerId}: ${message}`);
      console.error(`Erreur ${providerId}:`, message);
      // On continue avec le provider suivant
    }
  }

  throw new Error(
    `Tous les providers ont echoue:\n${errors.join('\n')}`
  );
}

// Retourne la liste des providers disponibles
export function getAvailableProviders(): { id: ProviderId; name: string; key: string }[] {
  const providers: { id: ProviderId; name: string; key: string }[] = [];

  if (process.env.GROQ_API_KEY) {
    providers.push({ id: 'groq', name: 'Groq (Llama 3.3 70B)', key: 'GROQ_API_KEY' });
  }
  if (process.env.MISTRAL_API_KEY) {
    providers.push({ id: 'mistral', name: 'Mistral (Small)', key: 'MISTRAL_API_KEY' });
  }
  if (process.env.GEMINI_API_KEY) {
    providers.push({ id: 'gemini', name: 'Gemini (Multi-modeles)', key: 'GEMINI_API_KEY' });
  }

  return providers;
}