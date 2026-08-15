'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client-browser';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    async function processCallback() {
      const supabase = createClient();

      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.replace('/dashboard');
        return;
      }

      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');

      if (accessToken) {
        router.replace('/dashboard');
        return;
      }

      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (!exchangeError) {
          router.replace('/dashboard');
          return;
        }
      }

      setError('La connexion a echoue. Reessaie.');
    }

    processCallback();
  }, [router]);

  if (error) {
    return (
      <section className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">
        <div className="glass rounded-3xl p-8 text-center">
          <h1 className="text-xl font-bold text-red-400">Erreur de connexion</h1>
          <p className="mt-4 text-slate-400">{error}</p>
          <button
            onClick={() => router.push('/auth')}
            className="mt-6 rounded-xl bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
          >
            Retour
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-sky-400" />
        <p className="mt-6 text-slate-400">Connexion en cours...</p>
      </div>
    </section>
  );
}