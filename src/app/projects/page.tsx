'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { projects } from '@/data/projects';
import { useUserProgress } from '@/stores/useUserProgress';
import { useLocale } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const { completedMissions, unlockedWorlds } = useUserProgress();
  const { t } = useLocale();

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-16">
      <GlassCard className="mb-8 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-300 dark:text-sky-300" style={{ color: '#0ea5e9' }}>
          {t.projects.badge}
        </p>

        <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
          {t.projects.title}
        </h1>

        <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-400">
          {t.projects.description}
        </p>
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const allStepsDone = project.steps.every((step) =>
            completedMissions.includes(`${project.id}-${step.id}`)
          );

          const doneSteps = project.steps.filter((step) =>
            completedMissions.includes(`${project.id}-${step.id}`)
          ).length;

          const hasPrerequisites = project.prerequisites.every((prereq) =>
            unlockedWorlds.includes(prereq)
          );

          const getDifficultyLabel = (difficulty: string) => {
            switch(difficulty) {
              case 'debutant': return t.projects.beginner;
              case 'intermediaire': return t.projects.intermediate;
              case 'avance': return t.projects.advanced;
              default: return difficulty;
            }
          };

          return (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <GlassCard className="h-full p-6 transition hover:scale-[1.02] hover:bg-slate-50 dark:hover:bg-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-4xl">{project.emoji}</div>
                  {allStepsDone && (
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-300">
                      Termine 🏆
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
                  {project.title}
                </h2>

                <p className="mt-2 text-sm text-slate-700 dark:text-slate-400">{project.tagline}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-bold',
                      project.difficulty === 'debutant'
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300'
                        : project.difficulty === 'intermediaire'
                          ? 'border-sky-400/30 bg-sky-400/10 text-sky-600 dark:text-sky-300'
                          : 'border-violet-400/30 bg-violet-400/10 text-violet-600 dark:text-violet-300'
                    )}
                  >
                    {getDifficultyLabel(project.difficulty)}
                  </span>

                  <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    ⏱️ {project.duration}
                  </span>

                  <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    +{project.totalXp} XP
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-500">
                    <span>
                      {doneSteps}/{project.steps.length} etapes
                    </span>
                    <span>{Math.round((doneSteps / project.steps.length) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500 transition-all duration-700"
                      style={{
                        width: `${(doneSteps / project.steps.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {!hasPrerequisites && (
                  <p className="mt-4 text-xs text-red-600 dark:text-red-400">
                    🔒 Prerequis non remplis : termine d'abord{' '}
                    {project.prerequisites.join(', ')}
                  </p>
                )}
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
