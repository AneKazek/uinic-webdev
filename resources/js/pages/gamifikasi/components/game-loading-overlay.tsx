import React from 'react';

export function GameLoadingOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        <p className="text-xs text-white/80">Loading…</p>
      </div>
    </div>
  );
}