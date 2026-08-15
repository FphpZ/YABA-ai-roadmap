'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { useUserProgress } from '@/stores/useUserProgress';

export default function PortfolioPage() {
  const { xp, completedMissions, unlockedWorlds, goal } = useUserProgress();

  return (
    <section className="mx-auto min-h-screen max-w-5xl px-4 py-16">
      <GlassCard className="p-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-300">
          🏆 AI Portfolio
        </p>

        <h1 className="mt-4 text-4xl font-black text-white">
          Ton profil d’expert en construction
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Cette page deviendra ton portfolio IA : projets terminés, missions
          réussies, badges obtenus, compétences validées et réalisations
          publiques.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="glass rounded-3xl p-6">
            <p className="text-sm text-slate-400">XP</p>
            <p className="mt-2 text-3xl font-black text-white">{xp}</p>
          </div>

          <div className="glass rounded-3xl p-6">
            <p className="text-sm text-slate-400">Missions terminées</p>
            <p className="mt-2 text-3xl font-black text-white">
              {completedMissions.length}
            </p>
          </div>

          <div className="glass rounded-3xl p-6">
            <p className="text-sm text-slate-400">Territoires débloqués</p>
            <p className="mt-2 text-3xl font-black text-white">
              {unlockedWorlds.length}
            </p>
          </div>
        </div>

        {goal && (
          <p className="mt-8 text-sm text-slate-400">
            Objectif choisi : <span className="text-white">{goal}</span>
          </p>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/projects"
            className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/20"
          >
            Voir les projets
          </Link>

          <Link
            href="/carte"
            className="rounded-2xl bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 px-6 py-3 text-sm font-black text-white"
          >
            Continuer le parcours
          </Link>
        </div>
      </GlassCard>
    </section>
  );
}