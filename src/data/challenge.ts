export type ChallengePrompt = {
  title: string;
  prompt: string;
};

export type ChallengeStep = {
  id: string;
  number: number;
  emoji: string;
  title: string;
  method: string[];
  prompts: ChallengePrompt[];
  deliverable: string;
  xp: number;
};

export type Challenge = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  steps: ChallengeStep[];
};

export const challenge: Challenge = {
  id: 'challenge-entrepreneur',
  title: 'Challenge Entrepreneur IA',
  tagline: 'Lance ton business avec l\'IA en 30 jours',
  description:
    'La methode entrepreneuriale complete : trouver un probleme, creer ton offre, vendre et mesurer. A chaque etape, l\'IA te fait gagner des heures. Termine les 10 etapes et gagne le badge Entrepreneur IA.',
  duration: '30 jours',
  steps: [
    {
      id: 'step-1',
      number: 1,
      emoji: '🔍',
      title: 'Trouver un probleme',
      method: [
        'Interroge 5 personnes de ta clientele ideale : besoin n°1, prix acceptable, canal d\'achat prefere.',
        'Pose la question libre : « Qu\'attendriez-vous de mieux ? »',
        'Le probleme qui revient le plus souvent = ton opportunite.',
      ],
      prompts: [
        {
          title: 'Cartographier les problemes du marche',
          prompt: 'Agis comme un expert en etude de marche en Afrique de l\'Ouest. Je veux trouver un probleme a resoudre dans le secteur [ton secteur]. Liste les 10 problemes les plus frequents de [ta cible] a [ta ville], classes par urgence et par disponibilite a payer.',
        },
        {
          title: 'Guide d\'interview client',
          prompt: 'Cree-moi un guide d\'interview de 7 questions pour decouvrir le besoin n°1 de mon client ideal, avec une question de relance pour chaque question. Ton simple et respectueux.',
        },
        {
          title: 'Analyser mes interviews',
          prompt: 'Voici les reponses de 5 interviews clients : [colle tes notes]. Extrais les 3 problemes les plus repetes, les prix mentionnes et les canaux d\'achat. Presente le tout dans un tableau.',
        },
      ],
      deliverable: 'Tableau de 3 problemes valides (probleme + cible + prix acceptable)',
      xp: 100,
    },
    {
      id: 'step-2',
      number: 2,
      emoji: '📊',
      title: 'Analyser son marche',
      method: [
        'Cartographie ta chaine de valeur : secteur primaire (matieres premieres), secondaire (transformation), tertiaire (services).',
        'Safari concurrence : observe 2 concurrents (packaging, prix, argument commercial, experience client).',
        'Fais un mini SWOT (forces, faiblesses, opportunites, menaces) pour chacun.',
      ],
      prompts: [
        {
          title: 'Chaine de valeur de mon projet',
          prompt: 'Decris la chaine de valeur de mon projet [decris ton projet] en 3 secteurs : primaire, secondaire, tertiaire. Identifie aussi les 5 depenses principales et une strategie pour tirer parti des autres chaines de valeur.',
        },
        {
          title: 'SWOT d\'un concurrent',
          prompt: 'Agis comme un analyste strategique. Voici mes observations sur un concurrent : [colle tes observations]. Fais une analyse SWOT complete en tableau : forces, faiblesses, opportunites, menaces.',
        },
        {
          title: 'Trouver mon angle d\'attaque',
          prompt: 'Voici 2 analyses SWOT de mes concurrents : [colle]. Donne-moi 3 angles de positionnement qu\'ils n\'exploitent pas, avec un argument commercial pour chacun.',
        },
      ],
      deliverable: 'Chaine de valeur + 2 SWOT concurrents + 1 angle de positionnement',
      xp: 100,
    },
    {
      id: 'step-3',
      number: 3,
      emoji: '🎯',
      title: 'Identifier sa cible',
      method: [
        'Cree un groupe WhatsApp ferme avec 10 clients ideaux (avec leur accord avant l\'ajout).',
        'Publie un premier contenu utile pour lancer la discussion.',
        'Ecris ton equation entrepreneuriale : qui + quel probleme + quel resultat.',
      ],
      prompts: [
        {
          title: 'Portrait de mon client ideal',
          prompt: 'Decris mon client ideal en 6 points : age, ville, profession, douleur n°1, canal d\'achat prefere, budget. Mon projet : [decris ton projet].',
        },
        {
          title: 'Message d\'invitation WhatsApp',
          prompt: 'Ecris un message d\'invitation WhatsApp pour mon client ideal afin qu\'il rejoigne mon groupe ferme. Ton chaleureux, court, avec demande de consentement avant l\'ajout.',
        },
        {
          title: 'Mon equation entrepreneuriale',
          prompt: 'Redige mon equation entrepreneuriale en une phrase : « J\'aide [cible] a [resultat] grace a [solution], sans [douleur]. » Mon projet : [decris ton projet]. Propose 3 variantes.',
        },
      ],
      deliverable: 'Groupe WhatsApp de 10 membres + equation entrepreneuriale ecrite',
      xp: 100,
    },
    {
      id: 'step-4',
      number: 4,
      emoji: '💎',
      title: 'Creer son offre',
      method: [
        'Reformule ton benefice principal en 15 mots maximum.',
        'Ajoute un bonus et une garantie 7 jours pour reduire le risque.',
        'Prix clair en FCFA, modalites de paiement, delai.',
      ],
      prompts: [
        {
          title: 'Offre irresistible',
          prompt: 'Construis une offre irresistible pour [ton produit/service] : benefice en 15 mots, 2 bonus, garantie 7 jours, prix en FCFA avec effet d\'ancrage (prix barre + prix reel).',
        },
        {
          title: 'Script de vente WhatsApp',
          prompt: 'Ecris un script de vente en 4 temps : Probleme → Benefice → Offre → Question fermee, pour vendre [ton offre] par message WhatsApp. Ton direct et chaleureux.',
        },
        {
          title: 'Reponses aux objections',
          prompt: 'Donne-moi 5 reponses courtes et respectueuses aux objections : « c\'est cher », « je vais reflechir », « j\'ai deja un fournisseur », « je n\'ai pas le temps », « est-ce fiable ? ».',
        },
      ],
      deliverable: 'Offre ecrite (benefice 15 mots + bonus + garantie + prix)',
      xp: 100,
    },
    {
      id: 'step-5',
      number: 5,
      emoji: '🤖',
      title: 'Utiliser l\'IA',
      method: [
        'Genere ton visuel (Canva, IA image), tes textes de vente et tes contenus.',
        'Prepare 3 contenus utiles pour ton groupe WhatsApp (conseil, histoire, offre).',
        'Tout ce qui prend 2h a la main prend 10 min avec l\'IA.',
      ],
      prompts: [
        {
          title: 'Publicite Facebook a petit budget',
          prompt: 'Ecris une annonce Facebook pour [mon offre] : accroche choc, 3 benefices, appel a l\'action, 3 emojis. Optimisee pour un budget de 1 000 FCFA par jour.',
        },
        {
          title: 'Visuel produit',
          prompt: 'Cree un prompt image detaille pour mon visuel : sujet [mon produit], style photographie publicitaire, composition centree, eclairage naturel, ambiance marche africain, couleurs chaudes.',
        },
        {
          title: '3 contenus WhatsApp',
          prompt: 'Ecris 3 publications WhatsApp utiles pour mon groupe de clients ideal : 1 conseil pratique, 1 mini-histoire de client, 1 presentation de mon offre. 100 mots maximum chacune.',
        },
      ],
      deliverable: '1 annonce + 1 visuel + 3 contenus prets a publier',
      xp: 100,
    },
    {
      id: 'step-6',
      number: 6,
      emoji: '🛠️',
      title: 'Creer un prototype',
      method: [
        'Produit : echantillon, mock-up packaging, flyer manuscrit.',
        'Service ou numerique : maquette Canva, landing page brouillon, apercu PDF.',
        'Clarte avant perfection : rapide et concret.',
      ],
      prompts: [
        {
          title: 'Structure de ma landing page',
          prompt: 'Ecris la structure d\'une landing page d\'une seule page pour [mon offre] : accroche, probleme, solution, preuve, prix, appel a l\'action. Avec le texte de chaque section.',
        },
        {
          title: 'Flyer une page',
          prompt: 'Genere le texte d\'un flyer PDF d\'une page pour [mon produit] : titre accrocheur, 3 benefices, prix, contact WhatsApp, garantie. Mise en page suggeree incluse.',
        },
        {
          title: 'Outils gratuits',
          prompt: 'Donne-moi 3 outils gratuits pour creer une maquette ou une landing page en moins de 2h, avec le temps estime et le niveau de difficulte pour chacun.',
        },
      ],
      deliverable: 'Prototype pret (photo, maquette ou landing page)',
      xp: 100,
    },
    {
      id: 'step-7',
      number: 7,
      emoji: '🧪',
      title: 'Tester',
      method: [
        'Montre ton prototype a 3 inconnus et recolte leurs reactions spontanees.',
        'Note : ce qu\'ils comprennent, ce qui les surprend, ce qu\'ils paieraient.',
        'Applique le top 3 des ameliorations avant de vendre.',
      ],
      prompts: [
        {
          title: 'Grille de test',
          prompt: 'Cree une grille de test de 5 questions pour evaluer mon prototype avec des inconnus : comprehension, utilite percue, prix acceptable, hesitation principale, intention d\'achat.',
        },
        {
          title: 'Analyser les reactions',
          prompt: 'Voici les reactions de mes 3 testeurs : [colle]. Analyse : ce qu\'ils ont compris, les points de friction, et donne-moi le top 3 des modifications a faire en priorite.',
        },
      ],
      deliverable: '3 reactions recoltees + top 3 ameliorations appliquees',
      xp: 100,
    },
    {
      id: 'step-8',
      number: 8,
      emoji: '💰',
      title: 'Vendre',
      method: [
        'Contacte les 10 personnes de ton groupe WhatsApp avec ton script de vente.',
        'Objectif : 1 vente en 24h, puis 3 ventes ou 30 leads en 10 jours.',
        'Documente chaque appel meme sans achat : les objections sont de l\'or.',
      ],
      prompts: [
        {
          title: 'Relance sans pression',
          prompt: 'Ecris un message de relance pour un prospect qui a dit « je vais reflechir », sans pression : rappel du benefice, bonus, delai de 48h, question fermee.',
        },
        {
          title: 'Message apres paiement',
          prompt: 'Ecris un message WhatsApp apres paiement : remerciement, prochaines etapes claires, et demande de temoignage en fin de livraison. Ton professionnel et chaleureux.',
        },
        {
          title: 'Journal de ventes',
          prompt: 'Transforme cette note d\'appel en fiche de journal de ventes : client, produit, montant, objection principale, lecon apprise. Ma note : [colle].',
        },
      ],
      deliverable: 'Journal de ventes + au moins 1 preuve de paiement Mobile Money',
      xp: 150,
    },
    {
      id: 'step-9',
      number: 9,
      emoji: '📈',
      title: 'Mesurer',
      method: [
        'Tiens un tableau de bord : leads, ventes, taux de conversion, cout par lead.',
        'Tableau Action / Deadline / Indicateur de succes pour chaque tache.',
        'Bilan toutes les 48h : une seule amelioration a la fois.',
      ],
      prompts: [
        {
          title: 'Tableau de bord',
          prompt: 'Construis-moi un tableau de suivi simple avec les colonnes : leads, ventes, taux de conversion, depense pub, cout par vente. Donne les formules de calcul et un exemple rempli.',
        },
        {
          title: 'Decision en 48h',
          prompt: 'Voici mes chiffres des dernieres 48h : [colle]. Analyse et donne-moi UNE decision precise : couper, renforcer ou ajuster, avec la raison en une phrase.',
        },
      ],
      deliverable: 'Tableau de bord rempli avec tes vrais chiffres',
      xp: 100,
    },
    {
      id: 'step-10',
      number: 10,
      emoji: '🚀',
      title: 'Ameliorer',
      method: [
        'Coupe ce qui ne performe pas, renforce ce qui marche.',
        'Collecte 3 temoignages minimum, publie 1 preuve par semaine.',
        'Rapport final : strategie, chiffres, lecons, prochaines actions.',
      ],
      prompts: [
        {
          title: 'Plan d\'amelioration',
          prompt: 'A partir de mon tableau de bord [colle], donne-moi un plan d\'amelioration en 3 points pour la semaine prochaine : meilleure accroche, nouveau visuel, precision d\'audience.',
        },
        {
          title: 'Demander un temoignage',
          prompt: 'Ecris un message court et chaleureux pour demander un temoignage a un client satisfait, avec 2 questions guidees pour l\'aider a repondre facilement.',
        },
        {
          title: 'Rapport final 30 jours',
          prompt: 'Structure mon rapport final de 30 jours en 4 sections : strategie, chiffres cles, 3 lecons apprises, 3 prochaines actions. Voici mes notes : [colle].',
        },
      ],
      deliverable: 'Rapport final (2-4 pages) + 3 temoignages',
      xp: 150,
    },
  ],
};