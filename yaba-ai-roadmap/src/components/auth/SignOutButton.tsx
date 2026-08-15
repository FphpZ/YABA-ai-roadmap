'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    if (!supabase) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Erreur de déconnexion:', error.message);
      } else {
        window.localStorage.removeItem('ai-roadmap-progress');
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/20 disabled:opacity-50"
    >
      {loading ? 'Déconnexion...' : 'Déconnexion'}
    </button>
  );
}