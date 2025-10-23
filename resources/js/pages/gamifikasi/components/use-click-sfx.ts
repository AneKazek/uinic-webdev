import { useCallback, useMemo } from 'react';

export type ClickSfxOptions = {
  volume?: number; // 0..1
  frequency?: number; // Hz
  durationMs?: number;
  disabled?: boolean;
};

// Lightweight WebAudio beep for click feedback without external assets
export function useClickSfx(opts: ClickSfxOptions = {}) {
  const { volume = 0.12, frequency = 440, durationMs = 80, disabled = false } = opts;
  const ctx = useMemo(() => (typeof window !== 'undefined' && !disabled ? new (window.AudioContext || (window as any).webkitAudioContext)() : null), [disabled]);

  const play = useCallback(() => {
    if (!ctx || disabled) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      try { osc.stop(); osc.disconnect(); gain.disconnect(); } catch {}
    }, durationMs);
  }, [ctx, disabled, frequency, volume, durationMs]);

  return { play };
}