'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useUserProgress } from '@/stores/useUserProgress';
import { createClient } from '@/lib/supabase/client-browser';
import { cn } from '@/lib/utils';
import ReviewForm from '@/components/reviews/ReviewForm';

const FR = {
  menu: 'Navigation',
  learn: 'Apprentissage',
  build: 'Outils & Projets',
  challenge: 'Challenge Entrepreneur',
  logout: 'Deconnexion',
  days: 'j',
};

const EN = {
  menu: 'Navigation',
  learn: 'Learning',
  build: 'Tools & Projects',
  challenge: 'Entrepreneur Challenge',
  logout: 'Sign out',
  days: 'd',
};

export default function DashboardSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale, setLocale } = useLocale();
  const { xp, streak } = useUserProgress();

  const ui = locale === 'fr' ? FR : EN;

  const topItems = [
    { href: '/dashboard', label: t.nav.dashboard, icon: '🎮' },
    { href: '/challenge', label: ui.challenge, icon: '🔥' },
  ];

  const navSections = [
    {
      title: ui.menu,
      items: [
        { href: '/', label: t.nav.home, icon: '🏠' },
        { href: '/carte', label: t.nav.map, icon: '🗺️' },
      ],
    },
    {
      title: ui.learn,
      items: [
        { href: '/lab', label: t.nav.lab, icon: '🧪' },
        { href: '/library', label: t.nav.library, icon: '📚' },
      ],
    },
    {
      title: ui.build,
      items: [
        { href: '/tools', label: t.nav.tools, icon: '🧰' },
        { href: '/projects', label: t.nav.projects, icon: '🛠️' },
      ],
    },
  ];

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.localStorage.removeItem('ai-roadmap-progress');
    onClose();
    router.push('/auth');
  }

  function renderLink(item: { href: string; label: string; icon: string }) {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={cn(
          'flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-semibold transition',
          active
            ? 'border-sky-400/20 bg-gradient-to-r from-sky-500/20 to-violet-500/20 text-sky-300'
            : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
        )}
      >
        <span className="text-lg">{item.icon}</span>
        {item.label}
        {active && <span className="ml-auto h-2 w-2 rounded-full bg-sky-400" />}
      </Link>
    );
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#050508]/95 backdrop-blur-2xl transition-transform duration-300',
          'lg:sticky lg:top-20 lg:z-10 lg:h-[calc(100vh-6rem)] lg:translate-x-0 lg:rounded-3xl lg:border lg:bg-black/30',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo + langues */}
        <div className="flex items-center justify-between p-4 pb-3">
          <Link
            href="/"
            onClick={onClose}
            className="text-sm font-black tracking-[0.35em] text-sky-300"
          >
            AI ROADMAP
          </Link>
          <div className="flex gap-1">
          </div>
        </div>

        {/* Dashboard + Challenge */}
        <div className="space-y-1 px-4">{topItems.map(renderLink)}</div>

        {/* Sections */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {navSections.map((section) => (
            <div key={section.title} className="mt-4 first:mt-0">
              <p className="px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                {section.title}
              </p>
              <div className="mt-2 space-y-1">{section.items.map(renderLink)}</div>
            </div>
          ))}
        </nav>

        {/* Invitation a laisser un avis */}
        <div className="px-4 pb-3">
          <ReviewForm />
        </div>

        {/* XP + streak + deconnexion */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2">
            <span className="text-sm font-black text-white">⚡ {xp} XP</span>
            <span className="text-sm font-black text-orange-400">
              🔥 {streak} {ui.days}
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-2 w-full rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/20"
          >
            {ui.logout}
          </button>
        </div>
      </aside>
    </>
  );
}