import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveProgress, type SavedProgress } from '@/lib/supabase/progress';

type UserProgressState = SavedProgress & {
  addXp: (amount: number) => void;
  setGoal: (goal: string) => void;
  completeMission: (missionId: string, xpReward?: number) => void;
  unlockWorld: (worldSlug: string) => void;
  hydrate: (progress: SavedProgress) => void;
  reset: () => void;
};

const initialState: SavedProgress = {
  xp: 0,
  goal: null,
  completedMissions: [],
  unlockedWorlds: ['foundations'],
  streak: 0,
};

function sync() {
  const { xp, goal, completedMissions, unlockedWorlds, streak } =
    useUserProgress.getState();

  saveProgress({ xp, goal, completedMissions, unlockedWorlds, streak }).catch(
    () => {}
  );
}

export const useUserProgress = create<UserProgressState>()(
  persist(
    (set) => ({
      ...initialState,

      addXp: (amount) => {
        set((state) => ({ xp: state.xp + amount }));
        sync();
      },

      setGoal: (goal) => {
        set({ goal });
        sync();
      },

      completeMission: (missionId, xpReward = 100) => {
        set((state) => {
          if (state.completedMissions.includes(missionId)) return {};
          return {
            completedMissions: [...state.completedMissions, missionId],
            xp: state.xp + xpReward,
          };
        });
        sync();
      },

      unlockWorld: (worldSlug) => {
        set((state) => {
          if (state.unlockedWorlds.includes(worldSlug)) return {};
          return { unlockedWorlds: [...state.unlockedWorlds, worldSlug] };
        });
        sync();
      },

      hydrate: (progress) => set({ ...progress }),

      reset: () => set({ ...initialState }),
    }),
    { name: 'ai-roadmap-progress' }
  )
);