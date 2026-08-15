export type JobTask = {
  id: string;
  title: string;
  objective: string;
  format: string;
};

export type Job = {
  id: string;
  name: string;
  emoji: string;
  category: string;
  tasks: JobTask[];
};

// Genere un prompt structure avec le contexte africain injecte
export function buildJobPrompt(
  job: Job,
  task: JobTask,
  city: string,
  detail: string
): string {
  const detailLine = detail.trim()
    ? detail.trim()
    : `Je veux developper mon activite.`;

  return [
    `Agis comme un consultant expert, specialiste du metier : ${job.name} en Afrique de l'Ouest.`,
    ``,
    `Contexte :`,
    `Je suis ${job.name} a ${city}. ${detailLine}`,
    `Mon activite fonctionne surtout avec WhatsApp, Facebook et le bouche-a-oreille.`,
    `Mon budget est limite et ma clientele est locale.`,
    ``,
    `Objectif :`,
    task.objective,
    ``,
    `Contraintes :`,
    `- Reponds en francais simple et direct`,
    `- Propose des solutions a faible cout, adaptees au terrain`,
    `- Utilise des montants en FCFA lorsque c'est pertinent`,
    `- Maximum 300 mots`,
    ``,
    `Format :`,
    task.format,
  ].join('\n');
}

