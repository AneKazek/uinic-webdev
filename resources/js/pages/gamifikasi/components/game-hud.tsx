import React from 'react';
import { useGameStore } from '../../mentoring/components/gamification/store/gameStore';
import { Button } from '@/components/ui/button';

export function GameHUD() {
  const { xp, level, lastResult, reducedMotion } = useGameStore();

  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2">
      <div className="pointer-events-auto rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm px-3 py-2 text-xs text-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Lv {level}</span>
          <span className="opacity-80">• XP {xp}</span>
          {lastResult ? (
            <span className="opacity-80">• {lastResult.kind} — {lastResult.score ?? '-'} pts</span>
          ) : (
            <span className="opacity-60">• Ready</span>
          )}
        </div>
      </div>
      <div className="pointer-events-auto hidden sm:block">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 rounded-md border border-white/10 bg-black/30 text-white hover:bg-white/10 transition-colors"
          onClick={() => useGameStore.getState().toggleReducedMotion()}
          title="Toggle Reduced Motion"
        >
          {reducedMotion ? 'Motion: Low' : 'Motion: Full'}
        </Button>
      </div>
    </div>
  );
}