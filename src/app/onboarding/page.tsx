'use client';

import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { USER_GOALS } from '@/lib/constants';
import { useUserProgress } from '@/stores/useUserProgress';
import { useLocale } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';

export default function OnboardingPage() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const { goal, setGoal, addXp } = useUserProgress();

  return (
    <section className="mx-auto min-h-screen max-w-5xl px-4 py-16">
      <GlassCard className="p-8 md:p-12">
        <h1 className="text-3xl font-black text-white md:text-4xl">
          {t.onboarding.title}
        </h1>

        <p className="mt-3 text-slate-400">
          {t.onboarding.description}
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {USER_GOALS.map((item) => (
            <button
              key={item.id}
              onClick={() => setGoal(item.id)}
              className={cn(
                'glass flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition hover:bg-white/10',
                goal === item.id &&
                  'border-sky-400/70 bg-sky-400/10 shadow-[0_0_35px_rgba(56,189,248,0.15)]'
              )}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-semibold text-slate-100">
                {locale === 'en' ? item.en : item.fr}
              </span>
            </button>
          ))}
        </div>

        <button
          disabled={!goal}
          onClick={() => {
            addXp(20);
            router.push('/carte');
          }}
          className={cn(
            'mt-10 rounded-2xl px-8 py-4 text-sm font-black tracking-widest transition',
            goal
              ? 'bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 text-white hover:scale-[1.02]'
              : 'cursor-not-allowed bg-white/10 text-slate-500'
          )}
        >
          {t.onboarding.continue}
        </button>
      </GlassCard>
    </section>
  );
}