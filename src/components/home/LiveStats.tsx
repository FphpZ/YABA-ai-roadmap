'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client-browser';
import { useLocale } from '@/components/providers/LocaleProvider';

type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
};

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    function step(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function StatCard({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: number;
}) {
  const animated = useCountUp(value);

  return (
    <div className="glass rounded-3xl p-6 text-center">
      <div className="text-3xl">{emoji}</div>
      <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
        {animated}
      </p>
      <p className="mt-1 text-xs font-black uppercase tracking-widest text-slate-800 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-300">
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function LiveStats() {
  const { t } = useLocale();
  const supabase = createClient();

  const [stats, setStats] = useState({
    visits: 0,
    members: 0,
    lessons: 0,
    reviews: 0,
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [connected, setConnected] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setConnected(true);

      const { data }: {
        data:
          | {
              visits?: number | null;
              members?: number | null;
              lessons_done?: number | null;
              reviews?: number | null;
            }
          | null;
      } = await supabase.rpc('get_site_stats').single();

      let visits = Number(data?.visits ?? 0);

      // Compte 1 visite par session de navigateur
      if (!sessionStorage.getItem('ai-roadmap-visit-counted')) {
        sessionStorage.setItem('ai-roadmap-visit-counted', '1');
        await supabase
          .from('site_stats')
          .update({ visits: visits + 1 })
          .eq('id', 1);
        visits += 1;
      }

      setStats({
        visits,
        members: Number(data?.members ?? 0),
        lessons: Number(data?.lessons_done ?? 0),
        reviews: Number(data?.reviews ?? 0),
      });

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('id, author, rating, comment')
        .order('created_at', { ascending: false })
        .limit(3);

      if (reviewsData) setReviews(reviewsData);
    }

    load();
  }, []);

  async function submitReview() {
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
        setStats((s) => ({ ...s, reviews: s.reviews + 1 }));

        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('id, author, rating, comment')
          .order('created_at', { ascending: false })
          .limit(3);

        if (reviewsData) setReviews(reviewsData);
      }
    }

    setSending(false);
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20">
      <div className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-sky-600 dark:text-sky-300">
          {t.liveStats.title}
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
          {t.liveStats.subtitle}
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard emoji="👀" label={t.liveStats.visits} value={stats.visits} />
        <StatCard emoji="🚀" label={t.liveStats.explorers} value={stats.members} />
        <StatCard emoji="📚" label={t.liveStats.missionsCompleted} value={stats.lessons} />
        <StatCard emoji="⭐" label={t.liveStats.reviews} value={stats.reviews} />
      </div>

      {/* Carousel d'avis défilant */}
      {reviews.length > 0 ? (
        <div className="relative mt-8 overflow-hidden">
          <div className="flex animate-scroll gap-4">
            {/* Dupliquer les avis pour un défilement infini */}
            {[...reviews, ...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="glass min-w-[320px] flex-shrink-0 rounded-3xl p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-black text-slate-900 dark:text-white">{review.author}</p>
                  <Stars rating={review.rating} />
                </div>
                <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-center text-sm font-bold text-slate-800 dark:text-slate-400">
            {t.liveStats.beFirst}
          </p>
        </div>
      )}

      <div className="glass mt-6 rounded-3xl p-6">
        {connected ? (
          sent ? (
            <p className="text-center text-sm font-black text-emerald-700 dark:text-emerald-300">
              {t.liveStats.thankYou}
            </p>
          ) : (
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">{t.liveStats.leaveReview}</p>

              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={
                      star <= rating
                        ? 'text-2xl text-amber-600 dark:text-amber-300'
                        : 'text-2xl text-slate-400 dark:text-slate-600'
                    }
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder={t.liveStats.whatDoYouThink}
                className="mt-3 h-20 w-full resize-none rounded-2xl border-2 border-slate-400 bg-white p-3 text-sm font-bold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-600 focus:border-sky-600 dark:border-white/10 dark:bg-black/30 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-400/60"
              />

              <button
                onClick={submitReview}
                disabled={sending || !comment.trim()}
                className="mt-3 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-black text-white disabled:opacity-50"
              >
                {sending ? t.liveStats.sending : t.liveStats.publishReview}
              </button>
            </div>
          )
        ) : (
          <p className="text-center text-sm font-bold text-slate-800 dark:text-slate-400">
            <Link href="/auth" className="font-black text-sky-700 underline dark:text-sky-300">
              {t.liveStats.connectYou}
            </Link>{' '}
            {t.liveStats.loginToReview}
          </p>
        )}
      </div>
    </div>
  );
}