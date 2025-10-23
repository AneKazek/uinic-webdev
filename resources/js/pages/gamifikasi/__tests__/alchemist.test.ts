import { describe, it, expect } from 'vitest';

// Local duplicate of logic for unit testing purposes.

type VA = { v: number; a: number };

type EmotionLabel = { key: string; name: string; va: VA; definition: string };

type EssenceKey = 'cemas' | 'sedih' | 'marah' | 'malu' | 'kecewa' | 'lelah';

const ESSENCES: Record<EssenceKey, { name: string; va: VA }> = {
  cemas: { name: 'Cemas', va: { v: -0.4, a: 0.6 } },
  sedih: { name: 'Sedih', va: { v: -0.6, a: -0.3 } },
  marah: { name: 'Marah', va: { v: -0.7, a: 0.5 } },
  malu: { name: 'Malu', va: { v: -0.3, a: 0.2 } },
  kecewa: { name: 'Kecewa', va: { v: -0.5, a: -0.1 } },
  lelah: { name: 'Lelah', va: { v: -0.2, a: -0.6 } },
};

const LABELS: EmotionLabel[] = [
  { key: 'gelisah', name: 'Gelisah', va: { v: -0.3, a: 0.6 }, definition: 'Tidak tenang, ada ketegangan ringan.' },
  { key: 'sedih', name: 'Sedih', va: { v: -0.6, a: -0.3 }, definition: 'Turun perasaan, ingin menyendiri.' },
  { key: 'marah', name: 'Marah', va: { v: -0.7, a: 0.5 }, definition: 'Frustrasi, ingin melawan.' },
  { key: 'malu', name: 'Malu', va: { v: -0.3, a: 0.2 }, definition: 'Tidak nyaman dinilai orang lain.' },
  { key: 'kecewa', name: 'Kecewa', va: { v: -0.5, a: -0.1 }, definition: 'Ekspektasi gagal, rasa lesu.' },
  { key: 'lelah', name: 'Lelah', va: { v: -0.2, a: -0.6 }, definition: 'Energi rendah, butuh istirahat.' },
  { key: 'tenang', name: 'Tenang', va: { v: 0.4, a: -0.4 }, definition: 'Stabil, terkendali, tidak terburu-buru.' },
  { key: 'lega', name: 'Lega', va: { v: 0.6, a: -0.2 }, definition: 'Beban berkurang, napas lebih longgar.' },
  { key: 'bersemangat', name: 'Bersemangat', va: { v: 0.6, a: 0.6 }, definition: 'Antusias, energi naik.' },
  { key: 'damai', name: 'Damai', va: { v: 0.5, a: -0.5 }, definition: 'Rasa tenteram dan aman.' },
  { key: 'canggung', name: 'Canggung', va: { v: -0.1, a: 0.1 }, definition: 'Kikuk, tidak pas.' },
  { key: 'panik', name: 'Panik', va: { v: -0.8, a: 0.8 }, definition: 'Ketakutan tinggi dan terburu.' },
];

function mixVA(weights: Partial<Record<EssenceKey, number>>): VA {
  const entries = Object.entries(weights).filter(([, w]) => (w ?? 0) > 0) as [EssenceKey, number][];
  const sum = entries.reduce((acc, [, w]) => acc + w, 0);
  if (sum <= 0) return { v: 0, a: 0 };
  const v = entries.reduce((acc, [k, w]) => acc + ESSENCES[k].va.v * (w / sum), 0);
  const a = entries.reduce((acc, [k, w]) => acc + ESSENCES[k].va.a * (w / sum), 0);
  return { v: Number(v.toFixed(2)), a: Number(a.toFixed(2)) };
}

function suggestLabels(target: VA, topN = 3): EmotionLabel[] {
  const dist = (l: EmotionLabel) => Math.hypot(l.va.v - target.v, l.va.a - target.a);
  return LABELS
    .map((l) => ({ l, d: dist(l) }))
    .sort((x, y) => x.d - y.d)
    .slice(0, topN)
    .map((x) => x.l);
}

describe('Alchemist logic', () => {
  it('mixVA normalizes weighted VA correctly', () => {
    const va = mixVA({ cemas: 50, lelah: 50 });
    expect(va.v).toBeCloseTo((-0.4 * 0.5) + (-0.2 * 0.5), 2);
    expect(va.a).toBeCloseTo((0.6 * 0.5) + (-0.6 * 0.5), 2);
  });

  it('suggestLabels returns 3 nearest labels', () => {
    const target = { v: -0.5, a: -0.1 };
    const cands = suggestLabels(target);
    expect(cands.length).toBe(3);
    expect(cands[0].key).toBe('kecewa');
  });
});