export const jobs: Job[] = [
  // ============ COMMERCE ============
  {
    id: 'boutique',
    name: 'Vendeur en boutique',
    emoji: '🏪',
    category: 'Commerce',
    tasks: [
      { id: 'clients', title: 'Attirer plus de clients', objective: 'Trouve 5 idees concretes pour attirer plus de clients dans ma boutique cette semaine, sans budget publicitaire.', format: 'Liste numerotee de 5 idees, 2 phrases maximum par idee.' },
      { id: 'whatsapp', title: 'Annonce WhatsApp', objective: 'Redige un message WhatsApp court et chaleureux pour annoncer une nouvelle arrivee de produits a mes clients fideles.', format: 'Message de moins de 100 mots avec un appel a l\'action clair.' },
      { id: 'stock', title: 'Suivre mon stock', objective: 'Aide-moi a organiser un suivi de stock simple avec un cahier ou Excel.', format: 'Tableau simple : produit, quantite, seuil d\'alerte.' },
    ],
  },
  {
    id: 'marche',
    name: 'Commercant(e) de marche',
    emoji: '🛒',
    category: 'Commerce',
    tasks: [
      { id: 'prix', title: 'Bien fixer mes prix', objective: 'Explique comment fixer le prix de vente de mes produits pour degager un vrai benefice.', format: '3 regles simples avec un exemple chiffre en FCFA.' },
      { id: 'negociation', title: 'Repondre aux negociations', objective: 'Donne-moi 4 phrases pour repondre aux clients qui negocient trop, sans perdre le client.', format: 'Liste de 4 phrases pretes a dire.' },
      { id: 'epargne', title: 'Epargner chaque jour', objective: 'Propose une methode simple pour epargner chaque jour avec des revenus irreguliers.', format: '3 etapes concretes.' },
    ],
  },
  {
    id: 'grossiste',
    name: 'Grossiste',
    emoji: '📦',
    category: 'Commerce',
    tasks: [
      { id: 'fournisseurs', title: 'Negocier un fournisseur', objective: 'Prepare un argumentaire pour negocier de meilleurs prix d\'achat chez mon fournisseur.', format: 'Argumentaire en 5 points.' },
      { id: 'credit', title: 'Gerer les achats a credit', objective: 'Propose un systeme simple pour suivre et recuperer les dettes de mes clients.', format: '3 regles + un modele de message de rappel.' },
      { id: 'devis', title: 'Devis rapide', objective: 'Redige un modele de devis clair pour une commande en gros.', format: 'Modele de devis en tableau.' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'Vendeur en ligne',
    emoji: '🛍️',
    category: 'Commerce',
    tasks: [
      { id: 'fiche', title: 'Fiche produit qui vend', objective: 'Redige une fiche produit attractive pour vendre mon produit sur Facebook.', format: 'Fiche avec titre accrocheur, 3 benefices, prix, appel a l\'action.' },
      { id: 'livraison', title: 'Organiser la livraison', objective: 'Propose un plan de livraison simple en ville avec des livreurs moto.', format: '3 etapes + checklist.' },
      { id: 'pub', title: 'Petite pub Facebook', objective: 'Ecris un texte de publicite Facebook efficace avec un petit budget.', format: 'Texte de pub de 80 mots avec emoji.' },
    ],
  },
  {
    id: 'quincaillerie',
    name: 'Gerant de quincaillerie',
    emoji: '🔩',
    category: 'Commerce',
    tasks: [
      { id: 'conseil', title: 'Conseiller un client', objective: 'Prepare une liste de questions pour bien conseiller un client qui vient pour une reparation.', format: '5 questions simples.' },
      { id: 'catalogue', title: 'Catalogue WhatsApp', objective: 'Aide-moi a presenter mes 10 produits phares dans un catalogue WhatsApp.', format: '10 lignes : produit, usage, prix.' },
      { id: 'saison', title: 'Saison des chantiers', objective: 'Propose 3 actions pour vendre plus pendant la saison des constructions.', format: '3 actions concretes.' },
    ],
  },

  // ============ RESTAURATION ============
  {
    id: 'maquis',
    name: 'Gerant de maquis / restaurant',
    emoji: '🍲',
    category: 'Restauration',
    tasks: [
      { id: 'menu', title: 'Menu de la semaine', objective: 'Propose un menu varie pour 7 jours avec des produits locaux et un petit budget.', format: 'Tableau jour / plat / boisson.' },
      { id: 'fidelite', title: 'Fideliser mes clients', objective: 'Donne 4 idees pour fideliser les habitues de mon maquis.', format: 'Liste de 4 idees.' },
      { id: 'hygiene', title: 'Checklist hygiene', objective: 'Redige une checklist d\'hygiene quotidienne simple pour ma cuisine.', format: 'Checklist de 8 points.' },
    ],
  },
  {
    id: 'streetfood',
    name: 'Restauratrice de rue',
    emoji: '🍢',
    category: 'Restauration',
    tasks: [
      { id: 'emplacement', title: 'Choisir mon emplacement', objective: 'Aide-moi a choisir le meilleur emplacement pour vendre selon le passage et la concurrence.', format: '3 criteres + conclusion.' },
      { id: 'cout', title: 'Calculer le cout d\'une portion', objective: 'Aide-moi a calculer le cout reel d\'une portion pour fixer mon prix.', format: 'Methode en 4 etapes avec exemple en FCFA.' },
      { id: 'affiche', title: 'Texte d\'affiche', objective: 'Ecris le texte d\'une affiche pour attirer les clients du midi.', format: 'Texte court et percutant, 30 mots max.' },
    ],
  },
  {
    id: 'traiteur',
    name: 'Traiteur / cuisiniere',
    emoji: '🍛',
    category: 'Restauration',
    tasks: [
      { id: 'devis-mariage', title: 'Devis de mariage', objective: 'Redige un devis clair pour un repas de mariage de 100 personnes.', format: 'Devis en tableau avec total en FCFA.' },
      { id: 'reseaux', title: 'Me faire connaitre', objective: 'Propose 3 actions pour me faire connaitre via WhatsApp et Facebook.', format: '3 actions concretes.' },
      { id: 'menu-fete', title: 'Menu de fete', objective: 'Propose un menu de fete avec des plats locaux.', format: 'Menu en 3 services.' },
    ],
  },
  {
    id: 'jus',
    name: 'Vendeur de jus locaux',
    emoji: '🧃',
    category: 'Restauration',
    tasks: [
      { id: 'marque', title: 'Nom de marque', objective: 'Propose 6 noms courts et memorables pour ma marque de jus locaux.', format: '6 noms + un slogan.' },
      { id: 'conservation', title: 'Ameliorer la conservation', objective: 'Donne des conseils pratiques pour conserver mes jus plus longtemps sans materiel couteux.', format: '4 conseils pratiques.' },
      { id: 'lancement', title: 'Message de lancement', objective: 'Ecris un message de promotion pour le lancement de ma marque.', format: 'Message de 100 mots avec appel a l\'action.' },
    ],
  },

  // ============ ARTISANAT ============
  {
    id: 'couture',
    name: 'Couturiere / tailleur',
    emoji: '✂️',
    category: 'Artisanat',
    tasks: [
      { id: 'collection', title: 'Annoncer une collection', objective: 'Redige un message WhatsApp pour annoncer ma nouvelle collection de tenues en wax.', format: 'Message chaleureux de 100 mots.' },
      { id: 'mesures', title: 'Guide des mesures', objective: 'Cree un guide simple pour prendre les mesures d\'un client a distance.', format: 'Liste de 8 mesures avec explications.' },
      { id: 'tarifs', title: 'Fixer mes tarifs', objective: 'Aide-moi a fixer le prix d\'une robe sur mesure selon le tissu et le temps passe.', format: 'Methode + exemple chiffre en FCFA.' },
    ],
  },
  {
    id: 'coiffure',
    name: 'Coiffeuse / coiffeur',
    emoji: '💇🏾',
    category: 'Artisanat',
    tasks: [
      { id: 'rdv', title: 'Rendez-vous WhatsApp', objective: 'Propose un systeme simple de prise de rendez-vous par WhatsApp.', format: '3 etapes + modele de message.' },
      { id: 'fidelite', title: 'Offre de fidelite', objective: 'Imagine une offre de fidelite simple pour mon salon.', format: 'Offre en 3 points.' },
      { id: 'conseils', title: 'Conseils apres coiffure', objective: 'Redige 4 conseils d\'entretien a envoyer a mes clientes apres la coiffure.', format: '4 conseils courts.' },
    ],
  },
  {
    id: 'mecanicien',
    name: 'Mecanicien auto / moto',
    emoji: '🔧',
    category: 'Artisanat',
    tasks: [
      { id: 'panne', title: 'Expliquer une panne', objective: 'Aide-moi a expliquer une panne complexe a un client avec des mots simples.', format: 'Explication en 3 phrases + conseil.' },
      { id: 'devis', title: 'Devis de reparation', objective: 'Redige un devis simple pour une reparation avec pieces et main d\'oeuvre.', format: 'Devis en tableau.' },
      { id: 'atelier', title: 'Organiser l\'atelier', objective: 'Propose une organisation simple de mon atelier pour gagner du temps.', format: '5 actions concretes.' },
    ],
  },
  {
    id: 'soudeur',
    name: 'Soudeur metallique',
    emoji: '🏗️',
    category: 'Artisanat',
    tasks: [
      { id: 'portail', title: 'Devis d\'un portail', objective: 'Redige un devis pour la fabrication d\'un portail metallique.', format: 'Devis en tableau avec total FCFA.' },
      { id: 'securite', title: 'Checklist securite', objective: 'Cree une checklist de securite quotidienne pour mon atelier.', format: 'Checklist de 6 points.' },
      { id: 'chantiers', title: 'Decrocher des chantiers', objective: 'Propose 3 pistes pour obtenir des contrats avec les chantiers de la ville.', format: '3 pistes concretes.' },
    ],
  },
  {
    id: 'menuisier',
    name: 'Menuisier',
    emoji: '🪚',
    category: 'Artisanat',
    tasks: [
      { id: 'armoire', title: 'Devis d\'un meuble', objective: 'Redige un devis pour une armoire en bois sur mesure.', format: 'Devis en tableau.' },
      { id: 'bois', title: 'Choisir le bois', objective: 'Explique quel bois choisir selon l\'usage et le budget du client.', format: 'Tableau : bois / usage / prix.' },
      { id: 'chutes', title: 'Reduire les chutes', objective: 'Donne 4 astuces pour organiser mon atelier et reduire les chutes de bois.', format: '4 astuces.' },
    ],
  },
  {
    id: 'electricien',
    name: 'Electricien batiment',
    emoji: '💡',
    category: 'Artisanat',
    tasks: [
      { id: 'installation', title: 'Devis d\'installation', objective: 'Redige un devis pour l\'installation electrique d\'une maison de 4 pieces.', format: 'Devis en tableau.' },
      { id: 'conseils', title: 'Conseils securite', objective: 'Redige 5 conseils de securite electrique a donner a mes clients.', format: '5 conseils courts.' },
      { id: 'solaire', title: 'Argumentaire solaire', objective: 'Prepare un argumentaire simple pour proposer une installation solaire.', format: 'Argumentaire en 4 points.' },
    ],
  },

  // ============ AGRICULTURE & ELEVAGE ============
  {
    id: 'maraicher',
    name: 'Maraichere / maraicher',
    emoji: '🍅',
    category: 'Agriculture & Elevage',
    tasks: [
      { id: 'prix', title: 'Vendre au bon moment', objective: 'Aide-moi a decider quand vendre ma recolte pour avoir le meilleur prix.', format: '3 criteres de decision.' },
      { id: 'conservation', title: 'Conserver ma recolte', objective: 'Donne 4 methodes simples pour conserver mes legumes plus longtemps.', format: '4 methodes pratiques.' },
      { id: 'cooperative', title: 'Creer une cooperative', objective: 'Explique les etapes pour creer une petite cooperative avec d\'autres producteurs.', format: '4 etapes simples.' },
    ],
  },
  {
    id: 'elevage',
    name: 'Eleveur de volailles',
    emoji: '🐔',
    category: 'Agriculture & Elevage',
    tasks: [
      { id: 'alimentation', title: 'Reduire le cout d\'alimentation', objective: 'Propose des solutions locales pour reduire le cout de l\'alimentation de mes poulets.', format: '4 solutions concretes.' },
      { id: 'vaccins', title: 'Calendrier de vaccination', objective: 'Cree un calendrier simple de vaccination et d\'entretien pour mon poulailler.', format: 'Tableau : semaine / action.' },
      { id: 'fetes', title: 'Vendre pour les fetes', objective: 'Prepare un plan pour vendre plus de volailles pendant les fetes.', format: 'Plan en 3 etapes.' },
    ],
  },
  {
    id: 'cereales',
    name: 'Producteur de cereales',
    emoji: '🌾',
    category: 'Agriculture & Elevage',
    tasks: [
      { id: 'stockage', title: 'Bien stocker ma recolte', objective: 'Donne des methodes simples pour stocker mon mais a l\'abri des pertes.', format: '4 methodes.' },
      { id: 'vente-groupee', title: 'Vente groupée', objective: 'Explique l\'interet de la vente groupée entre producteurs et comment l\'organiser.', format: '3 avantages + 3 etapes.' },
      { id: 'financement', title: 'Financer la saison', objective: 'Propose des options de financement locales pour la prochaine saison.', format: '3 options avec avantages et risques.' },
    ],
  },
  {
    id: 'cacao',
    name: 'Planteur de cacao / cafe',
    emoji: '🍫',
    category: 'Agriculture & Elevage',
    tasks: [
      { id: 'sechage', title: 'Ameliorer la qualite', objective: 'Explique les bonnes pratiques de sechage pour vendre mon cacao plus cher.', format: '4 bonnes pratiques.' },
      { id: 'prix', title: 'Comprendre le prix', objective: 'Explique simplement comment se forme le prix du cacao et comment suivre son evolution.', format: 'Explication en 4 points.' },
      { id: 'cooperative', title: 'Mieux vendre via ma cooperative', objective: 'Prepare des questions a poser a ma cooperative pour mieux vendre.', format: '5 questions.' },
    ],
  },
  {
    id: 'peche',
    name: 'Pecheur / pisciculteur',
    emoji: '🐟',
    category: 'Agriculture & Elevage',
    tasks: [
      { id: 'conservation', title: 'Conserver le poisson', objective: 'Donne 4 methodes de conservation du poisson sans chambre froide.', format: '4 methodes.' },
      { id: 'restaurants', title: 'Vendre aux restaurants', objective: 'Prepare un message pour proposer mon poisson aux restaurants de la ville.', format: 'Message court et professionnel.' },
      { id: 'materiel', title: 'Entretenir mon materiel', objective: 'Cree une checklist d\'entretien de mon materiel de peche.', format: 'Checklist de 6 points.' },
    ],
  },

  // ============ SANTE & EDUCATION ============
  {
    id: 'instituteur',
    name: 'Institutrice / instituteur',
    emoji: '🏫',
    category: 'Sante & Education',
    tasks: [
      { id: 'lecon', title: 'Preparer une lecon', objective: 'Prepare une fiche de lecon claire pour des eleves de CM2.', format: 'Fiche : objectifs, activites, evaluation.' },
      { id: 'exercices', title: 'Creer des exercices', objective: 'Cree 5 exercices progressifs avec le corrige.', format: '5 exercices + corrige.' },
      { id: 'parents', title: 'Message aux parents', objective: 'Redige un message aux parents pour annoncer une reunion.', format: 'Message respectueux de 80 mots.' },
    ],
  },
  {
    id: 'infirmier',
    name: 'Infirmier / infirmiere',
    emoji: '💉',
    category: 'Sante & Education',
    tasks: [
      { id: 'sensibilisation', title: 'Sensibiliser un village', objective: 'Prepare un message de sensibilisation simple pour un public peu instruit.', format: 'Message oral en 5 points simples.' },
      { id: 'stocks', title: 'Suivi des stocks', objective: 'Cree un tableau de suivi des stocks de medicaments essentiels.', format: 'Tableau avec seuils d\'alerte.' },
      { id: 'conseils', title: 'Conseils au patient', objective: 'Redige des conseils de suivi a donner a un patient en francais simple.', format: '5 conseils courts.' },
    ],
  },
  {
    id: 'pharmacie',
    name: 'Gerant de depot pharmaceutique',
    emoji: '💊',
    category: 'Sante & Education',
    tasks: [
      { id: 'conseil', title: 'Conseiller un client', objective: 'Prepare une trame de conseil pour un client qui vient sans ordonnance.', format: 'Trame en 4 questions.' },
      { id: 'peremption', title: 'Suivre les peremptions', objective: 'Propose une methode simple pour suivre les dates de peremption.', format: 'Methode en 3 etapes.' },
      { id: 'gardes', title: 'Planning des gardes', objective: 'Cree un planning de garde equitable pour mon equipe.', format: 'Planning type en tableau.' },
    ],
  },

  // ============ SERVICES & TRANSPORT ============
  {
    id: 'mototaxi',
    name: 'Moto-taxi',
    emoji: '🏍️',
    category: 'Services & Transport',
    tasks: [
      { id: 'fideles', title: 'Fideliser mes clients', objective: 'Propose 3 idees pour que mes clients me rappellent directement.', format: '3 idees simples.' },
      { id: 'securite', title: 'Checklist du depart', objective: 'Cree une checklist securite de depart pour chaque journee.', format: 'Checklist de 5 points.' },
      { id: 'recette', title: 'Gerer ma recette', objective: 'Aide-moi a organiser ma recette quotidienne entre carburant, entretien et epargne.', format: 'Repartition en 3 parts avec exemple en FCFA.' },
    ],
  },
  {
    id: 'taxi',
    name: 'Chauffeur de taxi',
    emoji: '🚕',
    category: 'Services & Transport',
    tasks: [
      { id: 'courses', title: 'Optimiser mes courses', objective: 'Propose une strategie pour trouver plus de courses aux heures creuses.', format: '3 strategies.' },
      { id: 'entretien', title: 'Suivi d\'entretien', objective: 'Cree un tableau de suivi d\'entretien de mon vehicule.', format: 'Tableau : kilometrage / action.' },
      { id: 'service', title: 'Me demarquer', objective: 'Donne 4 attitudes pour offrir un meilleur service et avoir des recommandations.', format: '4 attitudes.' },
    ],
  },
  {
    id: 'immobilier',
    name: 'Agent immobilier',
    emoji: '🏠',
    category: 'Services & Transport',
    tasks: [
      { id: 'annonce', title: 'Annonce qui marche', objective: 'Redige une annonce attractive pour une maison a louer.', format: 'Annonce de 100 mots avec points forts.' },
      { id: 'visite', title: 'Reussir une visite', objective: 'Prepare le deroule d\'une visite qui rassure le client.', format: 'Deroule en 5 etapes.' },
      { id: 'proprietaires', title: 'Convaincre un proprietaire', objective: 'Ecris un message pour convaincre un proprietaire de me confier son bien.', format: 'Message professionnel de 100 mots.' },
    ],
  },
  {
    id: 'comptable',
    name: 'Comptable de PME',
    emoji: '🧾',
    category: 'Services & Transport',
    tasks: [
      { id: 'caisse', title: 'Tenir la caisse', objective: 'Propose un modele simple de cahier de caisse pour une petite entreprise.', format: 'Tableau : date / entree / sortie / solde.' },
      { id: 'impots', title: 'Preparer les impots', objective: 'Fais une checklist des documents a preparer avant l\'echeance fiscale.', format: 'Checklist de 8 documents.' },
      { id: 'rapport', title: 'Rapport mensuel', objective: 'Redige un modele de rapport mensuel simple pour le patron.', format: 'Modele en 5 sections.' },
    ],
  },

  // ============ PROJETS & CARRIERE ============
  {
    id: 'ong',
    name: 'Charge(e) de projet ONG',
    emoji: '🤝',
    category: 'Projets & Carriere',
    tasks: [
      { id: 'rapport', title: 'Rapport bailleur', objective: 'Redige la structure d\'un rapport d\'activites pour un bailleur de fonds.', format: 'Plan en 6 sections.' },
      { id: 'budget', title: 'Budget de projet', objective: 'Prepare un modele de budget simple pour un projet communautaire.', format: 'Budget en tableau avec 5 lignes.' },
      { id: 'mobiliser', title: 'Mobiliser la communaute', objective: 'Propose 3 actions pour mobiliser la communaute autour du projet.', format: '3 actions concretes.' },
    ],
  },
  {
    id: 'etudiant',
    name: 'Etudiant(e)',
    emoji: '🎓',
    category: 'Projets & Carriere',
    tasks: [
      { id: 'fiches', title: 'Fiches de revision', objective: 'Transforme mon cours en fiches de revision efficaces.', format: '5 fiches synthetiques.' },
      { id: 'memoire', title: 'Plan de memoire', objective: 'Propose un plan de memoire structure sur mon sujet.', format: 'Plan detaille en 3 parties.' },
      { id: 'stage', title: 'Lettre de stage', objective: 'Redige une lettre de motivation pour un stage en entreprise.', format: 'Lettre de 200 mots.' },
    ],
  },
  {
    id: 'emploi',
    name: "Chercheur d'emploi",
    emoji: '💼',
    category: 'Projets & Carriere',
    tasks: [
      { id: 'cv', title: 'Refaire mon CV', objective: 'Ameliore mon CV pour le rendre percutant meme avec peu d\'experience.', format: 'CV en 5 sections avec exemples.' },
      { id: 'entretien', title: 'Preparer un entretien', objective: 'Prepare-moi a un entretien d\'embauche avec les 10 questions probables.', format: '10 questions + bonnes reponses.' },
      { id: 'profil', title: 'Presentation professionnelle', objective: 'Redige une presentation professionnelle pour mes reseaux.', format: 'Presentation de 100 mots.' },
    ],
  },
];