'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { tools } from '@/data/tools';
import { useLocale } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';

export default function ToolsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const { t } = useLocale();

  const categories = [
    { id: 'all', label: t.tools.all },
    { id: 'chat', label: t.tools.chat },
    { id: 'image', label: t.tools.image },
    { id: 'video', label: t.tools.video },
    { id: 'audio', label: t.tools.audio },
    { id: 'code', label: t.tools.code },
    { id: 'research', label: t.tools.research },
    { id: 'automation', label: t.tools.automation },
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = category === 'all' || tool.category === category;

    const matchesQuery = tool.name
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-16">
      <GlassCard className="mb-8 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600 dark:text-sky-300">
          {t.tools.badge}
        </p>

        <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
          {t.tools.title}
        </h1>

        <p className="mt-3 text-slate-700 dark:text-slate-400">
          {t.tools.description}
        </p>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.tools.search}
          className="mt-6 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-black/30 dark:text-slate-100 dark:focus:border-sky-400/60"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => setCategory(item.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition',
                category === item.id
                  ? 'border-sky-400/60 bg-sky-400/10 text-sky-600 dark:text-sky-300'
                  : 'border-slate-300 bg-slate-100 text-slate-700 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <GlassCard key={tool.id} className="p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{tool.name}</h2>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-white/5 dark:text-slate-300">
                {tool.level}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-700 dark:text-slate-400">{tool.description}</p>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-500">
                {t.tools.alternatives}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {tool.alternatives.map((alternative) => (
                  <span
                    key={alternative}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-white/5 dark:text-slate-300"
                  >
                    {alternative}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-300 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
            >
              {t.tools.openTool}
            </a>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
