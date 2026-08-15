'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { jobs, buildJobPrompt } from '@/data/jobs';
import { useUserProgress } from '@/stores/useUserProgress';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  validatePrompt,
  validateCity,
  validateDetail,
  containsDangerousCode,
} from '@/lib/security';
import type { PromptScoreResult } from '@/types';
import type { ProviderId } from '@/lib/ai/providers';

function ScoreBar({ label, value }: { label: string; value: number }) {
  const percent = Math.min(100, Math.max(0, (value / 20) * 100));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
        <span className="font-bold text-slate-900 dark:text-white">{value}/20</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
      title={label}
    >
      {copied ? (
        <>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {copiedLabel}
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      {message}
    </div>
  );
}

const categories = Array.from(new Set(jobs.map((job) => job.category)));

type Provider = {
  id: ProviderId;
  name: string;
  key: string;
};

export default function LabPage() {
  const { completedMissions, completeMission } = useUserProgress();
  const { t, locale } = useLocale();

  const [jobId, setJobId] = useState(jobs[0].id);
  const [taskId, setTaskId] = useState(jobs[0].tasks[0].id);
  const [city, setCity] = useState(locale === 'fr' ? 'Ouagadougou' : 'Ouagadougou');
  const [detail, setDetail] = useState('');

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<PromptScoreResult | null>(null);
  const [loading, setLoading] = useState(false);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<ProviderId>('groq');

  const [aiText, setAiText] = useState('');
  const [aiProvider, setAiProvider] = useState('');
  const [aiModel, setAiModel] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [formError, setFormError] = useState('');

  const selectedJob = jobs.find((job) => job.id === jobId) ?? jobs[0];
  const selectedTask =
    selectedJob.tasks.find((task) => task.id === taskId) ??
    selectedJob.tasks[0];

  const missionKey = `job-${selectedJob.id}-${selectedTask.id}`;
  const missionDone = completedMissions.includes(missionKey);

  useEffect(() => {
    fetch('/api/ai-chat')
      .then((res) => res.json())
      .then((data) => {
        setProviders(data.providers || []);
        if (data.providers && data.providers.length > 0) {
          setSelectedProvider(data.providers[0].id);
        }
      })
      .catch(console.error);
  }, []);

  function generate() {
    setFormError('');

    const cityValidation = validateCity(city);
    if (!cityValidation.valid) {
      setFormError(cityValidation.error || (locale === 'fr' ? 'Ville invalide' : 'Invalid city'));
      return;
    }

    const detailValidation = validateDetail(detail);
    if (!detailValidation.valid) {
      setFormError(detailValidation.error || (locale === 'fr' ? 'Activité invalide' : 'Invalid activity'));
      return;
    }

    setPrompt(
      buildJobPrompt(
        selectedJob,
        selectedTask,
        cityValidation.sanitized ?? '',
        detailValidation.sanitized ?? ''
      )
    );
    setResult(null);
    setAiText('');
    setAiError('');
  }

  async function analyzePrompt() {
    setFormError('');
    const validation = validatePrompt(prompt);
    if (!validation.valid) {
      setFormError(validation.error || (locale === 'fr' ? 'Prompt invalide' : 'Invalid prompt'));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/prompt-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: validation.sanitized }),
      });

      const data = await response.json();
      setResult(data);

      if (data.total >= 70) {
        completeMission(missionKey, 50);
      }
    } catch (error) {
      console.error(error);
      setFormError(locale === 'fr' ? "Erreur lors de l'analyse du prompt" : 'Error analyzing prompt');
    } finally {
      setLoading(false);
    }
  }

  async function fetchAiResponse() {
    setFormError('');
    const validation = validatePrompt(prompt);
    if (!validation.valid) {
      setFormError(validation.error || (locale === 'fr' ? 'Prompt invalide' : 'Invalid prompt'));
      return;
    }

    setAiLoading(true);
    setAiError('');
    setAiText('');

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: validation.sanitized,
          provider: selectedProvider,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAiError(data.error || (locale === 'fr' ? 'Erreur IA' : 'AI Error'));
      } else {
        if (containsDangerousCode(data.text)) {
          setAiError(
            locale === 'fr'
              ? 'La réponse IA contient du code potentiellement dangereux et a été bloquée.'
              : 'The AI response contains potentially dangerous code and has been blocked.'
          );
        } else {
          setAiText(data.text);
          setAiProvider(data.provider);
          setAiModel(data.model);
        }
      }
    } catch {
      setAiError(locale === 'fr' ? 'Erreur réseau. Réessaie.' : 'Network error. Try again.');
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-16">
      <GlassCard className="mb-8 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-300 dark:text-sky-300" style={{ color: '#0ea5e9' }}>
          {t.lab.badge}
        </p>

        <h1 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
          {t.lab.title}
        </h1>

        <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-400">
          {t.lab.description}
        </p>
      </GlassCard>

      <GlassCard className="mb-8 p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <label className="text-sm text-slate-700 dark:text-slate-400">{t.lab.myJob}</label>
            <select
              value={jobId}
              onChange={(event) => {
                setJobId(event.target.value);
                const job = jobs.find((item) => item.id === event.target.value);
                if (job) setTaskId(job.tasks[0].id);
              }}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:border-sky-400/60"
            >
              {categories.map((category) => (
                <optgroup key={category} label={category}>
                  {jobs
                    .filter((job) => job.category === category)
                    .map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.emoji} {job.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-700 dark:text-slate-400">{t.lab.myTask}</label>
            <select
              value={taskId}
              onChange={(event) => setTaskId(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:border-sky-400/60"
            >
              {selectedJob.tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-700 dark:text-slate-400">{t.lab.myCity}</label>
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder={t.lab.cityPlaceholder}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:border-sky-400/60"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700 dark:text-slate-400">
              {t.lab.myActivity}
            </label>
            <input
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
              placeholder={t.lab.activityPlaceholder}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:border-sky-400/60"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={generate}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-black text-white transition hover:scale-[1.02]"
            >
              {t.lab.generate}
            </button>
          </div>
        </div>

        <ErrorMessage message={formError} />

        <div className="mt-4 flex items-center gap-2 text-sm">
          <span
            className={
              missionDone
                ? 'rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-bold text-emerald-600 dark:text-emerald-300'
                : 'rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400'
            }
          >
            {missionDone ? t.lab.missionDone : t.lab.missionStatus}
          </span>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.lab.yourPrompt}</h2>
            {prompt && <CopyButton text={prompt} label={t.lab.copy} copiedLabel={t.lab.copied} />}
          </div>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={t.lab.promptPlaceholder}
            className="mt-4 h-80 w-full resize-none rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-black/30 dark:text-slate-100 dark:focus:border-sky-400/60"
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={analyzePrompt}
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 px-8 py-4 text-sm font-black tracking-widest text-white disabled:opacity-50"
            >
              {loading ? t.lab.analyzing : t.lab.analyze}
            </button>

            <button
              onClick={fetchAiResponse}
              disabled={aiLoading || !prompt.trim() || providers.length === 0}
              className="rounded-2xl border border-slate-300 bg-slate-100 px-8 py-4 text-sm font-black tracking-widest text-slate-800 transition hover:bg-slate-200 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              {aiLoading ? t.lab.generating : t.lab.aiResponse}
            </button>
          </div>

          {providers.length > 0 && (
            <div className="mt-4">
              <label className="text-sm text-slate-700 dark:text-slate-400">
                {t.lab.chooseModel}
              </label>
              <select
                value={selectedProvider}
                onChange={(event) =>
                  setSelectedProvider(event.target.value as ProviderId)
                }
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:focus:border-sky-400/60"
              >
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-500">
                {providers.length} {t.lab.providersAvailable.split('|')[providers.length > 1 ? 1 : 0].trim()}
              </p>
            </div>
          )}
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.lab.promptScore}</h2>

            {!result && (
              <p className="mt-4 text-sm text-slate-700 dark:text-slate-400">
                {t.lab.launchAnalysis}
              </p>
            )}

            {result && (
              <div className="mt-6 space-y-5">
                <ScoreBar label={t.lab.clarity} value={result.scores.clarity} />
                <ScoreBar label={t.lab.context} value={result.scores.context} />
                <ScoreBar
                  label={t.lab.constraints}
                  value={result.scores.constraints}
                />
                <ScoreBar label={t.lab.objective} value={result.scores.objective} />
                <ScoreBar label={t.lab.format} value={result.scores.format} />

                <div className="rounded-2xl border border-slate-300 bg-slate-100 p-4 dark:border-white/10 dark:bg-black/30">
                  <p className="text-sm text-slate-700 dark:text-slate-400">{t.lab.globalScore}</p>
                  <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                    {result.total}/100
                  </p>
                </div>

                {result.total >= 70 && (
                  <p className="rounded-xl bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-600 dark:text-emerald-300">
                    {t.lab.missionValidated}
                  </p>
                )}
              </div>
            )}
          </GlassCard>

          {result && (
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.lab.advice}</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {result.feedback.map((feedback, index) => (
                  <li key={index}>💡 {feedback}</li>
                ))}
              </ul>
            </GlassCard>
          )}

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.lab.aiResponseTitle}</h2>
              <div className="flex items-center gap-2">
                {aiText && <CopyButton text={aiText} label={t.lab.copy} copiedLabel={t.lab.copied} />}
                {aiProvider && (
                  <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold text-sky-600 dark:text-sky-300">
                    {aiProvider} · {aiModel}
                  </span>
                )}
              </div>
            </div>

            {aiError && (
              <div className="mt-4 rounded-xl bg-red-400/10 p-4 text-sm text-red-600 dark:text-red-300">
                {aiError}
              </div>
            )}

            {aiText && (
              <>
                <pre className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-slate-300 bg-slate-100 p-4 text-sm text-slate-800 dark:border-white/10 dark:bg-black/30 dark:text-slate-300">
                  {aiText}
                </pre>
                {aiProvider !== selectedProvider && (
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-500">
                    {t.lab.providerUnavailable
                      .replace('{provider}', selectedProvider)
                      .replace('{fallback}', aiProvider)}
                  </p>
                )}
              </>
            )}

            {!aiText && !aiError && (
              <p className="mt-4 text-sm text-slate-700 dark:text-slate-400">
                {providers.length > 0
                  ? t.lab.clickForResponse
                  : t.lab.noProvider}
              </p>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
