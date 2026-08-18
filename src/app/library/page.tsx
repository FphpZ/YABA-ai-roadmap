'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { libraryResources } from '@/data/library';
import { useLocale } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
  const [type, setType] = useState('all');
  const { t } = useLocale();

  const types = [
    { id: 'all', label: t.library.all },
    { id: 'article', label: t.library.articles },
    { id: 'video', label: t.library.videos },
    { id: 'exercise', label: t.library.exercises },
    { id: 'pdf', label: t.library.pdfs },
    { id: 'docs', label: t.library.docs },
    { id: 'tool', label: t.library.toolsFilter },
    { id: 'course', label: t.library.courses },
    { id: 'news', label: t.library.news },
  ];

  const filteredResources = libraryResources.filter((resource) => {
    return type === 'all' || resource.type === type;
  });

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-16">
      <GlassCard className="mb-8 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600 dark:text-sky-300">
          {t.library.badge}
        </p>

        <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
          {t.library.title}
        </h1>

        <p className="mt-3 text-slate-700 dark:text-slate-400">
          {t.library.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {types.map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition',
                type === item.id
                  ? 'border-violet-400/60 bg-violet-400/10 text-violet-600 dark:text-violet-300'
                  : 'border-slate-300 bg-slate-100 text-slate-700 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredResources.map((resource) => (
          <GlassCard key={resource.id} className="p-6">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-700 dark:bg-white/5 dark:text-slate-400">
              {resource.type}
            </span>

            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              {resource.title}
            </h2>

            <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-400">
              {resource.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
              >
                {t.library.openResource}
              </a>
            )}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
