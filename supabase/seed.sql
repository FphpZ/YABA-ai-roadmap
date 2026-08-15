-- =====================================================
-- SEED MONDES
-- =====================================================

insert into public.worlds (
  slug,
  title,
  tagline,
  description,
  color,
  emoji,
  prerequisites
) values
(
  'foundations',
  'Fondamentaux IA',
  'Comprendre ce que l’on utilise.',
  'Le territoire initial pour comprendre les concepts essentiels : IA, machine learning, deep learning, LLM, tokens, context window, embeddings, hallucinations, API et agents.',
  '#22c55e',
  '🧩',
  '{}'
),
(
  'prompting',
  'Prompting',
  'Maîtriser la langue des machines.',
  'Apprends à structurer un prompt, donner du contexte, définir un rôle, poser des contraintes, demander un format et enchaîner plusieurs prompts.',
  '#38bdf8',
  '✨',
  '{foundations}'
),
(
  'reasoning',
  'Reasoning',
  'Faire raisonner l’IA.',
  'Décomposition de problème, raisonnement structuré, vérification, critique, comparaison, planification et auto-évaluation.',
  '#a78bfa',
  '🧠',
  '{prompting}'
),
(
  'research',
  'Research',
  'Rechercher, analyser, synthétiser.',
  'Utiliser l’IA pour rechercher, comparer des sources, analyser des documents, synthétiser, vérifier des informations et travailler avec des PDF.',
  '#f59e0b',
  '🔎',
  '{prompting}'
),
(
  'creative-ai',
  'Creative AI',
  'Créer des images, vidéos et sons.',
  'Génération d’images, cohérence visuelle, style, vidéo, scénario, storyboard, voix, musique et sound design.',
  '#ec4899',
  '🎨',
  '{foundations}'
),
(
  'ai-coding',
  'AI for Coding',
  'Coder avec l’IA.',
  'Génération de code, debugging, refactoring, documentation, tests, architecture, Git, GitHub et assistants de programmation.',
  '#06b6d4',
  '💻',
  '{prompting}'
),
(
  'automation',
  'Automation',
  'Connecter l’IA à des systèmes.',
  'Workflows, API, bases de données, automatisations, outils no-code, agents et systèmes multi-outils.',
  '#f97316',
  '⚙️',
  '{prompting,ai-coding}'
),
(
  'ai-agents',
  'AI Agents',
  'Construire des systèmes autonomes.',
  'Planification, outils, mémoire, recherche web, API, bases de données, RAG et agents capables d’agir.',
  '#8b5cf6',
  '🤖',
  '{reasoning,automation}'
)
on conflict (slug) do update set
  title = excluded.title,
  tagline = excluded.tagline,
  description = excluded.description,
  color = excluded.color,
  emoji = excluded.emoji,
  prerequisites = excluded.prerequisites;

-- =====================================================
-- SEED OUTILS
-- =====================================================

insert into public.tools (
  name,
  category,
  description,
  level,
  url,
  alternatives
) values
(
  'ChatGPT',
  'chat',
  'Assistant généraliste pour discuter, apprendre, coder, rédiger et raisonner.',
  'Débutant',
  'https://chatgpt.com',
  '{Claude,Gemini,Mistral}'
),
(
  'Midjourney',
  'image',
  'Génération d’images artistiques et stylisées.',
  'Intermédiaire',
  'https://midjourney.com',
  '{Flux,DALL·E,Stable Diffusion}'
),
(
  'Perplexity',
  'research',
  'Moteur de recherche IA pour poser des questions avec sources.',
  'Débutant',
  'https://perplexity.ai',
  '{You.com,Phind}'
),
(
  'Cursor',
  'code',
  'Éditeur IA pour générer, corriger et comprendre du code rapidement.',
  'Intermédiaire',
  'https://cursor.sh',
  '{GitHub Copilot,Windsurf}'
),
(
  'Make',
  'automation',
  'Automatisation visuelle avancée pour connecter des services et API.',
  'Intermédiaire',
  'https://make.com',
  '{Zapier,n8n}'
);

-- =====================================================
-- SEED PROJETS
-- =====================================================

insert into public.projects (
  level,
  title,
  description,
  objectives,
  xp_reward
) values
(
  'débutant',
  'Assistant personnel IA',
  'Créer un assistant personnel capable de répondre à des questions et d’aider à organiser des idées.',
  '{
    "Définir le rôle de l’assistant",
    "Créer un prompt système",
    "Tester plusieurs formats de réponse",
    "Améliorer la clarté"
  }',
  150
),
(
  'intermédiaire',
  'Générateur de contenu',
  'Construire un système qui génère des publications, emails ou idées marketing selon un public cible.',
  '{
    "Créer des templates de prompts",
    "Ajouter le contexte local",
    "Gérer le ton",
    "Produire plusieurs variantes"
  }',
  300
),
(
  'avancé',
  'Système RAG',
  'Créer un système capable de répondre à partir de documents en combinant recherche et génération.',
  '{
    "Comprendre les embeddings",
    "Indexer des documents",
    "Récupérer le bon contexte",
    "Réduire les hallucinations"
  }',
  500
),
(
  'expert',
  'Agent IA multi-outils',
  'Construire un agent capable d’utiliser plusieurs outils : recherche, API, base de données et mémoire.',
  '{
    "Planifier une tâche",
    "Connecter des outils",
    "Ajouter de la mémoire",
    "Évaluer le résultat"
  }',
  900
);

-- =====================================================
-- SEED BADGES
-- =====================================================

insert into public.badges (
  code,
  title,
  description,
  icon
) values
(
  'first-prompt',
  'Premier prompt',
  'Créer ton premier prompt structuré.',
  '✨'
),
(
  'prompt-explorer',
  'Prompt Explorer',
  'Terminer plusieurs missions de prompting.',
  '🧭'
),
(
  'ai-builder',
  'AI Builder',
  'Construire un projet IA concret.',
  '🛠️'
),
(
  'agent-architect',
  'Agent Architect',
  'Créer un agent capable d’utiliser plusieurs outils.',
  '🤖'
)
on conflict (code) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon;

-- =====================================================
-- SEED MISSION DÉMO
-- =====================================================

insert into public.missions (
  world_id,
  title,
  brief,
  initial_prompt,
  xp_reward,
  criteria
)
select
  id,
  'Améliore ce prompt',
  'Transforme ce prompt vague en prompt professionnel avec contexte, rôle, contraintes et format.',
  'Fais-moi un plan marketing.',
  100,
  '{
    "clarity": true,
    "context": true,
    "constraints": true,
    "objective": true,
    "format": true
  }'::jsonb
from public.worlds
where slug = 'prompting';