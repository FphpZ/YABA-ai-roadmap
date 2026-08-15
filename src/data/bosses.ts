export type Boss = {
  id: string;
  worldSlug: string;
  emoji: string;
  title: string;
  task: string;
  requiredScore: number;
  xp: number;
};

export const bosses: Boss[] = [
  {
    id: 'boss-foundations',
    worldSlug: 'foundations',
    emoji: '🧩',
    title: 'Boss : Le Professeur IA',
    task: "Ecris un prompt complet pour demander a l'IA d'expliquer la difference entre IA, Machine Learning et Deep Learning a un eleve de 3e a Ouagadougou, avec un exemple local et un resume en 3 points.",
    requiredScore: 75,
    xp: 250,
  },
  {
    id: 'boss-prompting',
    worldSlug: 'prompting',
    emoji: '✨',
    title: 'Boss : Le Prompt Ultime',
    task: "Ecris un prompt professionnel pour une couturiere de Bobo-Dioulasso qui veut annoncer sa nouvelle collection de tenues en wax sur WhatsApp : role, contexte, objectif, contraintes et format doivent tous etre presents.",
    requiredScore: 75,
    xp: 250,
  },
  {
    id: 'boss-reasoning',
    worldSlug: 'reasoning',
    emoji: '🧠',
    title: "Boss : L'Analyste",
    task: "Ecris un prompt qui demande a l'IA de decomposer un probleme complexe (lancer un service de livraison a moto) en etapes, de donner 2 arguments pour et 2 contre, puis de verifier sa propre reponse.",
    requiredScore: 75,
    xp: 250,
  },
  {
    id: 'boss-research',
    worldSlug: 'research',
    emoji: '🔎',
    title: "Boss : L'Enqueteur",
    task: "Ecris un prompt qui demande a l'IA de comparer 3 sources sur le prix du cacao en Afrique de l'Ouest, d'indiquer les convergences et divergences, et de citer ses sources.",
    requiredScore: 75,
    xp: 250,
  },
  {
    id: 'boss-creative-ai',
    worldSlug: 'creative-ai',
    emoji: '🎨',
    title: 'Boss : Le Directeur Artistique',
    task: "Ecris un prompt image detaille (sujet, style, composition, eclairage, ambiance) pour l'affiche d'un maquis qui fete ses 5 ans, avec un slogan court en bonus.",
    requiredScore: 75,
    xp: 250,
  },
  {
    id: 'boss-ai-coding',
    worldSlug: 'ai-coding',
    emoji: '💻',
    title: "Boss : L'Architecte Code",
    task: "Ecris un prompt qui demande a l'IA une fonction Python de gestion de stock (entree, sortie, alerte de seuil) avec docstring, 3 tests et un exemple d'utilisation.",
    requiredScore: 75,
    xp: 250,
  },
  {
    id: 'boss-automation',
    worldSlug: 'automation',
    emoji: '⚙️',
    title: "Boss : Le Chef d'Orchestre",
    task: "Ecris un prompt qui demande a l'IA de concevoir un workflow automatise : quand un client commande sur WhatsApp, resumer la commande, l'enregistrer dans un tableau et envoyer une confirmation, avec gestion des erreurs.",
    requiredScore: 75,
    xp: 250,
  },
  {
    id: 'boss-ai-agents',
    worldSlug: 'ai-agents',
    emoji: '🤖',
    title: "Boss : Le Createur d'Agents",
    task: "Ecris un prompt qui demande a l'IA de concevoir un agent pour une boutique : objectif, outils (web, base de donnees, WhatsApp), memoire et plan d'action en 4 etapes, avec les risques et limites.",
    requiredScore: 75,
    xp: 250,
  },
];