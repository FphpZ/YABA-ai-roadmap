'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client-browser';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';

const COUNTRIES = [
  'Burkina Faso',
  'Sénégal',
  'Côte d\'Ivoire',
  'Mali',
  'Niger',
  'Bénin',
  'Togo',
  'Guinée',
  'Cameroun',
  'Congo',
  'République Démocratique du Congo',
  'Gabon',
  'Madagascar',
  'Mauritanie',
  'Tchad',
  'Rwanda',
  'Burundi',
  'Djibouti',
  'Algérie',
  'Maroc',
  'Tunisie',
  'Égypte',
  'France',
  'Canada',
  'Belgique',
  'Suisse',
  'Autre',
];

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const supabase = createClient();
  const { t } = useLocale();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  const [isSignUp, setIsSignUp] = useState(false);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push(redirectTo);
    }
  }

  useEffect(() => {
    checkUser();
  }, [redirectTo, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        // Vérifier que le pays est sélectionné
        if (!country) {
          setMessageType('error');
          setMessage(t.auth.countryPlaceholder);
          setLoading(false);
          return;
        }

        // Créer le compte avec les métadonnées
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              country: country,
            },
          },
        });

        if (error) {
          setMessageType('error');
          setMessage(error.message);
        } else {
          setMessageType('success');
          setMessage(t.auth.accountCreated);
          setIsSignUp(false);
          setEmail('');
          setPassword('');
          setCountry('');
        }
      } else {
        // Connexion
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setMessageType('error');
          setMessage(error.message);
        } else {
          setMessageType('success');
          setMessage(t.auth.signedIn);
          setTimeout(() => router.push(redirectTo), 800);
        }
      }
    } catch (err: unknown) {
      setMessageType('error');
      setMessage(t.auth.error);
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: 'github' | 'google') {
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/auth/callback',
        },
      });

      if (error) {
        setMessageType('error');
        setMessage(error.message);
        setLoading(false);
      }
    } catch (err: unknown) {
      setMessageType('error');
      setMessage(t.auth.error);
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">
        {isSignUp ? t.auth.signUp : t.auth.signIn}
      </h1>

      <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-400">
        {isSignUp ? t.auth.signUpSubtitle : t.auth.signInSubtitle}
      </p>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => handleOAuth('github')}
          disabled={loading}
          className="glass flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50 dark:text-white dark:hover:bg-white/10"
        >
          <svg
            className="h-5 w-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <span>Continuer avec GitHub</span>
        </button>

        <button
          onClick={() => handleOAuth('google')}
          disabled={loading}
          className="glass flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50 dark:text-white dark:hover:bg-white/10"
        >
          <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>Continuer avec Google</span>
        </button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300 dark:border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 font-semibold text-slate-600 dark:bg-transparent dark:text-slate-500">ou</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-700 dark:text-slate-400">
            {t.auth.email}
          </label>
          <input
            type="email"
            placeholder={t.auth.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border-2 border-slate-400 bg-white px-4 py-3 font-semibold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-500 focus:border-sky-600 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400/60"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-slate-700 dark:text-slate-400">
            {t.auth.password}
          </label>
          <input
            type="password"
            placeholder={t.auth.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 w-full rounded-xl border-2 border-slate-400 bg-white px-4 py-3 font-semibold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-500 focus:border-sky-600 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400/60"
          />
        </div>

        {isSignUp && (
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-400">
              {t.auth.country}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border-2 border-slate-400 bg-white px-4 py-3 font-semibold text-slate-900 outline-none focus:border-sky-600 dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:border-sky-400/60"
            >
              <option value="">{t.auth.countryPlaceholder}</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 font-bold text-white disabled:opacity-50"
        >
          {loading
            ? t.auth.loading
            : isSignUp
              ? t.auth.createAccount
              : t.auth.signInButton}
        </button>
      </form>

      {message && (
        <div
          className={cn(
            'mt-4 rounded-xl px-4 py-3 text-sm font-bold',
            messageType === 'success'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300'
              : 'bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-300'
          )}
        >
          {message}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setMessage('');
            setCountry('');
          }}
          className="text-sm font-bold text-sky-700 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300"
        >
          {isSignUp ? t.auth.hasAccount : t.auth.noAccount}
        </button>
      </div>
    </GlassCard>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <section className="mx-auto min-h-screen max-w-md px-4 py-16">
      <button
        onClick={() => router.push('/')}
        className="mb-6 flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>{t.auth.backHome}</span>
      </button>
      
      <Suspense
        fallback={
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-sky-400" />
          </div>
        }
      >
        <AuthForm />
      </Suspense>
    </section>
  );
}
