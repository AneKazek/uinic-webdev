import { create } from 'zustand';

export type Result = { kind: string; score?: number; seconds?: number };
export type ExerciseKey = 'guardian' | 'alchemist' | 'boss' | 'values' | 'compassion' | 'safe_guide' | 'focus' | 'breathe';

interface GameState {
  xp: number;
  coins: number;
  level: number;
  streakDays: number; // 0..7
  skipTokens: number; // auto 1/week
  completed: Record<ExerciseKey, number>; // count plays/completions
  lastResult: Result | null;
  badges: string[];
  reducedMotion: boolean;
  // actions
  pushResult: (r: Result) => void;
  addXP: (x: number) => void;
  addCoin: (c: number) => void;
  markCompleted: (key: ExerciseKey) => void;
  unlockBadge: (name: string) => void;
  toggleReducedMotion: (v?: boolean) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  xp: 0,
  coins: 0,
  level: 1,
  streakDays: 0,
  skipTokens: 1,
  completed: {
    guardian: 0,
    alchemist: 0,
    boss: 0,
    values: 0,
    compassion: 0,
    safe_guide: 0,
    focus: 0,
    breathe: 0,
  },
  lastResult: null,
  badges: [],
  reducedMotion: false,
  pushResult: (r) => {
    set({ lastResult: r });
    // basic XP logic: award per kind
    const awardMap: Record<string, number> = {
      alchemist: 20,
      boss: 30,
      breathe: 10,
      focus: 15,
    };
    const add = awardMap[r.kind] ?? 10;
    get().addXP(add);
    // mark completion
    const key = (r.kind as ExerciseKey);
    if (key) get().markCompleted(key);
    // gating: after 3 any completions → badge "Hello Mind L1"
    const total = Object.values(get().completed).reduce((a, b) => a + b, 0);
    if (total >= 3 && !get().badges.includes('Hello Mind L1')) {
      get().unlockBadge('Hello Mind L1');
    }
  },
  addXP: (x) => set((s) => {
    const xp = s.xp + x;
    const levelUp = Math.floor(xp / 100) + 1; // simple curve
    return { xp, level: Math.max(s.level, levelUp) };
  }),
  addCoin: (c) => set((s) => ({ coins: s.coins + c })),
  markCompleted: (key) => set((s) => ({ completed: { ...s.completed, [key]: (s.completed[key] ?? 0) + 1 } })),
  unlockBadge: (name) => set((s) => ({ badges: s.badges.includes(name) ? s.badges : [...s.badges, name] })),
  toggleReducedMotion: (v) => set((s) => ({ reducedMotion: v ?? !s.reducedMotion })),
}));