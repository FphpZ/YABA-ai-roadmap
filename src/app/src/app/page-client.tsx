'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client-browser';

export function OAuthHandler() {
  const router = useRouter();

  useEffect(() => {
    async function handleOAuthCallback() {
      // Vérifier si on a un code dans l'URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        const supabase = createClient();
        
        // Échanger le code contre une session
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
          // Nettoyer l'URL
          window.history.replaceState({}, '', window.location.pathname);
          // Rediriger vers le dashboard
          router.push('/dashboard');
          router.refresh();
        }
      }
    }

    handleOAuthCallback();
  }, [router]);

  return null;
}