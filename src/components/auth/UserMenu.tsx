'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client-browser';
import type { User } from '@supabase/supabase-js';

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    }

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
      window.localStorage.removeItem('ai-roadmap-progress');
      router.push('/auth');
      router.refresh();
    } catch (err) {
      console.error('Erreur déconnexion:', err);
    } finally {
      setSigningOut(false);
    }
  }

  // Pendant le chargement initial
  if (loading) {
    return <div className="h-8 w-24 animate-pulse rounded-xl bg-white/10" />;
  }

  // ✅ NON CONNECTÉ : Afficher "Connexion"
  if (!user) {
    return (
      <Link
        href="/auth"
        className="rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-2 text-sm font-bold text-white transition hover:scale-105"
      >
        Connexion
      </Link>
    );
  }

  // ✅ CONNECTÉ : Afficher avatar + email + Déconnexion
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-xs font-bold text-white">
          {user.email?.[0].toUpperCase()}
        </div> 
        <span className="hidden max-w-[140px] truncate text-sm text-slate-200 md:block">
          {user.email}
        </span>
      </Link>

      <button
        onClick={handleSignOut}
        disabled={signingOut}
        className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/20 disabled:opacity-50"
      >
        {signingOut ? '...' : 'Déconnexion'}
      </button>
    </div>
  );
}