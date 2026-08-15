'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client-browser';
import { GlassCard } from '@/components/ui/GlassCard';
import XPBar from '@/components/gamification/XPBar';
import { getLevel, USER_GOALS } from '@/lib/constants';
import { useUserProgress } from '@/stores/useUserProgress';
import { useLocale } from '@/components/providers/LocaleProvider';
import { bosses } from '@/data/bosses';
import { cn } from '@/lib/utils';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

const FR = {
  menu: 'Menu',
  badge: '🎮 Dashboard',
  title: 'Ton parcours IA',
  welcome: 'Bienvenue',
  welcomeText: 'XP, niveau, missions et territoires synchronises.',
  currentLevel: 'Niveau actuel',
  levelWord: 'Niveau',
  progress: 'Progression',
  nextLevel: 'Prochain niveau',
  goal: 'Objectif',
  noGoal: 'Aucun objectif choisi pour le moment.',
  changeGoal: 'Modifier mon objectif',
  stats: 'Statistiques',
  missions: 'Missions',
  worlds: 'Territoires',
  totalXp: 'XP total',
  streak: 'Streak',
  days: 'j',
  badges: 'Tes badges de boss',
  badgesHint:
    'Un badge se gagne en terminant toutes les lecons d\'un monde puis en vainquant son boss (score 75+).',
};

const EN = {
  menu: 'Menu',
  badge: '🎮 Dashboard',
  title: 'Your AI journey',
  welcome: 'Welcome',
  welcomeText: 'XP, level, missions and territories synced.',
  currentLevel: 'Current level',
  levelWord: 'Level',
  progress: 'Progress',
  nextLevel: 'Next level',
  goal: 'Goal',
  noGoal: 'No goal selected yet.',
  changeGoal: 'Change my goal',
  stats: 'Statistics',
  missions: 'Missions',
  worlds: 'Territories',
  totalXp: 'Total XP',
  streak: 'Streak',
  days: 'd',
  badges: 'Your boss badges',
  badgesHint:
    'A badge is earned by finishing all lessons of a world, then defeating its boss (score 75+).',
};

export default function DashboardPage() {
  const router = useRouter();
  const { xp, goal, completedMissions, unlockedWorlds, streak } =
    useUserProgress();
  const { locale } = useLocale();
  const ui = locale === 'fr' ? FR : EN;

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const supabase = createClient();

  const level = getLevel(xp);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/auth');
        return;
      }

      setUserEmail(session.user.email ?? null);
    }

    checkAuth();
  }, [router]);

  const selectedGoal = USER_GOALS.find((item) => item.id === goal);

  if (!userEmail) {
    return (
      <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-sky-400" />
      </section>
    );
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-8 lg:flex lg:items-start lg:gap-6">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="mt-6 flex-1 lg:mt-0">
        {/* Bouton menu mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 lg:hidden"
        >
          ☰ {ui.menu}
        </button>

        <GlassCard className="mb-6 p-8">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-300">
            {ui.badge}
          </p>

          <h1 className="mt-3 text-4xl font-black text-white">{ui.title}</h1>

          <p className="mt-3 text-slate-400">
            {ui.welcome}{' '}
            <span className="font-bold text-white">{userEmail}</span> !{' '}
            {ui.welcomeText}
          </p>
        </GlassCard>

        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-8">
            <h2 className="text-sm uppercase tracking-widest text-slate-500">
              {ui.currentLevel}
            </h2>

            <p className="mt-4 text-3xl font-black text-white">{level.title}</p>

            <p className="mt-2 text-sm text-slate-400">
              {ui.levelWord} {level.level} — {xp} XP
            </p>

            <XPBar progress={level.progress} className="mt-6" />

            <p className="mt-3 text-sm text-slate-400">
              {ui.progress} : {Math.round(level.progress)}%
            </p>

            {level.next && (
              <p className="mt-4 text-sm text-slate-500">
                {ui.nextLevel} : {level.next.title}
              </p>
            )}
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-sm uppercase tracking-widest text-slate-500">
              {ui.goal}
            </h2>

            {selectedGoal ? (
              <div className="mt-6 flex items-center gap-4">
                <span className="text-4xl">{selectedGoal.emoji}</span>
                <span className="text-xl font-bold text-white">
                  {locale === 'en' ? selectedGoal.en : selectedGoal.fr}
                </span>
              </div>
            ) : (
              <p className="mt-6 text-slate-400">{ui.noGoal}</p>
            )}

            <Link
              href="/onboarding"
              className="mt-8 inline-block rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/20"
            >
              {ui.changeGoal}
            </Link>
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-sm uppercase tracking-widest text-slate-500">
              {ui.stats}
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4">
                <span className="text-sm text-slate-400">{ui.missions}</span>
                <span className="text-xl font-black text-white">
                  {completedMissions.length}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4">
                <span className="text-sm text-slate-400">{ui.worlds}</span>
                <span className="text-xl font-black text-white">
                  {unlockedWorlds.length}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4">
                <span className="text-sm text-slate-400">{ui.totalXp}</span>
                <span className="text-xl font-black text-white">{xp}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4">
                <span className="text-sm text-slate-400">{ui.streak}</span>
                <span className="text-xl font-black text-orange-400">
                  🔥 {streak} {ui.days}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mt-6 p-8">
          <h2 className="text-sm uppercase tracking-widest text-slate-500">
            {ui.badges}
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {bosses.map((boss) => {
              const earned = completedMissions.includes(boss.id);
              return (
                <div
                  key={boss.id}
                  className={cn(
                    'flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold',
                    earned
                      ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                      : 'border-white/10 bg-white/5 text-slate-500'
                  )}
                >
                  <span className="text-xl">{earned ? boss.emoji : '🔒'}</span>
                  {boss.title.replace('Boss : ', '')}
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-slate-500">{ui.badgesHint}</p>
        </GlassCard>
      </div>
    </section>
  );
}