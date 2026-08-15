import type { PromptScoreResult } from '@/types';

function clamp(value: number) {
  return Math.max(0, Math.min(20, Math.round(value)));
}

export function scorePrompt(prompt: string): PromptScoreResult {
  const text = prompt.trim();

  if (!text) {
    return {
      scores: {
        clarity: 0,
        context: 0,
        constraints: 0,
        objective: 0,
        format: 0,
      },
      total: 0,
      feedback: ['Écris un prompt avant de lancer l’analyse.'],
      aiResponse:
        'Aucun prompt détecté. Écris un prompt puis relance l’analyse.',
    };
  }

  const words = text.split(/\s+/).filter(Boolean);

  const hasRole =
    /rôle|role|tu es|vous êtes|en tant que|agir comme|expert|persona/i.test(
      text
    );

  const hasContext =
    /contexte|situation|entreprise|public|cible|audience|client|utilisateur|marché|pays|ville|ouagadougou|afrique/i.test(
      text
    );

  const hasConstraints =
    /contrainte|limites|éviter|eviter|interdit|ton|style|langue|français|francais|anglais|budget|délai|delai|nombre|maximum|minimum/i.test(
      text
    );

  const hasObjective =
    /objectif|but|mission|attendu|résultat|resultat|génère|genere|crée|cree|produis|fais|rédige|redige|plan|stratégie|strategie|analyse|synthèse|synthese/i.test(
      text
    );

  const hasFormat =
    /format|tableau|liste|json|markdown|étapes|etapes|puces|sections|titre|plan|structuré|structure|csv|html/i.test(
      text
    );

  const lengthBonus = Math.min(8, words.length / 6);

  const clarity = clamp(6 + lengthBonus + (hasObjective ? 6 : 0));
  const context = clamp(4 + (hasContext ? 10 : 0) + (words.length > 25 ? 4 : 0));
  const constraints = clamp(4 + (hasConstraints ? 10 : 0) + (hasRole ? 4 : 0));
  const objective = clamp(6 + (hasObjective ? 10 : 0));
  const format = clamp(4 + (hasFormat ? 12 : 0));

  const total = clarity + context + constraints + objective + format;

  const feedback: string[] = [];

  if (!hasRole) {
    feedback.push('Ajoute un rôle : “Agis comme un expert en…”');
  }

  if (!hasContext) {
    feedback.push(
      'Ajoute du contexte : public cible, entreprise, marché, situation.'
    );
  }

  if (!hasConstraints) {
    feedback.push(
      'Ajoute des contraintes : ton, langue, longueur, limites, style.'
    );
  }

  if (!hasObjective) {
    feedback.push('Précise l’objectif exact du prompt.');
  }

  if (!hasFormat) {
    feedback.push(
      'Demande un format : tableau, liste, JSON, plan, étapes, markdown.'
    );
  }

  if (feedback.length === 0) {
    feedback.push('Excellent prompt. Tu peux maintenant tester la réponse IA.');
  }

  const aiResponse = `Réponse simulée pour :\n\n"${text}"\n\nPour le moment, le Prompt Lab fonctionne en mode démonstration.\nEnsuite, tu pourras brancher une vraie API IA (OpenAI, Anthropic, Mistral, Gemini, etc.) dans src/app/api/prompt-score/route.ts ou créer une route dédiée.`;

  return {
    scores: {
      clarity,
      context,
      constraints,
      objective,
      format,
    },
    total,
    feedback,
    aiResponse,
  };
}