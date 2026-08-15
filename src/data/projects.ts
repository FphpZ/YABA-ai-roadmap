export type ProjectStep = {
  id: string;
  title: string;
  description: string;
  content: string[];
  deliverable: string;
  xp: number;
};

export type Project = {
  id: string;
  slug: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: 'debutant' | 'intermediaire' | 'avance';
  duration: string;
  prerequisites: string[];
  totalXp: number;
  steps: ProjectStep[];
};

export const projects: Project[] = [
  {
    id: 'bot-whatsapp-boutique',
    slug: 'bot-whatsapp-boutique',
    emoji: '🤖',
    title: 'Crée ton bot WhatsApp pour ta boutique',
    tagline: 'Automatise les commandes et le service client',
    description:
      "Construis un bot WhatsApp qui repond automatiquement aux questions de tes clients, prend des commandes et t'envoie un resume quotidien. Ideal pour les boutiques, restaurants et services.",
    difficulty: 'intermediaire',
    duration: '2-3 jours',
    prerequisites: ['prompting', 'automation'],
    totalXp: 800,
    steps: [
      {
        id: 'step-1',
        title: 'Definir les scenarios de conversation',
        description: 'Identifie les 5 questions les plus frequentes de tes clients',
        content: [
          "Liste les questions que tes clients posent le plus : prix, disponibilite, horaires, livraison, paiement.",
          "Pour chaque question, ecris la reponse type que tu donnes habituellement.",
          "Identifie les cas limites : client mecontent, demande de reduction, commande speciale.",
          "Structure : Question → Reponse standard → Cas limite → Reponse cas limite.",
        ],
        deliverable:
          'Tableau avec 5 scenarios de conversation (question + reponse + cas limite)',
        xp: 100,
      },
      {
        id: 'step-2',
        title: 'Creer les prompts pour chaque scenario',
        description: 'Transforme chaque reponse en prompt structure',
        content: [
          "Pour chaque scenario, cree un prompt avec : role (assistant boutique), contexte (nom de ta boutique, produits), contraintes (ton chaleureux, FCFA), format (reponse courte).",
          "Teste chaque prompt dans le Prompt Lab avec Groq ou Mistral.",
          "Ajuste jusqu'a obtenir des reponses satisfaisantes.",
          "Sauvegarde tes prompts dans un document (tu les utiliseras dans le bot).",
        ],
        deliverable: '5 prompts testes et valides (score 70+ chacun)',
        xp: 150,
      },
      {
        id: 'step-3',
        title: 'Configurer un compte Twilio (API WhatsApp)',
        description: 'Obtiens un numero WhatsApp Business et une cle API',
        content: [
          "Cree un compte sur twilio.com (essai gratuit avec credits offerts).",
          "Achete un numero WhatsApp Business (environ 1$ par mois).",
          "Recupere ton Account SID et ton Auth Token dans les parametres.",
          "Note ces informations : tu les utiliseras pour connecter ton bot.",
        ],
        deliverable: 'Compte Twilio actif avec Account SID et Auth Token',
        xp: 100,
      },
      {
        id: 'step-4',
        title: 'Deployer une fonction serveur (Vercel)',
        description: 'Cree une API qui recoit les messages WhatsApp',
        content: [
          "Cree un nouveau projet Next.js ou ajoute une route API a ton projet actuel.",
          "Cree le fichier src/app/api/whatsapp/route.ts qui recoit les messages POST.",
          "Dans cette fonction : extrais le message du client, identifie le scenario, appelle l'IA avec le bon prompt, renvoie la reponse via Twilio.",
          "Deploie sur Vercel (gratuit) et note l'URL de ton API.",
        ],
        deliverable: 'API deployee sur Vercel qui recoit et repond aux messages',
        xp: 200,
      },
      {
        id: 'step-5',
        title: 'Connecter Twilio a ton API',
        description: 'Configure le webhook Twilio pour pointer vers ton API',
        content: [
          "Dans Twilio, va dans WhatsApp → Sandbox → Configuration.",
          "Dans 'When a message comes in', mets l'URL de ton API Vercel (https://ton-projet.vercel.app/api/whatsapp).",
          "Sauvegarde et teste en envoyant un message WhatsApp au numero Twilio.",
          "Le bot doit repondre automatiquement avec une reponse generee par l'IA.",
        ],
        deliverable: 'Bot WhatsApp fonctionnel qui repond aux messages',
        xp: 150,
      },
      {
        id: 'step-6',
        title: 'Ajouter un resume quotidien',
        description: 'Le bot t\'envoie un recap chaque soir',
        content: [
          "Cree une fonction qui compte les messages recus dans la journee.",
          "Utilise Vercel Cron Jobs pour declencher cette fonction chaque soir a 20h.",
          "La fonction envoie un resume sur ton WhatsApp personnel : nombre de conversations, questions les plus posees, commandes recues.",
          "Teste en forcant l'execution manuelle.",
        ],
        deliverable: 'Resume quotidien automatique envoye sur ton WhatsApp',
        xp: 100,
      },
    ],
  },
  {
    id: 'comptabilite-ia',
    slug: 'comptabilite-ia',
    emoji: '📊',
    title: 'Automatise ta comptabilite avec l\'IA',
    tagline: 'Transforme tes recus en tableau de bord financier',
    description:
      "Construis un systeme qui lit tes recus (photos ou PDF), extrait les informations cles et les organise dans un tableau de bord avec revenus, depenses et benefices. Parfait pour les petites entreprises et independants.",
    difficulty: 'intermediaire',
    duration: '2 jours',
    prerequisites: ['prompting', 'ai-coding'],
    totalXp: 700,
    steps: [
      {
        id: 'step-1',
        title: 'Structurer tes donnees financieres',
        description: 'Definis ce que tu veux tracker',
        content: [
          "Liste les informations essentielles : date, montant, categorie (revenu/depense), description, client/fournisseur.",
          "Cree un schema de base de donnees (Supabase ou Google Sheets).",
          "Definis tes categories : Ventes, Achats, Transport, Loyer, Salaires, Autres.",
          "Prepare un template vide avec ces colonnes.",
        ],
        deliverable: 'Template de tableau de bord financier (Google Sheets ou Supabase)',
        xp: 100,
      },
      {
        id: 'step-2',
        title: 'Creer le prompt d\'extraction',
        description: 'L\'IA lit les recus et extrait les infos',
        content: [
          "Cree un prompt qui demande a l'IA d'extraire : date, montant total, liste des articles, nom du fournisseur.",
          "Format de sortie : JSON structure.",
          "Teste avec 5 recus differents (photos ou PDF).",
          "Ajuste le prompt jusqu'a obtenir une extraction fiable.",
        ],
        deliverable: 'Prompt d\'extraction teste sur 5 recus',
        xp: 150,
      },
      {
        id: 'step-3',
        title: 'Construire l\'interface d\'upload',
        description: 'Une page pour uploader les recus',
        content: [
          "Cree une page Next.js avec un champ d'upload de fichier (image ou PDF).",
          "Utilise l'API Supabase Storage pour stocker les fichiers uploades.",
          "Apres l'upload, envoie le fichier a l'IA avec ton prompt d'extraction.",
          "Affiche les donnees extraites dans un formulaire editable (pour corriger si besoin).",
        ],
        deliverable: 'Page d\'upload fonctionnelle avec extraction IA',
        xp: 200,
      },
      {
        id: 'step-4',
        title: 'Sauvegarder dans la base de donnees',
        description: 'Stocke les transactions extraites',
        content: [
          "Cree une table 'transactions' dans Supabase avec les colonnes definies a l'etape 1.",
          "Apres validation du formulaire, insere la transaction dans la base.",
          "Ajoute une liste qui affiche toutes les transactions avec filtres (par date, categorie).",
          "Teste avec 10 transactions reelles.",
        ],
        deliverable: 'Base de donnees peuplee avec 10 transactions',
        xp: 150,
      },
      {
        id: 'step-5',
        title: 'Creer le tableau de bord',
        description: 'Visualise tes finances en un coup d\'oeil',
        content: [
          "Calcule les totaux : revenus du mois, depenses du mois, benefice net.",
          "Cree des graphiques simples (barres ou camemberts) avec une librairie comme Recharts.",
          "Affiche les 5 dernieres transactions.",
          "Ajoute un filtre par periode (jour, semaine, mois).",
        ],
        deliverable: 'Tableau de bord avec graphiques et filtres',
        xp: 100,
      },
    ],
  },
  {
    id: 'site-ecommerce-ia',
    slug: 'site-ecommerce-ia',
    emoji: '🛍️',
    title: 'Lance ton site e-commerce avec IA',
    tagline: 'De l\'idee a la premiere vente en 3 jours',
    description:
      "Construis un site e-commerce complet avec catalogue produits, panier, paiement Mobile Money, et generation automatique de descriptions et images par IA. Pret a vendre des demain.",
    difficulty: 'avance',
    duration: '3-4 jours',
    prerequisites: ['prompting', 'creative-ai', 'ai-coding'],
    totalXp: 1000,
    steps: [
      {
        id: 'step-1',
        title: 'Definir ton offre',
        description: 'Quoi vendre, a qui, a quel prix',
        content: [
          "Choisis 5-10 produits que tu veux vendre (artisanat, vetements, alimentaire, etc.).",
          "Pour chaque produit : nom, prix, description courte, public cible.",
          "Definis ta strategie de prix : cout de revient + marge + frais de livraison.",
          "Identifie tes concurrents et ton positionnement (qualite, prix, originalite).",
        ],
        deliverable: 'Liste de 5-10 produits avec prix et positionnement',
        xp: 100,
      },
      {
        id: 'step-2',
        title: 'Generer les descriptions produits',
        description: 'L\'IA ecrit des fiches attractives',
        content: [
          "Cree un prompt qui genere une description produit : titre accrocheur, 3 benefices, caracteristiques, appel a l'action.",
          "Adapte le ton a ton public (formel, chaleureux, jeune, etc.).",
          "Genere les descriptions pour tes 5-10 produits.",
          "Relis et ajuste manuellement si besoin.",
        ],
        deliverable: 'Descriptions IA pour tous tes produits',
        xp: 150,
      },
      {
        id: 'step-3',
        title: 'Generer les images produits',
        description: 'Photos pro sans seance photo',
        content: [
          "Prends des photos simples de tes produits avec ton telephone (fond uni, bonne lumiere).",
          "Utilise un outil de retouche IA (Canva Magic Edit, Photoshop Generative Fill) pour ameliorer les photos.",
          "Optionnel : genere des images de mise en scene avec Midjourney ou DALL-E.",
          "Redimensionne toutes les images en format carre (1000x1000px).",
        ],
        deliverable: 'Images produits optimisees pour le web',
        xp: 150,
      },
      {
        id: 'step-4',
        title: 'Construire le catalogue',
        description: 'Page liste avec filtres',
        content: [
          "Cree une page /catalogue qui affiche tous tes produits en grille.",
          "Chaque produit : image, nom, prix, bouton 'Voir details'.",
          "Ajoute des filtres : par categorie, par prix (min/max).",
          "Rends la page responsive (mobile-first).",
        ],
        deliverable: 'Page catalogue fonctionnelle avec filtres',
        xp: 150,
      },
      {
        id: 'step-5',
        title: 'Page produit detaillee',
        description: 'Fiche complete avec ajout au panier',
        content: [
          "Cree une page /produit/[id] qui affiche : grande image, description complete, prix, bouton 'Ajouter au panier'.",
          "Ajoute des images supplementaires (galerie).",
          "Implemente le panier (stockage local ou base de donnees).",
          "Affiche le total et un bouton 'Commander'.",
        ],
        deliverable: 'Page produit avec panier fonctionnel',
        xp: 150,
      },
      {
        id: 'step-6',
        title: 'Integration paiement Mobile Money',
        description: 'Accepte les paiements Orange Money, MTN, Wave',
        content: [
          "Choisis un aggregateur de paiement : CinetPay, KKiaPay, ou PayDunya.",
          "Cree un compte et recupere tes cles API.",
          "Integre leur SDK ou API dans ton site (redirection vers leur page de paiement).",
          "Configure le webhook pour etre notifie quand un paiement reussit.",
        ],
        deliverable: 'Systeme de paiement Mobile Money fonctionnel',
        xp: 200,
      },
      {
        id: 'step-7',
        title: 'Notifications et suivi de commande',
        description: 'Confirme et tracke les commandes',
        content: [
          "Apres paiement reussi, envoie un email de confirmation au client.",
          "Cree une page /admin/commandes qui liste toutes les commandes (statut, client, montant).",
          "Ajoute des boutons pour changer le statut : 'En preparation', 'Expedie', 'Livre'.",
          "Optionnel : notification WhatsApp au client a chaque changement de statut.",
        ],
        deliverable: 'Systeme de gestion des commandes complet',
        xp: 100,
      },
    ],
  },
  {
    id: 'assistant-ia-personnel',
    slug: 'assistant-ia-personnel',
    emoji: '🧠',
    title: 'Cree ton assistant IA personnel',
    tagline: 'Un agent qui te connait et t\'aide au quotidien',
    description:
      "Construis un agent IA qui se souvient de tes preferences, de tes projets en cours, et qui peut t'aider a planifier, rediger, ou rechercher des informations. Accessible via WhatsApp ou interface web.",
    difficulty: 'avance',
    duration: '3 jours',
    prerequisites: ['prompting', 'reasoning', 'ai-agents'],
    totalXp: 900,
    steps: [
      {
        id: 'step-1',
        title: 'Definir les capacites de ton assistant',
        description: 'Que doit-il savoir faire ?',
        content: [
          "Liste 5-7 taches que tu fais regulierement : planifier ma semaine, rediger un email, resumer un article, chercher une info, etc.",
          "Pour chaque tache, identifie les informations dont l'assistant a besoin (contexte, preferences, historique).",
          "Priorise : commence par les 3 taches les plus utiles.",
        ],
        deliverable: 'Liste des capacites prioritaires de l\'assistant',
        xp: 100,
      },
      {
        id: 'step-2',
        title: 'Configurer la memoire long terme',
        description: 'L\'assistant se souvient de toi',
        content: [
          "Cree une base de donnees (Supabase) avec une table 'memories' : user_id, type (preference, projet, fait), contenu, date.",
          "Quand l'utilisateur dit quelque chose d'important ('Je prefere les reponses courtes'), l'assistant le sauvegarde.",
          "Avant chaque reponse, l'assistant cherche les memoires pertinentes et les injecte dans le prompt.",
        ],
        deliverable: 'Systeme de memoire fonctionnel avec sauvegarde et recuperation',
        xp: 200,
      },
      {
        id: 'step-3',
        title: 'Creer les prompts de base',
        description: 'Le cerveau de l\'assistant',
        content: [
          "Cree un prompt system qui definit la personnalite de l'assistant (ton, style, limites).",
          "Cree un prompt pour chaque capacite definie a l'etape 1.",
          "Chaque prompt inclut : role, contexte (memoires recuperes), instructions specifiques, format de sortie.",
          "Teste chaque prompt dans le Prompt Lab.",
        ],
        deliverable: 'Prompts testes pour toutes les capacites',
        xp: 150,
      },
      {
        id: 'step-4',
        title: 'Construire l\'interface de chat',
        description: 'Une conversation naturelle',
        content: [
          "Cree une page /assistant avec une zone de chat (messages utilisateur + reponses assistant).",
          "Utilise l'API /api/ai-chat pour generer les reponses.",
          "Affiche l'historique de la conversation (stocke en base de donnees).",
          "Ajoute un indicateur de chargement pendant la generation.",
        ],
        deliverable: 'Interface de chat fonctionnelle',
        xp: 200,
      },
      {
        id: 'step-5',
        title: 'Ajouter la detection d\'intentions',
        description: 'L\'assistant comprend ce que tu veux',
        content: [
          "Cree un prompt qui analyse le message de l'utilisateur et identifie l'intention (planifier, rediger, chercher, etc.).",
          "Selon l'intention, l'assistant utilise le prompt correspondant.",
          "Si l'intention est ambigu, l'assistant demande des precisions.",
        ],
        deliverable: 'Systeme de detection d\'intentions fonctionnel',
        xp: 150,
      },
      {
        id: 'step-6',
        title: 'Deployer et tester',
        description: 'Ton assistant est pret',
        content: [
          "Deploie sur Vercel.",
          "Teste avec 10 conversations differentes.",
          "Verifie que la memoire fonctionne (l'assistant se souvient des preferences).",
          "Ajuste les prompts selon les resultats.",
        ],
        deliverable: 'Assistant deploye et teste',
        xp: 100,
      },
    ],
  },
];