export type World = {
  id: string;
  slug: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  prerequisites: string[];
  skills: string[];
};

export type Tool = {
  id: string;
  name: string;
  category: string;
  description: string;
  level: string;
  url: string;
  alternatives: string[];
};

export type LibraryResource = {
  id: string;
  type: string;
  title: string;
  url?: string;
  description: string;
  tags: string[];
};

export type Project = {
  id: string;
  level: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
  title: string;
  description: string;
  objectives: string[];
  xp: number;
};

export type PromptScoreResult = {
  scores: {
    clarity: number;
    context: number;
    constraints: number;
    objective: number;
    format: number;
  };
  total: number;
  feedback: string[];
  aiResponse: string;
};

export type UserGoal = {
  id: string;
  emoji: string;
  fr: string;
  en: string;
};