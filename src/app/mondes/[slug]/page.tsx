'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { worlds } from '@/data/worlds';
import { lessons } from '@/data/lessons';
import { bosses } from '@/data/bosses';
import { useUserProgress } from '@/stores/useUserProgress';
import { cn } from '@/lib/utils';
import type { PromptScoreResult } from '@/types';

export default function WorldPage() {
  const params = useParams();

  const slug =
    typeof params.slug === 'string'
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : undefined;

  const world = worlds.find((item) => item.slug === slug);

  const {
    unlockedWorlds,
    unlockWorld,
    addXp,
    completedMissions,
    completeMission,
  } = useUserProgress();

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [missionPrompt, setMissionPrompt] = useState('');
  const [missionResult, setMissionResult] = useState<PromptScoreResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [bossPrompt, setBossPrompt] = useState('');
  const [bossResult, setBossResult] = useState<PromptScoreResult | null>(null);
  const [bossLoading, setBossLoading] = useState(false);

  if (!world) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <GlassCard>
          <h1 className="text-2xl font-bold text-white">Monde introuvable</h1>
          <Link
            href="/carte"
            className="mt-6 inline-block rounded-xl bg-white/10 px-6 py-3 font-semibold text-slate-200"
          >
            Retour à la carte
          </Link>
        </GlassCard>
      </section>
    );
  }

  const unlocked =
    unlockedWorlds.includes(world.slug) || world.prerequisites.length === 0;

  const canUnlock = world.prerequisites.every((prerequisite) =>
    unlockedWorlds.includes(prerequisite)
  );

  const missingPrerequisites = world.prerequisites.filter(
    (prerequisite) => !unlockedWorlds.includes(prerequisite)
  );

  const worldLessons = lessons.filter((lesson) => lesson.worldSlug === world.slug);
  const doneCount = worldLessons.filter((lesson) =>
    completedMissions.includes(`lesson-${lesson.id}`)
  ).length;
  const allLessonsDone =
    worldLessons.length > 0 && doneCount === worldLessons.length;

  const worldBoss = bosses.find((boss) => boss.worldSlug === world.slug);
  const bossDone = worldBoss ? completedMissions.includes(worldBoss.id) : false;

  const missionId = `${world.slug}-mission-demo`;
  const missionCompleted = completedMissions.includes(missionId);

  async function analyzeMission() {
    setAnalyzing(true);
    try {
      const response = await fetch('/api/prompt-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: missionPrompt }),
      });
      const data = await response.json();
      setMissionResult(data);

      if (data.total >= 70) {
        completeMission('mission-prompting-1', 100);
      }
    } finally {
      setAnalyzing(false);
    }
  }

  async function submitBoss() {
    if (!worldBoss) return;
    setBossLoading(true);
    try {
      const response = await fetch('/api/prompt-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: bossPrompt }),
      });
      const data = await response.json();
      setBossResult(data);

      if (data.total >= worldBoss.requiredScore) {
        completeMission(worldBoss.id, worldBoss.xp);
      }
    } finally {
      setBossLoading(false);
    }
  }

  return (
    <section className="mx-auto min-h-screen max-w-5xl px-4 py-16">
      <GlassCard className="p-8 md:p-12">
        <Link
          href="/carte"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Retour à la carte
        </Link>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-5xl">{world.emoji}</div>
            <h1 className="mt-4 text-4xl font-black text-white">{world.title}</h1>
            <p className="mt-2 text-lg text-slate-400">{world.tagline}</p>
          </div>

          <span
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-bold',
              unlocked
                ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                : 'border-white/10 bg-white/5 text-slate-400'
            )}
          >
            {unlocked ? 'Territoire débloqué' : 'Territoire verrouillé'}
          </span>
        </div>

        <p className="mt-8 text-slate-300">{world.description}</p>

        {!unlocked && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-lg font-bold text-white">Conditions de déblocage</h2>

            {missingPrerequisites.length > 0 ? (
              <ul className="mt-4 space-y-2 text-slate-400">
                {missingPrerequisites.map((prerequisite) => {
                  const prerequisiteWorld = worlds.find(
                    (item) => item.slug === prerequisite
                  );
                  return (
                    <li key={prerequisite}>
                      🔒 Terminer :{' '}
                      <span className="text-slate-200">
                        {prerequisiteWorld?.title ?? prerequisite}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-slate-400">
                Les prérequis sont remplis. Tu peux débloquer ce territoire.
              </p>
            )}

            {canUnlock && (
              <button
                onClick={() => {
                  unlockWorld(world.slug);
                  addXp(50);
                }}
                className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 px-8 py-4 text-sm font-black tracking-widest text-white"
              >
                Débloquer le territoire
              </button>
            )}
          </div>
        )}

        {unlocked && worldLessons.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-white">📚 Leçons</h2>

            <div className="mt-4 space-y-3">
              {worldLessons.map((lesson) => {
                const done = completedMissions.includes(`lesson-${lesson.id}`);
                const open = selectedLessonId === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    className="rounded-3xl border border-white/10 bg-black/30 p-5"
                  >
                    <button
                      onClick={() => setSelectedLessonId(open ? null : lesson.id)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <div>
                        <p className="font-semibold text-white">{lesson.title}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {lesson.minutes} min · +{lesson.xp} XP
                        </p>
                      </div>
                      <span
                        className={cn(
                          'rounded-full border px-3 py-1 text-xs font-bold',
                          done
                            ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                            : 'border-white/10 bg-white/5 text-slate-400'
                        )}
                      >
                        {done ? 'Terminée ✓' : 'Lire'}
                      </span>
                    </button>

                    {open && (
                      <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
                        {lesson.content.map((paragraph, index) => (
                          <p key={index} className="text-sm leading-relaxed text-slate-300">
                            {paragraph}
                          </p>
                        ))}

                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                            À retenir
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-slate-300">
                            {lesson.keyPoints.map((point) => (
                              <li key={point}>• {point}</li>
                            ))}
                          </ul>
                        </div>

                        <button
                          disabled={done}
                          onClick={() => completeMission(`lesson-${lesson.id}`, lesson.xp)}
                          className={cn(
                            'rounded-xl px-5 py-3 text-sm font-bold',
                            done
                              ? 'cursor-not-allowed bg-white/5 text-slate-500'
                              : 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                          )}
                        >
                          {done ? 'Déjà terminée' : `J'ai compris (+${lesson.xp} XP)`}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {unlocked && worldBoss && (
          <div className="mt-10 rounded-3xl border border-amber-400/20 bg-black/30 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-white">👑 {worldBoss.title}</h2>
              {bossDone && (
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                  Boss vaincu 🏆
                </span>
              )}
            </div>

            {!allLessonsDone && (
              <div className="mt-4">
                <p className="text-sm text-slate-400">
                  🔒 Termine les {worldLessons.length} leçons du monde pour
                  débloquer le boss ({doneCount}/{worldLessons.length}).
                </p>
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                    style={{
                      width: `${(doneCount / Math.max(1, worldLessons.length)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {allLessonsDone && !bossDone && (
              <div className="mt-4">
                <p className="text-sm text-slate-300">{worldBoss.task}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Score requis : {worldBoss.requiredScore}/100 · Récompense : +
                  {worldBoss.xp} XP + badge du monde
                </p>

                <textarea
                  value={bossPrompt}
                  onChange={(event) => setBossPrompt(event.target.value)}
                  placeholder="Ecris ton prompt de boss ici..."
                  className="mt-4 h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-100 outline-none focus:border-amber-400/60"
                />

                <button
                  onClick={submitBoss}
                  disabled={bossLoading}
                  className="mt-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-black text-white disabled:opacity-50"
                >
                  {bossLoading ? 'Evaluation...' : 'Affronter le boss'}
                </button>

                {bossResult && (
                  <div className="mt-5 rounded-2xl bg-white/5 p-4">
                    <p className="text-sm text-slate-300">
                      Score :{' '}
                      <span className="font-black text-white">
                        {bossResult.total}/100
                      </span>
                    </p>
                    {bossResult.total >= worldBoss.requiredScore ? (
                      <p className="mt-2 text-sm font-bold text-amber-300">
                        🏆 Boss vaincu ! +{worldBoss.xp} XP et badge obtenu !
                      </p>
                    ) : (
                      <ul className="mt-2 space-y-1 text-sm text-slate-400">
                        {(bossResult.feedback ?? []).map((feedback, index) => (
                          <li key={index}>💡 {feedback}</li>
                        ))}
                        {(!bossResult.feedback || bossResult.feedback.length === 0) && (
                          <li className="text-slate-500">Améliore ton prompt avec plus de contexte et de structure.</li>
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            {allLessonsDone && bossDone && (
              <p className="mt-4 text-sm text-amber-300">
                🏆 Badge obtenu : {world.emoji} Maître du monde {world.title}.
                Ce territoire n&apos;a plus de secret pour toi !
              </p>
            )}
          </div>
        )}

        {unlocked && world.slug === 'prompting' && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-lg font-bold text-white">
              🧪 Mission #1 : Améliore ce prompt
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Prompt initial : « Fais-moi un plan marketing. » Réécris-le avec un
              rôle, un contexte, un objectif, des contraintes et un format.
              Score requis : 70/100.
            </p>

            <textarea
              value={missionPrompt}
              onChange={(event) => setMissionPrompt(event.target.value)}
              placeholder="Écris ta version améliorée ici..."
              className="mt-4 h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-100 outline-none focus:border-sky-400/60"
            />

            <button
              onClick={analyzeMission}
              disabled={analyzing}
              className="mt-4 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-black text-white disabled:opacity-50"
            >
              {analyzing ? 'Analyse...' : 'Soumettre ma version'}
            </button>

            {missionResult && (
              <div className="mt-5 rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">
                  Score :{' '}
                  <span className="font-black text-white">
                    {missionResult.total}/100
                  </span>
                </p>

                {missionResult.total >= 70 ? (
                  <p className="mt-2 text-sm font-bold text-emerald-300">
                    🎉 Mission réussie ! +100 XP
                  </p>
                ) : (
                  <ul className="mt-2 space-y-1 text-sm text-slate-400">
                    {missionResult.feedback.map((feedback, index) => (
                      <li key={index}>💡 {feedback}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {unlocked && world.slug !== 'prompting' && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-lg font-bold text-white">Mission démo</h2>
            <p className="mt-3 text-slate-400">
              Mission de démonstration du monde {world.title}.
            </p>
            <button
              disabled={missionCompleted}
              onClick={() => completeMission(missionId, 80)}
              className={cn(
                'mt-6 rounded-2xl px-8 py-4 text-sm font-black tracking-widest transition',
                missionCompleted
                  ? 'cursor-not-allowed bg-white/10 text-slate-500'
                  : 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
              )}
            >
              {missionCompleted ? 'Mission terminée ✓' : 'Terminer la mission'}
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/lab"
            className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/20"
          >
            Ouvrir le Prompt Lab
          </Link>
          <Link
            href="/projects"
            className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/20"
          >
            Voir les projets
          </Link>
        </div>
      </GlassCard>
    </section>
  );
}