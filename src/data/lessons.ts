export type Lesson = {
  id: string;
  worldSlug: string;
  title: string;
  minutes: number;
  xp: number;
  content: string[];
  keyPoints: string[];
};

export const lessons: Lesson[] = [
  // ============ FONDAMENTAUX (existant) ============
  {
    id: 'foundations-1',
    worldSlug: 'foundations',
    title: "C'est quoi l'Intelligence Artificielle ?",
    minutes: 3,
    xp: 20,
    content: [
      "L'IA est un ensemble de techniques qui permettent à des machines d'imiter des capacités humaines : reconnaître, comprendre, décider, créer.",
      "Au lieu de suivre une liste fixe de règles, la plupart des IA modernes apprennent à partir d'exemples : on leur montre des données, elles en déduisent des patterns.",
      "Dans AI ROADMAP, tu vas surtout utiliser des IA génératives : des modèles capables de produire du texte, des images, du code ou du son.",
    ],
    keyPoints: [
      "L'IA apprend à partir de données",
      "IA générative = produire du contenu",
      "Un modèle = un programme entraîné, pas une base de données",
    ],
  },
  {
    id: 'foundations-2',
    worldSlug: 'foundations',
    title: 'Machine Learning vs Deep Learning',
    minutes: 4,
    xp: 20,
    content: [
      "Machine Learning : la machine apprend automatiquement à partir de données, sans être programmée étape par étape.",
      "Deep Learning : une famille du machine learning qui utilise des réseaux de neurones à plusieurs couches, inspirés (de très loin) du cerveau.",
      "C'est le deep learning qui a rendu possibles les modèles récents : vision, traduction, puis les grands modèles de langage.",
    ],
    keyPoints: [
      "ML = apprendre à partir de données",
      "Deep Learning = réseaux de neurones profonds",
      "C'est lui qui a tout déclenché depuis 2012",
    ],
  },
  {
    id: 'foundations-3',
    worldSlug: 'foundations',
    title: 'LLM, tokens et fenêtre de contexte',
    minutes: 5,
    xp: 20,
    content: [
      "Un LLM (Large Language Model) est un modèle entraîné sur d'énormes quantités de texte pour prédire la suite d'un texte.",
      "Il ne lit pas des mots mais des tokens : des morceaux de mots. En français, 1 mot vaut environ 1,5 à 2 tokens.",
      "La fenêtre de contexte est la mémoire du modèle pendant une conversation : au-delà de cette limite, il oublie le début.",
    ],
    keyPoints: [
      "LLM = modèle qui prédit la suite du texte",
      "1 mot français ≈ 1,5 à 2 tokens",
      "Context window = mémoire limitée de la conversation",
    ],
  },
  {
    id: 'foundations-4',
    worldSlug: 'foundations',
    title: 'Hallucinations : toujours vérifier',
    minutes: 3,
    xp: 20,
    content: [
      "Un LLM ne « sait » rien : il prédit du texte plausible. Parfois, il invente des faits faux avec assurance : ce sont les hallucinations.",
      "Pour les réduire : donne du contexte, demande des sources, fais vérifier par un autre outil ou par toi-même.",
      "Règle d'or : l'IA propose, toi tu vérifies.",
    ],
    keyPoints: [
      "Hallucination = invention plausible mais fausse",
      "Toujours demander des sources",
      "L'IA propose, l'humain vérifie",
    ],
  },

  // ============ PROMPTING (existant) ============
  {
    id: 'prompting-1',
    worldSlug: 'prompting',
    title: "Anatomie d'un bon prompt",
    minutes: 4,
    xp: 20,
    content: [
      "Un bon prompt contient 5 briques : un rôle, un contexte, un objectif, des contraintes, un format.",
      "Exemple faible : « Fais-moi un plan marketing. » Exemple fort : « Agis comme un expert marketing. Contexte : petite entreprise à Ouagadougou. Objectif : plan sur 30 jours. Contraintes : budget faible. Format : tableau. »",
      "Plus le prompt est précis, moins le modèle improvise.",
    ],
    keyPoints: [
      "Rôle + Contexte + Objectif + Contraintes + Format",
      "Un prompt vague = une réponse générique",
      "La précision remplace la chance",
    ],
  },
  {
    id: 'prompting-2',
    worldSlug: 'prompting',
    title: 'Rôle et contexte',
    minutes: 4,
    xp: 20,
    content: [
      "Donner un rôle (« Agis comme un professeur de physique ») change le ton, le vocabulaire et la profondeur de la réponse.",
      "Le contexte (qui tu es, pour qui, pourquoi) évite les réponses génériques.",
      "Astuce : écris le contexte comme un brief pour un humain compétent qui découvre ton dossier.",
    ],
    keyPoints: [
      "Le rôle oriente le style et l'expertise",
      "Le contexte ancre la réponse dans ta réalité",
      "Briefe l'IA comme un collaborateur",
    ],
  },
  {
    id: 'prompting-3',
    worldSlug: 'prompting',
    title: 'Contraintes et format de sortie',
    minutes: 4,
    xp: 20,
    content: [
      "Les contraintes délimitent : longueur, ton, langue, choses à éviter.",
      "Le format structure : liste, tableau, JSON, étapes numérotées.",
      "Un format explicite rend la réponse directement utilisable : copier-coller, publication, ou intégration dans une application.",
    ],
    keyPoints: [
      "Contraintes = ce que l'IA ne doit pas faire",
      "Format = comment tu veux recevoir la réponse",
      "Format clair = réponse exploitable immédiatement",
    ],
  },

  // ============ REASONING ============
  {
    id: 'reasoning-1',
    worldSlug: 'reasoning',
    title: 'Décomposer avant de répondre',
    minutes: 4,
    xp: 20,
    content: [
      "Face à un problème complexe, demande à l'IA de le décomposer en étapes avant de répondre. C'est ce qu'on appelle Chain-of-Thought.",
      "Exemple de prompt : « Avant de répondre, énumère les 4 étapes nécessaires pour résoudre ce problème, puis traite-les une par une. »",
      "Résultat : moins d'hallucinations, meilleure qualité de raisonnement, réponse plus structurée.",
    ],
    keyPoints: [
      "Chain-of-Thought = penser étape par étape",
      "Décomposer = moins d'erreurs",
      "L'IA raisonne mieux quand on lui demande de le montrer",
    ],
  },
  {
    id: 'reasoning-2',
    worldSlug: 'reasoning',
    title: 'Demander une vérification',
    minutes: 3,
    xp: 20,
    content: [
      "Les modèles peuvent se relire et corriger leurs erreurs si on le leur demande.",
      "Prompt efficace : « Relis ta réponse. Identifie 2 faiblesses possibles, puis corrige-les. »",
      "Pour les calculs et les faits, toujours demander : « Vérifie tes chiffres » ou « Cite tes sources ».",
    ],
    keyPoints: [
      "La relecture réduit les erreurs",
      "Demander de critiquer sa propre réponse",
      "Toujours exiger une vérification pour les chiffres",
    ],
  },
  {
    id: 'reasoning-3',
    worldSlug: 'reasoning',
    title: 'Comparer plusieurs angles',
    minutes: 4,
    xp: 20,
    content: [
      "Pour une décision importante, demande 3 points de vue différents : pour, contre, et neutre.",
      "Prompt : « Donne-moi 3 arguments POUR, 3 arguments CONTRE, puis une synthèse neutre. »",
      "Tu peux aussi demander à 3 « experts fictifs » (un financier, un client, un technicien) de donner leur avis.",
    ],
    keyPoints: [
      "Multiples angles = décision éclairée",
      "Pour / Contre / Neutre = structure solide",
      "Experts fictifs = simulateur de conseil",
    ],
  },
  {
    id: 'reasoning-4',
    worldSlug: 'reasoning',
    title: 'Planification de tâches complexes',
    minutes: 5,
    xp: 20,
    content: [
      "Pour un projet, demande à l'IA un plan structuré avec jalons, ressources et risques.",
      "Structure type : objectif SMART → étapes → ressources nécessaires → risques → indicateurs de succès.",
      "Exemple local : « Plan pour lancer une boutique de tissus wax en 3 mois avec 500 000 FCFA de budget. »",
    ],
    keyPoints: [
      "Plan = Objectif + Étapes + Ressources + Risques",
      "Les jalons mesurent la progression",
      "Un bon plan anticipe les obstacles",
    ],
  },
  {
    id: 'reasoning-5',
    worldSlug: 'reasoning',
    title: 'Auto-évaluation et critique',
    minutes: 4,
    xp: 20,
    content: [
      "Après une réponse, demande à l'IA de s'évaluer : « Sur 10, combien donnes-tu à ta réponse et pourquoi ? »",
      "Tu peux aussi lui faire jouer le rôle d'un critique exigeant : « Tu es un client difficile. Critique ma proposition. »",
      "Cette boucle de feedback améliore les versions suivantes.",
    ],
    keyPoints: [
      "Auto-évaluation = prise de recul",
      "Critique fictive = stress-test",
      "Itérer sur les critiques = qualité qui monte",
    ],
  },

  // ============ RESEARCH ============
  {
    id: 'research-1',
    worldSlug: 'research',
    title: "Poser les bonnes questions à l'IA",
    minutes: 4,
    xp: 20,
    content: [
      "La qualité d'une recherche dépend de la précision de la question.",
      "Mauvais : « Parle-moi du cacao. » Bon : « Quel est le prix moyen du cacao en Côte d'Ivoire en 2025, et quels sont les 3 facteurs qui l'influencent le plus ? »",
      "Une bonne question contient : sujet + contexte + angle + format attendu.",
    ],
    keyPoints: [
      "Précision de la question = qualité de la réponse",
      "Sujet + Contexte + Angle + Format",
      "Une question vague = une recherche vague",
    ],
  },
  {
    id: 'research-2',
    worldSlug: 'research',
    title: 'Comparer des sources',
    minutes: 4,
    xp: 20,
    content: [
      "Ne jamais se fier à une seule source. Demande à l'IA de croiser au moins 3 sources différentes.",
      "Prompt : « Compare les informations de 3 sources différentes sur ce sujet et indique où elles s'accordent et où elles divergent. »",
      "Utilise Perplexity, les recherches web de ChatGPT ou Gemini pour obtenir des sources récentes.",
    ],
    keyPoints: [
      "Jamais une seule source",
      "Croiser = identifier les convergences",
      "Les divergences sont les signaux les plus utiles",
    ],
  },
  {
    id: 'research-3',
    worldSlug: 'research',
    title: 'Analyser un document long',
    minutes: 5,
    xp: 20,
    content: [
      "Tu peux uploader un PDF (rapport, contrat, étude) et demander à l'IA de l'analyser.",
      "Prompt type : « Résume ce document en 5 points. Liste les 3 informations les plus importantes. Identifie les risques. »",
      "Idéal pour : contrats, rapports financiers, études de marché, articles scientifiques.",
    ],
    keyPoints: [
      "Upload PDF = analyse instantanée",
      "Résumé + Top 3 + Risques = trio gagnant",
      "Idéal pour gagner du temps sur les longs documents",
    ],
  },
  {
    id: 'research-4',
    worldSlug: 'research',
    title: 'Construire une veille efficace',
    minutes: 4,
    xp: 20,
    content: [
      "Une veille = un système pour suivre automatiquement l'actualité d'un sujet.",
      "Demande à l'IA : « Liste les 5 sources les plus fiables pour suivre l'actualité de [mon domaine] et propose un rythme de consultation. »",
      "Outils utiles : Perplexity Discover, Google Alerts, flux RSS, newsletters spécialisées.",
    ],
    keyPoints: [
      "Veille = système, pas improvisation",
      "5 sources fiables + rythme régulier",
      "L'IA peut synthétiser ta veille chaque semaine",
    ],
  },

  // ============ CREATIVE AI ============
  {
    id: 'creative-1',
    worldSlug: 'creative-ai',
    title: "Anatomie d'un prompt image",
    minutes: 4,
    xp: 20,
    content: [
      "Un prompt image contient : sujet + style + composition + éclairage + ambiance.",
      "Exemple : « Portrait d'une vendeuse de tissus wax au marché de Bobo-Dioulasso, style photographie documentaire, lumière naturelle du matin, couleurs chaudes, cadrage serré. »",
      "Les outils principaux : Midjourney (artistique), Flux (réaliste), DALL-E (polyvalent), Stable Diffusion (personnalisable).",
    ],
    keyPoints: [
      "Sujet + Style + Composition + Éclairage + Ambiance",
      "Plus de détails = plus de contrôle",
      "Chaque outil a sa spécialité",
    ],
  },
  {
    id: 'creative-2',
    worldSlug: 'creative-ai',
    title: 'Styles et cohérence visuelle',
    minutes: 5,
    xp: 20,
    content: [
      "Pour une cohérence entre plusieurs images (ex : catalogue produits), utilise des références de style fixes : « style photo studio, fond blanc, lumière douce ».",
      "Certains outils acceptent des images de référence : tu uploades une image et l'IA en produit des variantes dans le même style.",
      "Midjourney : --sref pour partager un style. Flux : LoRA pour entraîner un style personnalisé.",
    ],
    keyPoints: [
      "Style fixe = cohérence entre images",
      "Image de référence = variantes cohérentes",
      "LoRA / sref = outils de style avancés",
    ],
  },
  {
    id: 'creative-3',
    worldSlug: 'creative-ai',
    title: 'Retouche et modification',
    minutes: 4,
    xp: 20,
    content: [
      "Tu peux modifier une image existante : changer un objet, ajuster les couleurs, retirer un élément.",
      "Outils : Photoshop Generative Fill, Inpainting dans Stable Diffusion, Magic Edit dans Canva.",
      "Prompt type : « Remplace le ciel gris par un ciel bleu avec quelques nuages, garde le reste identique. »",
    ],
    keyPoints: [
      "Modification = garder le contexte, changer un détail",
      "Inpainting = repeindre une zone",
      "Utile pour les retouches pro rapides",
    ],
  },
  {
    id: 'creative-4',
    worldSlug: 'creative-ai',
    title: 'Vidéo : scénario et storyboard',
    minutes: 5,
    xp: 20,
    content: [
      "Avant de générer une vidéo IA, écris un scénario : scène par scène, avec durée, action, dialogue, ambiance.",
      "Prompt : « Écris un scénario de 60 secondes pour promouvoir mon maquis, en 5 scènes de 12 secondes chacune. »",
      "Ensuite, transforme le scénario en storyboard visuel avec un outil d'image, puis génère la vidéo avec Runway, Pika ou Kling.",
    ],
    keyPoints: [
      "Scénario avant génération = contrôle total",
      "Storyboard visuel = guide pour la vidéo",
      "Scénario → Storyboard → Vidéo = workflow pro",
    ],
  },
  {
    id: 'creative-5',
    worldSlug: 'creative-ai',
    title: 'Audio : voix, musique et sound design',
    minutes: 4,
    xp: 20,
    content: [
      "Voix : ElevenLabs pour cloner ou synthétiser des voix en plusieurs langues (français, mooré, dioula).",
      "Musique : Suno ou Udio pour générer une musique originale à partir d'un style et d'un texte.",
      "Sound design : Freesound + ElevenLabs pour créer des ambiances sonores pour vidéos ou podcasts.",
    ],
    keyPoints: [
      "ElevenLabs = voix IA multilingues",
      "Suno/Udio = musique originale en 30 secondes",
      "Sound design = ambiance professionnelle",
    ],
  },

  // ============ AI FOR CODING ============
  {
    id: 'coding-1',
    worldSlug: 'ai-coding',
    title: "Générer du code avec l'IA",
    minutes: 4,
    xp: 20,
    content: [
      "L'IA peut générer du code dans n'importe quel langage : Python, JavaScript, PHP, SQL, etc.",
      "Prompt efficace : « Écris une fonction Python qui calcule le prix TTC d'un produit au Burkina, avec TVA de 18%. Inclus 3 exemples d'utilisation. »",
      "Outils : GitHub Copilot, Cursor, Claude, ChatGPT. Copilot est intégré à l'éditeur, les autres sont dans une conversation.",
    ],
    keyPoints: [
      "Prompt précis = code précis",
      "Inclure des exemples d'utilisation",
      "Copilot = intégré, Claude/ChatGPT = conversation",
    ],
  },
  {
    id: 'coding-2',
    worldSlug: 'ai-coding',
    title: 'Debugger avec l\'IA',
    minutes: 4,
    xp: 20,
    content: [
      "Copie-colle le message d'erreur ET le code qui plante dans la conversation IA.",
      "Prompt : « Ce code renvoie cette erreur : [erreur]. Explique la cause en une phrase, puis propose la correction avec un commentaire. »",
      "L'IA peut aussi lire des logs longs et identifier l'erreur principale.",
    ],
    keyPoints: [
      "Message d'erreur + code = diagnostic rapide",
      "Demander la cause avant la correction",
      "L'IA lit les logs mieux qu'un humain fatigué",
    ],
  },
  {
    id: 'coding-3',
    worldSlug: 'ai-coding',
    title: 'Refactoring et bonnes pratiques',
    minutes: 5,
    xp: 20,
    content: [
      "Le refactoring = améliorer le code sans changer son comportement.",
      "Prompt : « Refactorise ce code pour qu'il soit plus lisible, plus modulaire et respecte les bonnes pratiques de [langage]. »",
      "L'IA peut aussi expliquer du code existant : « Explique cette fonction ligne par ligne, comme à un débutant. »",
    ],
    keyPoints: [
      "Refactoring = code plus propre, même résultat",
      "Explication = comprendre du code legacy",
      "L'IA peut enseigner le code en le commentant",
    ],
  },
  {
    id: 'coding-4',
    worldSlug: 'ai-coding',
    title: 'Écrire des tests automatisés',
    minutes: 5,
    xp: 20,
    content: [
      "Les tests protègent ton code contre les régressions. L'IA peut les écrire pour toi.",
      "Prompt : « Écris des tests unitaires pour cette fonction avec pytest. Couvre les cas normaux, les cas limites et les cas d'erreur. »",
      "Une bonne suite de tests = confiance pour modifier le code plus tard.",
    ],
    keyPoints: [
      "Tests = filet de sécurité du code",
      "Cas normaux + limites + erreurs",
      "pytest (Python), jest (JS), unittest (PHP)",
    ],
  },
  {
    id: 'coding-5',
    worldSlug: 'ai-coding',
    title: 'Documentation automatique',
    minutes: 4,
    xp: 20,
    content: [
      "L'IA peut générer la docstring d'une fonction, un README complet, ou un guide utilisateur.",
      "Prompt : « Génère la docstring au format Google pour cette fonction Python, avec arguments, retour et exemple. »",
      "Pour un projet : « Écris un README avec : description, installation, utilisation, exemples, contribution. »",
    ],
    keyPoints: [
      "Docstring = doc intégrée au code",
      "README = porte d'entrée du projet",
      "Documentation générée en 1 prompt",
    ],
  },
  {
    id: 'coding-6',
    worldSlug: 'ai-coding',
    title: 'Git et GitHub avec l\'IA',
    minutes: 4,
    xp: 20,
    content: [
      "L'IA peut écrire un message de commit clair : « Résume ces changements en un message de commit de 50 caractères max, au présent. »",
      "Elle peut aussi expliquer un diff complexe, ou résoudre un conflit de merge en proposant la meilleure version.",
      "Outils : GitHub Copilot pour les commits, Claude pour expliquer les PRs.",
    ],
    keyPoints: [
      "Message de commit clair = historique lisible",
      "L'IA explique les diffs complexes",
      "Résolution de conflits assistée",
    ],
  },

  // ============ AUTOMATION ============
  {
    id: 'automation-1',
    worldSlug: 'automation',
    title: "C'est quoi un workflow automatisé ?",
    minutes: 4,
    xp: 20,
    content: [
      "Un workflow automatisé = une suite d'actions qui se déclenchent automatiquement quand un événement se produit.",
      "Exemple : « Quand je reçois un email avec une pièce jointe PDF, l'IA le résume et m'envoie le résumé sur WhatsApp. »",
      "Trois ingrédients : un déclencheur (trigger), des actions, et éventuellement des conditions.",
    ],
    keyPoints: [
      "Trigger + Actions + Conditions",
      "Gain de temps énorme sur les tâches répétitives",
      "Zapier, Make, n8n = outils principaux",
    ],
  },
  {
    id: 'automation-2',
    worldSlug: 'automation',
    title: 'Connecter des outils entre eux',
    minutes: 5,
    xp: 20,
    content: [
      "Les API permettent à des outils de communiquer entre eux. L'IA peut écrire le code pour appeler une API.",
      "Prompt : « Écris un script Python qui récupère tous les messages WhatsApp reçus aujourd'hui et les enregistre dans un Google Sheet. »",
      "Outils no-code : Make (visuel), Zapier (simple), n8n (open-source, puissant).",
    ],
    keyPoints: [
      "API = langage entre applications",
      "No-code = sans programmer",
      "Make pour visuel, n8n pour flexible",
    ],
  },
  {
    id: 'automation-3',
    worldSlug: 'automation',
    title: 'Automatiser avec des bases de données',
    minutes: 5,
    xp: 20,
    content: [
      "Une base de données stocke tes informations : clients, commandes, stocks. Supabase, Airtable, Notion sont populaires.",
      "Workflow exemple : « Quand un nouveau client s'inscrit sur mon site, l'ajouter à Airtable et lui envoyer un email de bienvenue. »",
      "L'IA peut écrire les requêtes SQL ou configurer les intégrations via API.",
    ],
    keyPoints: [
      "Base de données = mémoire de ton business",
      "Supabase = PostgreSQL + auth + stockage",
      "Airtable = tableur superpuissant",
    ],
  },
  {
    id: 'automation-4',
    worldSlug: 'automation',
    title: 'Workflows multi-outils',
    minutes: 5,
    xp: 20,
    content: [
      "Un workflow avancé combine plusieurs outils : un déclencheur → une IA → une base → une notification.",
      "Exemple : « Chaque matin, l'IA scanne les news de mon secteur, résume les 3 plus importantes, les enregistre dans Notion et me les envoie sur WhatsApp. »",
      "C'est la base des agents IA : des workflows intelligents qui prennent des décisions.",
    ],
    keyPoints: [
      "Multi-outils = systèmes puissants",
      "IA + Base + Notification = workflow pro",
      "Les agents = workflows intelligents",
    ],
  },
  {
    id: 'automation-5',
    worldSlug: 'automation',
    title: 'Gérer les erreurs et les logs',
    minutes: 4,
    xp: 20,
    content: [
      "Un workflow sans gestion d'erreur casse en silence. Toujours prévoir : que se passe-t-il si l'API tombe ? Si l'email est invalide ?",
      "Prompt : « Propose un système de gestion d'erreurs pour ce workflow : retry, notification, log. »",
      "Bonne pratique : logger chaque exécution et alerter en cas d'échec.",
    ],
    keyPoints: [
      "Toujours prévoir les erreurs",
      "Retry + Notification + Log",
      "Un workflow sans logs = un workflow aveugle",
    ],
  },

  // ============ AI AGENTS ============
  {
    id: 'agents-1',
    worldSlug: 'ai-agents',
    title: "C'est quoi un agent IA ?",
    minutes: 4,
    xp: 20,
    content: [
      "Un agent IA est un système autonome qui utilise un LLM pour planifier, utiliser des outils et atteindre un objectif.",
      "Différence avec un chat : le chat répond, l'agent agit (il cherche sur le web, appelle des API, écrit des fichiers).",
      "Architecture de base : Utilisateur → Agent (LLM + planificateur) → Outils (web, API, DB) → Résultat.",
    ],
    keyPoints: [
      "Agent = LLM + outils + autonomie",
      "Le chat répond, l'agent agit",
      "Planification + Outils + Mémoire = agent complet",
    ],
  },
  {
    id: 'agents-2',
    worldSlug: 'ai-agents',
    title: 'Les outils (tools) d\'un agent',
    minutes: 5,
    xp: 20,
    content: [
      "Les outils sont les « mains » de l'agent : recherche web, calculatrice, API, base de données, envoi d'email, etc.",
      "L'agent décide quel outil utiliser en fonction de la tâche : « Je dois trouver le prix du cacao → j'utilise l'outil de recherche web. »",
      "Frameworks : LangChain, CrewAI, AutoGen permettent de définir facilement des outils personnalisés.",
    ],
    keyPoints: [
      "Outils = mains de l'agent",
      "L'agent choisit l'outil selon la tâche",
      "LangChain / CrewAI = frameworks populaires",
    ],
  },
  {
    id: 'agents-3',
    worldSlug: 'ai-agents',
    title: 'La mémoire : court et long terme',
    minutes: 5,
    xp: 20,
    content: [
      "Mémoire court terme = la conversation en cours (context window du LLM).",
      "Mémoire long terme = stockage externe (base vectorielle comme Pinecone, ou base SQL) qui persiste entre les sessions.",
      "Exemple : un agent de service client se souvient des préférences d'un client même 6 mois après.",
    ],
    keyPoints: [
      "Court terme = conversation en cours",
      "Long terme = stockage persistant",
      "Mémoire vectorielle = recherche sémantique",
    ],
  },
  {
    id: 'agents-4',
    worldSlug: 'ai-agents',
    title: 'RAG : Retrieval Augmented Generation',
    minutes: 5,
    xp: 20,
    content: [
      "RAG = combiner recherche dans tes documents + génération par le LLM. Réduit les hallucinations drastiquement.",
      "Workflow : l'utilisateur pose une question → l'agent cherche les passages pertinents dans tes documents → le LLM répond en s'appuyant sur ces passages.",
      "Applications : FAQ intelligente, assistant juridique, support client basé sur tes manuels.",
    ],
    keyPoints: [
      "RAG = Recherche + Génération",
      "Réduit les hallucinations",
      "Base vectorielle = recherche sémantique rapide",
    ],
  },
  {
    id: 'agents-5',
    worldSlug: 'ai-agents',
    title: 'Multi-agents : faire collaborer plusieurs IA',
    minutes: 5,
    xp: 20,
    content: [
      "Un système multi-agents = plusieurs agents spécialisés qui collaborent (un chercheur, un rédacteur, un critique).",
      "Exemple : « Agent 1 recherche des informations sur le marché, Agent 2 rédige un rapport, Agent 3 critique et améliore. »",
      "Frameworks : CrewAI (simple), AutoGen (Microsoft), LangGraph (avancé).",
    ],
    keyPoints: [
      "Multi-agents = équipe IA",
      "Chaque agent = une spécialité",
      "CrewAI / AutoGen / LangGraph",
    ],
  },
  {
    id: 'agents-6',
    worldSlug: 'ai-agents',
    title: 'Déployer un agent en production',
    minutes: 5,
    xp: 20,
    content: [
      "Un agent en production doit être : fiable (gestion d'erreurs), rapide (caching), économique (limiter les appels LLM), sécurisé (validation des entrées).",
      "Hébergement : Vercel, Railway, Fly.io, ou serveur dédié.",
      "Monitoring : logger chaque exécution, mesurer le coût par requête, surveiller les erreurs.",
    ],
    keyPoints: [
      "Fiabilité + Rapidité + Économie + Sécurité",
      "Vercel / Railway / Fly.io pour héberger",
      "Monitoring = piloter son agent",
    ],
  },
];