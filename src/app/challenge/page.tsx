'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { challenge } from '@/data/challenge';
import { useUserProgress } from '@/stores/useUserProgress';
import { cn } from '@/lib/utils';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
    >
      {copied ? 'Copié !' : 'Copier'}
    </button>
  );
}

export default function ChallengePage() {
  const router = useRouter();
  const { completedMissions, completeMission } = useUserProgress();
  const [expanded, setExpanded] = useState<string | null>(null);

  const doneSteps = challenge.steps.filter((step) =>
    completedMissions.includes(`challenge-${step.id}`)
  ).length;

  const allDone = doneSteps === challenge.steps.length;
  const totalXp = challenge.steps.reduce((sum, step) => sum + step.xp, 0);

  function openInLab(prompt: string) {
    navigator.clipboard.writeText(prompt).catch(() => {});
    router.push('/lab');
  }

  return (
    <section className="mx-auto min-h-screen max-w-5xl px-4 py-16">
      <GlassCard className="p-8 md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300">
          🔥 Challenge Entrepreneur IA
        </p>

        <h1 className="mt-3 text-4xl font-black text-white">
          {challenge.tagline}
        </h1>

        <p className="mt-4 max-w-3xl text-slate-400">{challenge.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
            ⏱️ {challenge.duration}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
            +{totalXp} XP
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
            🏆 Badge Entrepreneur IA
          </span>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>
              Progression : {doneSteps}/{challenge.steps.length} etapes
            </span>
            <span>
              {Math.round((doneSteps / challenge.steps.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-700"
              style={{
                width: `${(doneSteps / challenge.steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {allDone && (
          <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-6 text-center">
            <p className="text-2xl font-black text-amber-300">
              🏆 Badge Entrepreneur IA obtenu !
            </p>
            <p className="mt-2 text-sm text-amber-200">
              Tu es passe de l'idee a la vente avec l'IA. Ce systeme est a toi
              pour la vie : recommence-le pour chaque nouveau projet.
            </p>
          </div>
        )}
      </GlassCard>

      <div className="mt-6 space-y-4">
        {challenge.steps.map((step) => {
          const done = completedMissions.includes(`challenge-${step.id}`);
          const open = expanded === step.id;

          return (
            <GlassCard key={step.id} className="p-6">
              <button
                onClick={() => setExpanded(open ? null : step.id)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-black',
                      done
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : 'bg-amber-400/10 text-amber-300'
                    )}
                  >
                    {done ? '✓' : step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {step.emoji} {step.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Etape {step.number}/10 · +{step.xp} XP
                    </p>
                  </div>
                </div>

                <svg
                  className={cn(
                    'h-5 w-5 flex-shrink-0 text-slate-400 transition-transform',
                    open && 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <div className="mt-6 space-y-6 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                      📖 Methode
                    </p>
                    <ul className="mt-3 space-y-2">
                      {step.method.map((paragraph, index) => (
                        <li key={index} className="text-sm text-slate-300">
                          • {paragraph}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
                      🤖 Prompts IA prets a l'emploi
                    </p>
                    <div className="mt-3 space-y-3">
                      {step.prompts.map((promptItem, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-white/10 bg-black/30 p-4"
                        >
                          <p className="text-sm font-bold text-white">
                            {promptItem.title}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-slate-400">
                            {promptItem.prompt}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <CopyButton text={promptItem.prompt} />
                            <button
                              onClick={() => openInLab(promptItem.prompt)}
                              className="rounded-xl border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-400/20"
                            >
                              Tester au Lab →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-amber-400/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      📦 Livrable
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {step.deliverable}
                    </p>
                  </div>

                  <button
                    disabled={done}
                    onClick={() =>
                      completeMission(`challenge-${step.id}`, step.xp)
                    }
                    className={cn(
                      'w-full rounded-xl px-6 py-3 text-sm font-bold transition',
                      done
                        ? 'cursor-not-allowed bg-emerald-400/20 text-emerald-300'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-[1.02]'
                    )}
                  >
                    {done ? '✓ Etape terminee' : 'Marquer l\'etape comme terminee'}
                  </button>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}