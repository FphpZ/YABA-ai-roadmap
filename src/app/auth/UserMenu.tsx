'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client-browser';
import type { User } from '@supabase/supabase-js';
import SignOutButton from './SignOutButton';

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
  }, []);

  if (loading) {
    return (
      <div className="h-8 w-20 animate-pulse rounded-xl bg-white/10" />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-xs font-bold text-white">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="hidden text-sm text-slate-300 md:block">
          {user.email}
        </span>
      </div>
      <SignOutButton />
    </div>
  );
}