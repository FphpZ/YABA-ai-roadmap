import type { UserGoal } from '@/types';

export const LEVELS = [
  { level: 0, title: '👶 AI Curious', minXp: 0 },
  { level: 1, title: '🌱 AI Explorer', minXp: 100 },
  { level: 2, title: '💬 AI User', minXp: 250 },
  { level: 3, title: '⚡ Prompt Crafter', minXp: 500 },
  { level: 4, title: '🧠 Prompt Engineer', minXp: 900 },
  { level: 5, title: '🛠️ AI Builder', minXp: 1500 },
  { level: 6, title: '🤖 AI Engineer', minXp: 2400 },
  { level: 7, title: '🚀 AI Architect', minXp: 3600 },
  { level: 8, title: '👑 AI Expert', minXp: 5200 },
];

export function getLevel(xp: number) {
  const current =
    [...LEVELS].reverse().find((level) => xp >= level.minXp) ?? LEVELS[0];

  const next = LEVELS.find((level) => level.level === current.level + 1);

  const progress = next
    ? Math.min(
        100,
        ((xp - current.minXp) / (next.minXp - current.minXp)) * 100
      )
    : 100;

  return {
    ...current,
    next,
    progress,
  };
}

export const USER_GOALS: UserGoal[] = [
  {
    id: 'study',
    emoji: '🎓',
    fr: 'Étudier',
    en: 'Study',
  },
  {
    id: 'job',
    emoji: '💼',
    fr: 'Trouver un emploi',
    en: 'Find a job',
  },
  {
    id: 'startup',
    emoji: '🚀',
    fr: 'Créer une startup',
    en: 'Build a startup',
  },
  {
    id: 'developer',
    emoji: '💻',
    fr: 'Devenir développeur',
    en: 'Become a developer',
  },
  {
    id: 'content',
    emoji: '🎨',
    fr: 'Créer du contenu',
    en: 'Create content',
  },
  {
    id: 'business',
    emoji: '📈',
    fr: 'Développer mon entreprise',
    en: 'Grow my business',
  },
  {
    id: 'research',
    emoji: '🔬',
    fr: 'Faire de la recherche',
    en: 'Do research',
  },
  {
    id: 'expert',
    emoji: '🤖',
    fr: 'Devenir expert IA',
    en: 'Become an AI expert',
  },
];