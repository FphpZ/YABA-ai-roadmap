'use client';

import { useLocale } from '@/components/providers/LocaleProvider';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white/50 py-10 backdrop-blur-2xl dark:border-white/10 dark:bg-black/25">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 dark:text-slate-500">
        <p className="mb-2 font-semibold tracking-[0.3em] text-slate-800 dark:text-slate-300">
          AI ROADMAP
        </p>
        <p>
          {t.footer.slogan}
        </p>
        <p className="mt-3">
          © {new Date().getFullYear()} AI ROADMAP. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}