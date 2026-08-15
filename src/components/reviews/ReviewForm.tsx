'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client-browser';
import { useLocale } from '@/components/providers/LocaleProvider';

const FR = {
  title: '⭐ Ton avis compte',
  placeholder: 'Qu\'est-ce que tu penses de AI ROADMAP ?',
  publish: 'Publier mon avis',
  sending: 'Envoi...',
  sent: '✅ Merci pour ton avis !',
  notConnected: 'Connecte-toi pour laisser un avis.',
};

const EN = {
  title: '⭐ Your feedback matters',
  placeholder: 'What do you think of AI ROADMAP?',
  publish: 'Publish my review',
  sending: 'Sending...',
  sent: '✅ Thanks for your feedback!',
  notConnected: 'Sign in to leave a review.',
};

export default function ReviewForm() {
  const { locale } = useLocale();
  const ui = locale === 'fr' ? FR : EN;
  const supabase = createClient();

  const [connected, setConnected] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      setConnected(!!session);
    }
    check();
  }, []);

  async function submit() {
    if (!comment.trim()) return;
    setSending(true);

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const author = session.user.email?.split('@')[0] ?? 'Explorateur';

      const { error } = await supabase.from('reviews').insert({
        author,
        rating,
        comment: comment.trim(),
      });

      if (!error) {
        setSent(true);
        setComment('');
      }
    }

    setSending(false);
  }

  if (!connected) {
    return <p className="text-xs text-slate-500">{ui.notConnected}</p>;
  }

  if (sent) {
    return <p className="text-sm font-bold text-emerald-300">{ui.sent}</p>;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-bold text-white">{ui.title}</p>

      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={
              star <= rating ? 'text-xl text-amber-300' : 'text-xl text-slate-600'
            }
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={ui.placeholder}
        className="mt-2 h-16 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-2 text-xs text-slate-100 outline-none focus:border-sky-400/60"
      />

      <button
        onClick={submit}
        disabled={sending || !comment.trim()}
        className="mt-2 w-full rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-xs font-black text-white disabled:opacity-50"
      >
        {sending ? ui.sending : ui.publish}
      </button>
    </div>
  );
}