import type { LibraryResource } from '@/types';

export const libraryResources: LibraryResource[] = [
  {
    id: 'resource-1',
    type: 'article',
    title: 'Comprendre les LLM',
    url: 'https://www.anthropic.com/index/introducing-claude',
    description:
      "Une introduction simple aux grands modèles de langage : tokens, contexte, limites et cas d'usage.",
    tags: ['LLM', 'Fondamentaux'],
  },
  {
    id: 'resource-2',
    type: 'video',
    title: 'Prompt Engineering pour débutants',
    url: 'https://www.youtube.com/results?search_query=prompt+engineering+tutorial',
    description:
      'Comment écrire des prompts clairs avec rôle, contexte, contraintes et format.',
    tags: ['Prompting', 'Débutant'],
  },
  {
    id: 'resource-3',
    type: 'exercise',
    title: 'Challenge : améliorer un prompt marketing',
    url: 'https://platform.openai.com/playground',
    description:
      'Transforme un prompt vague en prompt professionnel avec cible, objectif et format.',
    tags: ['Mission', 'Marketing'],
  },
  {
    id: 'resource-4',
    type: 'pdf',
    title: 'Guide des embeddings',
    url: 'https://platform.openai.com/docs/guides/embeddings',
    description:
      'Comprendre les embeddings et leur rôle dans la recherche sémantique et le RAG.',
    tags: ['Embeddings', 'RAG'],
  },
  {
    id: 'resource-5',
    type: 'docs',
    title: 'Documentation OpenAI',
    url: 'https://platform.openai.com/docs',
    description: 'Documentation officielle pour utiliser les API OpenAI.',
    tags: ['API', 'OpenAI'],
  },
  {
    id: 'resource-6',
    type: 'tool',
    title: 'Supabase',
    url: 'https://supabase.com',
    description:
      'Base de données PostgreSQL, authentification et stockage pour ton projet.',
    tags: ['Backend', 'Database'],
  },
  {
    id: 'resource-7',
    type: 'course',
    title: 'Construire un agent IA',
    url: 'https://www.deeplearning.ai/short-courses/',
    description:
      'Parcours pour comprendre la planification, les outils, la mémoire et les actions.',
    tags: ['Agents', 'Avancé'],
  },
  {
    id: 'resource-8',
    type: 'news',
    title: 'Veille IA',
    url: 'https://www.artificialintelligence-news.com/',
    description:
      'Suivre les nouveautés : modèles, outils, frameworks et usages professionnels.',
    tags: ['News', 'Veille'],
  },
];
