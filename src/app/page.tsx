'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useUserProgress } from '@/stores/useUserProgress';
import { getLevel } from '@/lib/constants';
import LiveStats from '@/components/home/LiveStats';
import { useUser } from '@/lib/hooks/useUser';

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-white/5" />
    ),
  }
);

export default function HomePage() {
  const { t } = useLocale();
  const { user } = useUser();
  const xp = useUserProgress((state) => state.xp);
  const level = getLevel(xp);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:from-transparent dark:via-black/10 dark:to-black/70" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="glass mb-6 rounded-full px-4 py-2 text-xs font-extrabold tracking-[0.35em] text-sky-600 dark:text-sky-300">
          {t.hero.badge}
        </p>

        <h1 className="text-5xl font-black tracking-[0.22em] text-gradient md:text-7xl drop-shadow-sm">
          {t.hero.title}
        </h1>

        <p className="mt-6 text-lg font-black tracking-[0.35em] text-slate-900 md:text-2xl dark:text-slate-200">
          {t.hero.subtitle}
        </p>

        <p className="mt-4 max-w-2xl text-base font-bold text-slate-800 md:text-lg dark:text-slate-400">
          {t.hero.description}
        </p>

        <p className="mt-2 text-sm font-bold text-slate-700 md:text-base dark:text-slate-500">
          {t.hero.slogan}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row">
          <Link
            href="/onboarding"
            className="rounded-2xl bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 px-8 py-4 text-sm font-black tracking-widest text-white shadow-[0_0_50px_rgba(56,189,248,0.25)] transition hover:scale-[1.02]"
          >
            {t.hero.cta} →
          </Link>

          <Link
            href="/carte"
            className="glass rounded-2xl px-8 py-4 text-sm font-black tracking-widest text-slate-900 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {t.hero.secondary}
          </Link>

                    {user && (
            <Link
              href="/challenge"
              className="rounded-2xl border-2 border-amber-600 bg-amber-100 px-8 py-4 text-sm font-black tracking-widest text-amber-900 transition hover:bg-amber-200 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300 dark:hover:bg-amber-400/20"
            >
              {t.hero.challenge}
            </Link>
          )}
        </div>

        {xp > 0 && (
          <div className="glass mt-10 rounded-2xl px-6 py-4 text-sm">
            <p className="font-black text-slate-900 dark:text-white">
              {level.title} — {xp} XP
            </p>
            <p className="mt-1 font-bold text-slate-800 dark:text-slate-400">
              {t.hero.progression} : {Math.round(level.progress)}%
            </p>
          </div>
        )}
          </div>

      <LiveStats />
    </section>
  );
}