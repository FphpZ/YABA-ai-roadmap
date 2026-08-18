import { createClient } from '@/lib/supabase/client-browser';

export type SavedProgress = {
  xp: number;
  goal: string | null;
  completedMissions: string[];
  unlockedWorlds: string[];
  streak: number;
};

export async function loadProgress(): Promise<SavedProgress | null> {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('xp, goal, completed_missions, unlocked_worlds, streak, last_visit')
    .eq('id', session.user.id)
    .single();

  if (error || !data) return null;

  // Logique du streak : jours consecutifs
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let streak = data.streak ?? 0;
  const lastVisit = data.last_visit ?? null;

  if (lastVisit !== today) {
    streak = lastVisit === yesterday ? streak + 1 : 1;
    await supabase
      .from('profiles')
      .update({ streak, last_visit: today })
      .eq('id', session.user.id);
  }

  return {
    xp: data.xp ?? 0,
    goal: data.goal ?? null,
    completedMissions: data.completed_missions ?? [],
    unlockedWorlds:
      data.unlocked_worlds && data.unlocked_worlds.length > 0
        ? data.unlocked_worlds
        : ['foundations'],
    streak,
  };
}

export async function saveProgress(progress: SavedProgress): Promise<void> {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase
    .from('profiles')
    .update({
      xp: progress.xp,
      goal: progress.goal,
      completed_missions: progress.completedMissions,
      unlocked_worlds: progress.unlockedWorlds,
      streak: progress.streak,
    })
    .eq('id', session.user.id);
}