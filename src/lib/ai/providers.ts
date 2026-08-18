type AiResult = {
  text: string;
  provider: string;
  providerId: ProviderId;
  model: string;
};

const SYSTEM_PROMPT =
  'Tu es un assistant expert, clair et pratique. Tu reponds toujours en francais simple. Tu tiens compte du contexte africain (FCFA, WhatsApp, realites locales) quand c est pertinent.';

export type ProviderId = 'groq' | 'mistral' | 'gemini';

const PROVIDER_ORDER: ProviderId[] = ['groq', 'mistral', 'gemini'];

// Statuts pour lesquels il vaut la peine d'essayer le modele suivant :
// 404 = modele decommissionne, 429 = quota, 5xx = indisponibilite passagere.
// Un 401/403 vient de la cle : inutile d'insister sur les autres modeles.
const RETRYABLE_STATUS = new Set([404, 429, 500, 502, 503, 504]);

class ProviderHttpError extends Error {
  status: number;

  constructor(status: number, body: string) {
    super(`HTTP ${status} - ${body.slice(0, 300)}`);
    this.name = 'ProviderHttpError';
    this.status = status;
  }
}

// Permet de changer de modele sans redeploiement (GROQ_MODEL, MISTRAL_MODEL,
// GEMINI_MODEL) : c'est ce qui evite que des identifiants codes en dur
// deviennent obsoletes sans qu'on s'en apercoive.
function resolveModels(override: string | undefined, defaults: string[]): string[] {
  const preferred = override?.trim();
  if (!preferred) return defaults;
  return [preferred, ...defaults.filter((model) => model !== preferred)];
}

// Format compatible OpenAI (Groq, Mistral)
async function callOpenAiCompatible(
  url: string,
  key: string,
  model: string,
  prompt: string
): Promise<string> {
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
    throw new ProviderHttpError(response.status, await response.text());
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'Pas de reponse.';
}

// Format Gemini
async function callGemini(
  key: string,
  model: string,
  prompt: string
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new ProviderHttpError(response.status, await response.text());
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Pas de reponse.';
}

type ProviderConfig = {
  name: string;
  envKey: string;
  models: () => string[];
  call: (key: string, model: string, prompt: string) => Promise<string>;
};

const PROVIDERS: Record<ProviderId, ProviderConfig> = {
  groq: {
    name: 'Groq',
    envKey: 'GROQ_API_KEY',
    models: () =>
      resolveModels(process.env.GROQ_MODEL, [
        'openai/gpt-oss-120b',
        'openai/gpt-oss-20b',
      ]),
    call: (key, model, prompt) =>
      callOpenAiCompatible(
        'https://api.groq.com/openai/v1/chat/completions',
        key,
        model,
        prompt
      ),
  },

  mistral: {
    name: 'Mistral',
    envKey: 'MISTRAL_API_KEY',
    models: () =>
      resolveModels(process.env.MISTRAL_MODEL, [
        'mistral-small-latest',
        'mistral-medium-latest',
      ]),
    call: (key, model, prompt) =>
      callOpenAiCompatible(
        'https://api.mistral.ai/v1/chat/completions',
        key,
        model,
        prompt
      ),
  },

  gemini: {
    name: 'Gemini',
    envKey: 'GEMINI_API_KEY',
    models: () =>
      resolveModels(process.env.GEMINI_MODEL, [
        'gemini-3.6-flash',
        'gemini-3.5-flash',
        'gemini-flash-lite-latest',
        'gemini-3.1-flash-lite',
      ]),
    call: callGemini,
  },
};

// Essaie chaque modele du provider jusqu'a en trouver un qui repond.
async function callProvider(
  providerId: ProviderId,
  key: string,
  prompt: string
): Promise<AiResult> {
  const config = PROVIDERS[providerId];
  const failures: string[] = [];

  for (const model of config.models()) {
    try {
      const text = await config.call(key, model, prompt);
      return { text, provider: config.name, providerId, model };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'erreur inconnue';
      failures.push(`${model} -> ${message}`);

      const retryable =
        error instanceof ProviderHttpError && RETRYABLE_STATUS.has(error.status);
      if (!retryable) break;
    }
  }

  throw new Error(`${config.name} : ${failures.join(' | ')}`);
}

// Fonction principale avec fallback automatique entre providers
export async function generateAiResponse(
  prompt: string,
  preferredProvider?: ProviderId
): Promise<AiResult> {
  const order: ProviderId[] = preferredProvider
    ? [
        preferredProvider,
        ...PROVIDER_ORDER.filter((id) => id !== preferredProvider),
      ]
    : [...PROVIDER_ORDER];

  const errors: string[] = [];

  for (const providerId of order) {
    const config = PROVIDERS[providerId];
    const key = process.env[config.envKey];

    if (!key) {
      errors.push(`${config.name} : ${config.envKey} non configuree`);
      continue;
    }

    try {
      return await callProvider(providerId, key, prompt);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      errors.push(message);
      console.error(`[ai] ${providerId} indisponible : ${message}`);
    }
  }

  throw new Error(`Tous les providers ont echoue :\n${errors.join('\n')}`);
}

// Retourne la liste des providers disponibles.
// Le nom affiche inclut le modele reellement utilise, pour qu'il ne puisse
// plus se desynchroniser du code comme l'ancien libelle "Llama 3.3 70B".
export function getAvailableProviders(): {
  id: ProviderId;
  name: string;
  key: string;
}[] {
  return PROVIDER_ORDER.filter((id) => process.env[PROVIDERS[id].envKey]).map(
    (id) => {
      const config = PROVIDERS[id];
      return {
        id,
        name: `${config.name} (${config.models()[0]})`,
        key: config.envKey,
      };
    }
  );
}
