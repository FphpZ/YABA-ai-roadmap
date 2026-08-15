'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client-browser';

export default function AuthCodeHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const supabase = createClient();

    async function process() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const hasToken = url.hash.includes('access_token');

      // Rien a traiter
      if (!code && !hasToken) return;

      // Nettoyer l'URL immediatement (enleve ?code= de la barre d'adresse)
      window.history.replaceState({}, '', pathname);

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        // Si le code a deja ete consomme par le client auto, on verifie la session
        if (error) {
          const { data } = await supabase.auth.getSession();
          if (!data.session) {
            router.push('/auth');
            return;
          }
        }
      }

      // Connecte : direction le dashboard
      router.push('/dashboard');
      router.refresh();
    }

    process();
  }, [router, pathname]);

  return null;
}