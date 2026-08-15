'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { projects } from '@/data/projects';
import { useUserProgress } from '@/stores/useUserProgress';
import { cn } from '@/lib/utils';

export default function ProjectPage() {
  const params = useParams();

  const slug =
    typeof params.slug === 'string'
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : undefined;

  const project = projects.find((p) => p.slug === slug);

  const { completedMissions, completeMission } = useUserProgress();

  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <GlassCard>
          <h1 className="text-2xl font-bold text-white">Projet introuvable</h1>
          <Link
            href="/projects"
            className="mt-6 inline-block rounded-xl bg-white/10 px-6 py-3 font-semibold text-slate-200"
          >
            Retour aux projets
          </Link>
        </GlassCard>
      </section>
    );
  }

  const doneSteps = project.steps.filter((step) =>
    completedMissions.includes(`${project.id}-${step.id}`)
  ).length;

  const allDone = doneSteps === project.steps.length;

  return (
    <section className="mx-auto min-h-screen max-w-5xl px-4 py-16">
      <GlassCard className="p-8 md:p-12">
        <Link
          href="/projects"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Retour aux projets
        </Link>

        <div className="mt-8">
          <div className="text-5xl">{project.emoji}</div>
          <h1 className="mt-4 text-4xl font-black text-white">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-slate-400">{project.tagline}</p>
        </div>

        <p className="mt-6 text-slate-300">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-bold',
              project.difficulty === 'debutant'
                ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                : project.difficulty === 'intermediaire'
                  ? 'border-sky-400/30 bg-sky-400/10 text-sky-300'
                  : 'border-violet-400/30 bg-violet-400/10 text-violet-300'
            )}
          >
            {project.difficulty === 'debutant'
              ? 'Debutant'
              : project.difficulty === 'intermediaire'
                ? 'Intermediaire'
                : 'Avance'}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
            ⏱️ {project.duration}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
            +{project.totalXp} XP
          </span>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>
              Progression : {doneSteps}/{project.steps.length} etapes
            </span>
            <span>{Math.round((doneSteps / project.steps.length) * 100)}%</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-700"
              style={{
                width: `${(doneSteps / project.steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {allDone && (
          <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-6 text-center">
            <p className="text-2xl font-black text-amber-300">
              🏆 Projet termine !
            </p>
            <p className="mt-2 text-sm text-amber-200">
              Felicitations ! Tu as construit {project.title} et gagne{' '}
              {project.totalXp} XP.
            </p>
          </div>
        )}
      </GlassCard>

      <div className="mt-6 space-y-4">
        {project.steps.map((step, index) => {
          const done = completedMissions.includes(`${project.id}-${step.id}`);
          const expanded = expandedStep === step.id;

          return (
            <GlassCard key={step.id} className="p-6">
              <button
                onClick={() => setExpandedStep(expanded ? null : step.id)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-black',
                      done
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : 'bg-white/10 text-slate-400'
                    )}
                  >
                    {done ? '✓' : index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-shrink-0 items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                    +{step.xp} XP
                  </span>
                  <svg
                    className={cn(
                      'h-5 w-5 text-slate-400 transition-transform',
                      expanded && 'rotate-180'
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
                </div>
              </button>

              {expanded && (
                <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  {step.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-sm leading-relaxed text-slate-300"
                    >
                      {paragraph}
                    </p>
                  ))}

                  <div className="rounded-2xl bg-sky-400/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                      Livrable
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {step.deliverable}
                    </p>
                  </div>

                  <button
                    disabled={done}
                    onClick={() =>
                      completeMission(`${project.id}-${step.id}`, step.xp)
                    }
                    className={cn(
                      'w-full rounded-xl px-6 py-3 text-sm font-bold transition',
                      done
                        ? 'cursor-not-allowed bg-emerald-400/20 text-emerald-300'
                        : 'bg-gradient-to-r from-sky-500 to-violet-500 text-white hover:scale-[1.02]'
                    )}
                  >
                    {done ? '✓ Etape terminee' : 'Marquer comme terminee'}
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