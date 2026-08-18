'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import WorldCard from '@/components/roadmap/WorldCard';
import { worlds } from '@/data/worlds';
import { useUserProgress } from '@/stores/useUserProgress';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { World } from '@/types';

export default function CartePage() {
  const { unlockedWorlds } = useUserProgress();
  const { t } = useLocale();

  const isUnlocked = (world: World) => {
    return unlockedWorlds.includes(world.slug) || world.prerequisites.length === 0;
  };

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-16">
      <GlassCard className="mb-10 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600 dark:text-sky-300">
          {t.carte.badge}
        </p>

        <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
          {t.carte.title}
        </h1>

        <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-400">
          {t.carte.description}
        </p>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {worlds.map((world) => (
          <WorldCard
            key={world.id}
            world={world}
            unlocked={isUnlocked(world)}
          />
        ))}
      </div>
    </section>
  );
}
