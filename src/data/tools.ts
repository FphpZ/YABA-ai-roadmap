import type { Tool } from '@/types';

export const tools: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'chat',
    description:
      'Assistant généraliste pour discuter, apprendre, coder, rédiger et raisonner.',
    level: 'Débutant',
    url: 'https://chatgpt.com',
    alternatives: ['Claude', 'Gemini', 'Mistral'],
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'chat',
    description:
      'Très utile pour l’analyse longue, la rédaction, le raisonnement et le code.',
    level: 'Débutant',
    url: 'https://claude.ai',
    alternatives: ['ChatGPT', 'Gemini', 'Mistral'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'chat',
    description:
      'Assistant multimodal de Google pour texte, image, recherche et productivité.',
    level: 'Débutant',
    url: 'https://gemini.google.com',
    alternatives: ['ChatGPT', 'Claude'],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'image',
    description: 'Génération d’images artistiques et stylisées.',
    level: 'Intermédiaire',
    url: 'https://midjourney.com',
    alternatives: ['Flux', 'DALL·E', 'Stable Diffusion'],
  },
  {
    id: 'flux',
    name: 'Flux',
    category: 'image',
    description:
      'Modèle de génération d’images puissant, utile pour les rendus réalistes.',
    level: 'Intermédiaire',
    url: 'https://blackforestlabs.ai',
    alternatives: ['Midjourney', 'DALL·E'],
  },
  {
    id: 'runway',
    name: 'Runway',
    category: 'video',
    description: 'Création et édition vidéo assistée par IA.',
    level: 'Intermédiaire',
    url: 'https://runwayml.com',
    alternatives: ['Pika', 'Kling'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'audio',
    description: 'Voix synthétiques réalistes et clonage vocal.',
    level: 'Débutant',
    url: 'https://elevenlabs.io',
    alternatives: ['Play.ht', 'Resemble AI'],
  },
  {
    id: 'suno',
    name: 'Suno',
    category: 'audio',
    description: 'Génération de musique à partir de texte.',
    level: 'Débutant',
    url: 'https://suno.com',
    alternatives: ['Udio'],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'code',
    description: 'Assistant de programmation intégré à l’éditeur.',
    level: 'Débutant',
    url: 'https://github.com/features/copilot',
    alternatives: ['Cursor', 'Codeium', 'Tabnine'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'code',
    description:
      'Éditeur IA pour générer, corriger et comprendre du code rapidement.',
    level: 'Intermédiaire',
    url: 'https://cursor.sh',
    alternatives: ['GitHub Copilot', 'Windsurf'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'research',
    description:
      'Moteur de recherche IA pour poser des questions avec sources.',
    level: 'Débutant',
    url: 'https://perplexity.ai',
    alternatives: ['You.com', 'Phind'],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'automation',
    description:
      'Automatisation de workflows entre applications sans forcément coder.',
    level: 'Débutant',
    url: 'https://zapier.com',
    alternatives: ['Make', 'n8n'],
  },
  {
    id: 'make',
    name: 'Make',
    category: 'automation',
    description:
      'Automatisation visuelle avancée pour connecter des services et API.',
    level: 'Intermédiaire',
    url: 'https://make.com',
    alternatives: ['Zapier', 'n8n'],
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'automation',
    description:
      'Automatisation open-source et flexible, très utile pour les agents.',
    level: 'Avancé',
    url: 'https://n8n.io',
    alternatives: ['Make', 'Zapier'],
  },
];