"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export const LEVELS = [
  { min: 0, name: "Nervous Newbie" },
  { min: 100, name: "Warming Up" },
  { min: 250, name: "Small Talk Pro" },
  { min: 450, name: "Hot Seat Ready" },
  { min: 700, name: "Interview Ready" },
  { min: 1000, name: "Opportunity Magnet" },
];

export type Toast = { id: number; xp: number; message: string; achievement?: string };

type XpState = {
  xp: number;
  level: (typeof LEVELS)[number];
  nextLevel: (typeof LEVELS)[number] | null;
  progress: number;
  achievements: string[];
  unlockedToday: string[];
  addXp: (amount: number, message: string) => void;
  unlock: (id: string, label: string, bonusXp: number) => void;
  hasAchievement: (id: string) => boolean;
};

const XpContext = createContext<XpState | null>(null);

const STORAGE_KEY = "verviq-xp-v1";
// Pre-rebrand keys — read once for migration, then removed.
const LEGACY_STORAGE_KEYS = ["hirevibe-xp-v1", "hirelab-xp-v1"];

export function levelFor(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.min) current = l;
  const next = LEVELS.find((l) => l.min > xp) ?? null;
  const span = next ? next.min - current.min : 1;
  const progress = next ? Math.min((xp - current.min) / span, 1) : 1;
  return { current, next, progress };
}

export function XpProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      // One-time migration from pre-rebrand keys so existing XP survives.
      // Also heals a zeroed new key (written by an intermediate no-migration build).
      const isEmpty = (s: string | null) => {
        if (!s) return true;
        try {
          const data = JSON.parse(s);
          return !data.xp && !data.achievements?.length;
        } catch {
          return true;
        }
      };
      if (isEmpty(raw)) {
        for (const key of LEGACY_STORAGE_KEYS) {
          const legacy = localStorage.getItem(key);
          if (legacy && !isEmpty(legacy)) {
            raw = legacy;
            localStorage.setItem(STORAGE_KEY, legacy);
            localStorage.removeItem(key);
            break;
          }
        }
      }
      if (raw) {
        const data = JSON.parse(raw);
        setXp(data.xp ?? 0);
        setAchievements(data.achievements ?? []);
      }
    } catch {
      /* fresh start */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp, achievements }));
    } catch {
      /* storage unavailable */
    }
  }, [xp, achievements, hydrated]);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { ...t, id }].slice(-4));
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);

  const addXp = useCallback(
    (amount: number, message: string) => {
      setXp((prev) => {
        const before = levelFor(prev).current;
        const after = levelFor(prev + amount).current;
        if (after.name !== before.name) {
          setTimeout(() => pushToast({ xp: 0, message: `Level up — ${after.name}! 🎉` }), 500);
        }
        return prev + amount;
      });
      pushToast({ xp: amount, message });
    },
    [pushToast]
  );

  const unlock = useCallback(
    (id: string, label: string, bonusXp: number) => {
      setAchievements((prev) => {
        if (prev.includes(id)) return prev;
        setTimeout(() => {
          pushToast({ xp: bonusXp, message: "Achievement unlocked", achievement: label });
        }, 300);
        return [...prev, id];
      });
      setXp((prev) => prev + bonusXp);
    },
    [pushToast]
  );

  const hasAchievement = useCallback((id: string) => achievements.includes(id), [achievements]);

  const { current, next, progress } = levelFor(xp);
  const unlockedToday = achievements;

  return (
    <XpContext.Provider
      value={{ xp, level: current, nextLevel: next, progress, achievements, unlockedToday, addXp, unlock, hasAchievement }}
    >
      {children}
      {/* toast stack */}
      <div className="pointer-events-none fixed bottom-5 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-xs flex-col gap-2.5">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-pop pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/12 bg-ink/95 px-4 py-3 shadow-[0_16px_40px_rgba(10,15,44,0.5)] backdrop-blur"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-base">
              {t.achievement ? "🏆" : "⚡"}
            </span>
            <div className="min-w-0">
              {t.xp > 0 && <p className="font-display text-sm font-extrabold text-gold">+{t.xp} XP</p>}
              <p className="truncate text-xs text-white/75">{t.message}</p>
              {t.achievement && <p className="font-mono text-[10px] uppercase tracking-wider text-sky">{t.achievement}</p>}
            </div>
          </div>
        ))}
      </div>
    </XpContext.Provider>
  );
}

export function useXp() {
  const ctx = useContext(XpContext);
  if (!ctx) throw new Error("useXp must be used within XpProvider");
  return ctx;
}
