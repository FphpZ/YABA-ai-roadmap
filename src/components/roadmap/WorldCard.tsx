import Link from 'next/link';
import type { World } from '@/types';
import { cn } from '@/lib/utils';

export default function WorldCard({
  world,
  unlocked,
}: {
  world: World;
  unlocked: boolean;
}) {
  return (
    <Link
      href={`/mondes/${world.slug}`}
      className={cn(
        'glass block rounded-3xl p-6 transition hover:scale-[1.02] hover:bg-white/10',
        !unlocked && 'opacity-60 saturate-50'
      )}
      style={{
        boxShadow: unlocked ? `0 0 45px ${world.color}22` : undefined,
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-3xl">{world.emoji}</span>

        <span
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-bold',
            unlocked
              ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
              : 'border-white/10 bg-white/5 text-slate-400'
          )}
        >
          {unlocked ? 'Débloqué' : 'Verrouillé'}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-white">{world.title}</h3>

      <p className="mt-2 text-sm text-slate-400">{world.tagline}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {world.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </Link>
  );
}