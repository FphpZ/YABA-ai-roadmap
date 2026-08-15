import { cn } from '@/lib/utils';

export default function XPBar({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn(
        'h-3 w-full overflow-hidden rounded-full bg-white/10',
        className
      )}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-700"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}