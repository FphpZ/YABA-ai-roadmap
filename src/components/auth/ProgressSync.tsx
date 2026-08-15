'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client-browser';
import { loadProgress } from '@/lib/supabase/progress';
import { useUserProgress } from '@/stores/useUserProgress';

export default function ProgressSync() {
  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const saved = await loadProgress();
      if (saved) {
        useUserProgress.getState().hydrate(saved);
      }
    }

    // Au chargement de la page
    load();

    // A chaque changement de connexion
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          setTimeout(load, 500);
        }
        if (event === 'SIGNED_OUT') {
          useUserProgress.getState().reset();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return null;
}