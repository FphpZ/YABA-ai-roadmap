'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import UserMenu from '@/components/auth/UserMenu';
import { useUser } from '@/lib/hooks/useUser';
import { lessons } from '@/data/lessons';
import { jobs } from '@/data/jobs';
import { projects } from '@/data/projects';
import { worlds } from '@/data/worlds';

const FR = {
  search: 'Rechercher : page, lecon, metier, projet...',
  noResult: 'Aucun resultat pour',
  challenge: 'Challenge',
  pages: 'Page',
  lessons: 'Lecon',
  jobs: 'Metier',
  projects: 'Projet',
  worlds: 'Monde',
};

const EN = {
  search: 'Search: page, lesson, job, project...',
  noResult: 'No result for',
  challenge: 'Challenge',
  pages: 'Page',
  lessons: 'Lesson',
  jobs: 'Job',
  projects: 'Project',
  worlds: 'World',
};

type SearchItem = { label: string; type: string; href: string };

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ui = locale === 'fr' ? FR : EN;

  const searchItems: SearchItem[] = [
    { label: t.nav.dashboard, type: ui.pages, href: '/dashboard' },
    { label: ui.challenge, type: ui.pages, href: '/challenge' },
    { label: t.nav.home, type: ui.pages, href: '/' },
    { label: t.nav.map, type: ui.pages, href: '/carte' },
    { label: t.nav.lab, type: ui.pages, href: '/lab' },
    { label: t.nav.tools, type: ui.pages, href: '/tools' },
    { label: t.nav.library, type: ui.pages, href: '/library' },
    { label: t.nav.projects, type: ui.pages, href: '/projects' },
    ...worlds.map((world) => ({
      label: world.title,
      type: ui.worlds,
      href: `/mondes/${world.slug}`,
    })),
    ...lessons.map((lesson) => ({
      label: lesson.title,
      type: ui.lessons,
      href: `/mondes/${lesson.worldSlug}`,
    })),
    ...jobs.map((job) => ({
      label: job.name,
      type: ui.jobs,
      href: '/lab',
    })),
    ...projects.map((project) => ({
      label: project.title,
      type: ui.projects,
      href: `/projects/${project.slug}`,
    })),
  ];

  const q = query.trim().toLowerCase();
  const results = q
    ? searchItems.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 8)
    : [];

  function go(href: string) {
    setQuery('');
    router.push(href);
    setMobileMenuOpen(false);
  }

  const showNavigation = pathname !== '/dashboard' && pathname !== '/challenge';

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-black/35">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4">

          {/* Logo / Titre */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-lg font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent sm:text-xl">
              AI ROADMAP
            </h1>
          </Link>

          {/* Navigation desktop - cachée sur mobile */}
          {showNavigation && (
            <nav className="hidden items-center gap-1 lg:flex">
              <Link
                href="/"
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  pathname === '/'
                    ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                )}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/carte"
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  pathname === '/carte'
                    ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                )}
              >
                {t.nav.map}
              </Link>
              <Link
                href="/lab"
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  pathname === '/lab'
                    ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                )}
              >
                {t.nav.lab}
              </Link>
              <Link
                href="/library"
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  pathname === '/library'
                    ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                )}
              >
                {t.nav.library}
              </Link>
              <Link
                href="/tools"
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  pathname === '/tools'
                    ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                )}
              >
                {t.nav.tools}
              </Link>
              <Link
                href="/projects"
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  pathname === '/projects'
                    ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                )}
              >
                {t.nav.projects}
              </Link>
            </nav>
          )}

          {/* Boutons dashboard/challenge - cachés sur mobile */}
          <div className="hidden items-center gap-2 sm:flex">
            {pathname === '/challenge' && (
              <Link
                href="/dashboard"
                className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-sm font-bold text-sky-600 transition hover:bg-sky-400/20 dark:text-sky-300"
              >
                🎮 Dashboard
              </Link>
            )}

            {pathname === '/dashboard' && (
              <Link
                href="/challenge"
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-sm font-bold text-amber-600 transition hover:bg-amber-400/20 dark:text-amber-300"
              >
                🔥 Challenge
              </Link>
            )}

            {user && pathname !== '/dashboard' && pathname !== '/challenge' && pathname !== '/auth' && !pathname?.startsWith('/auth') && (
              <Link
                href="/dashboard"
                className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-sm font-bold text-sky-600 transition hover:bg-sky-400/20 dark:text-sky-300"
              >
                🎮 Dashboard
              </Link>
            )}
          </div>

          {/* Actions desktop */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLocale('fr')}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs font-bold transition',
                  locale === 'fr'
                    ? 'border-sky-400 bg-sky-400/10 text-sky-600 dark:text-sky-300'
                    : 'border-slate-300 text-slate-600 hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLocale('en')}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs font-bold transition',
                  locale === 'en'
                    ? 'border-violet-400 bg-violet-400/10 text-violet-600 dark:text-violet-300'
                    : 'border-slate-300 text-slate-600 hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                EN
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
              title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <UserMenu />
          </div>

          {/* Menu hamburger mobile */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-slate-300 p-2 text-slate-600 dark:border-white/10 dark:text-slate-400"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white dark:bg-[#050508] sm:hidden">
          <div className="h-full overflow-y-auto p-4">
            {/* Navigation mobile */}
            {showNavigation && (
              <nav className="mb-6 space-y-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition',
                    pathname === '/'
                      ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                  )}
                >
                  {t.nav.home}
                </Link>
                <Link
                  href="/carte"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition',
                    pathname === '/carte'
                      ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                  )}
                >
                  {t.nav.map}
                </Link>
                <Link
                  href="/lab"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition',
                    pathname === '/lab'
                      ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                  )}
                >
                  {t.nav.lab}
                </Link>
                <Link
                  href="/library"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition',
                    pathname === '/library'
                      ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                  )}
                >
                  {t.nav.library}
                </Link>
                <Link
                  href="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition',
                    pathname === '/tools'
                      ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                  )}
                >
                  {t.nav.tools}
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition',
                    pathname === '/projects'
                      ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                  )}
                >
                  {t.nav.projects}
                </Link>
              </nav>
            )}

            {/* Boutons dashboard/challenge mobile */}
            <div className="mb-6 space-y-2">
              {pathname === '/challenge' && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-center font-bold text-sky-600 dark:text-sky-300"
                >
                  🎮 Dashboard
                </Link>
              )}

              {pathname === '/dashboard' && (
                <Link
                  href="/challenge"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center font-bold text-amber-600 dark:text-amber-300"
                >
                  🔥 Challenge
                </Link>
              )}

              {user && pathname !== '/dashboard' && pathname !== '/challenge' && pathname !== '/auth' && !pathname?.startsWith('/auth') && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-center font-bold text-sky-600 dark:text-sky-300"
                >
                  🎮 Dashboard
                </Link>
              )}
            </div>

            {/* Langues mobile */}
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setLocale('fr')}
                className={cn(
                  'flex-1 rounded-full border px-4 py-2 text-sm font-bold transition',
                  locale === 'fr'
                    ? 'border-sky-400 bg-sky-400/10 text-sky-600 dark:text-sky-300'
                    : 'border-slate-300 text-slate-600 dark:border-white/10 dark:text-slate-400'
                )}
              >
                FR
              </button>
              <button
                onClick={() => setLocale('en')}
                className={cn(
                  'flex-1 rounded-full border px-4 py-2 text-sm font-bold transition',
                  locale === 'en'
                    ? 'border-violet-400 bg-violet-400/10 text-violet-600 dark:text-violet-300'
                    : 'border-slate-300 text-slate-600 dark:border-white/10 dark:text-slate-400'
                )}
              >
                EN
              </button>
            </div>

            {/* User menu mobile */}
            <UserMenu />
          </div>
        </div>
      )}
    </>
  );
}
