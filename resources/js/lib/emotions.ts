// Emotion data with Valence-Arousal coordinates
// Valence: -1 (negative) to 1 (positive)
// Arousal: -1 (low) to 1 (high)

export interface Emotion {
  id: string;
  label: string;
  labelId: string; // Indonesian label
  valence: number; // -1 to 1
  arousal: number; // -1 to 1
  color: string;
}

export const EMOTIONS: Emotion[] = [
  // High Arousal, Positive Valence
  { id: 'gembira', label: 'Gembira', labelId: 'Gembira', valence: 0.8, arousal: 0.7, color: '#10B981' },
  { id: 'semangat', label: 'Semangat', labelId: 'Semangat', valence: 0.7, arousal: 0.8, color: '#F59E0B' },
  { id: 'antusias', label: 'Antusias', labelId: 'Antusias', valence: 0.7, arousal: 0.6, color: '#3B82F6' },
  { id: 'penasaran', label: 'Penasaran', labelId: 'Penasaran', valence: 0.2, arousal: 0.4, color: '#06B6D4' },
  
  // High Arousal, Negative Valence
  { id: 'marah', label: 'Marah', labelId: 'Marah', valence: -0.8, arousal: 0.8, color: '#EF4444' },
  { id: 'takut', label: 'Takut', labelId: 'Takut', valence: -0.7, arousal: 0.8, color: '#DC2626' },
  { id: 'stres', label: 'Stres/Kewalahan', labelId: 'Stres/Kewalahan', valence: -0.5, arousal: 0.7, color: '#F97316' },
  { id: 'cemas', label: 'Cemas', labelId: 'Cemas', valence: -0.6, arousal: 0.7, color: '#FB923C' },
  { id: 'panik', label: 'Panik', labelId: 'Panik', valence: -0.7, arousal: 0.9, color: '#B91C1C' },
  { id: 'jijik', label: 'Jijik', labelId: 'Jijik', valence: -0.5, arousal: 0.3, color: '#84CC16' },
  { id: 'iri', label: 'Iri/Cemburu', labelId: 'Iri/Cemburu', valence: -0.45, arousal: 0.35, color: '#65A30D' },
  
  // Low Arousal, Positive Valence
  { id: 'tenang', label: 'Tenang', labelId: 'Tenang', valence: 0.6, arousal: -0.6, color: '#0EA5E9' },
  { id: 'lega', label: 'Lega', labelId: 'Lega', valence: 0.5, arousal: -0.4, color: '#14B8A6' },
  { id: 'damai', label: 'Damai', labelId: 'Damai', valence: 0.7, arousal: -0.8, color: '#06B6D4' },
  { id: 'puas', label: 'Puas', labelId: 'Puas', valence: 0.65, arousal: -0.5, color: '#0891B2' },
  
  // Low Arousal, Negative Valence
  { id: 'sedih', label: 'Sedih', labelId: 'Sedih', valence: -0.7, arousal: -0.6, color: '#6366F1' },
  { id: 'hampa', label: 'Hampa', labelId: 'Hampa', valence: -0.7, arousal: -0.6, color: '#4F46E5' },
  { id: 'kesepian', label: 'Kesepian', labelId: 'Kesepian', valence: -0.6, arousal: -0.3, color: '#7C3AED' },
  { id: 'bersalah', label: 'Bersalah/Menyesal', labelId: 'Bersalah/Menyesal', valence: -0.65, arousal: -0.2, color: '#9333EA' },
  { id: 'lelah', label: 'Lelah', labelId: 'Lelah', valence: -0.5, arousal: -0.8, color: '#8B5CF6' },
  { id: 'kecewa', label: 'Kecewa', labelId: 'Kecewa', valence: -0.6, arousal: -0.5, color: '#A855F7' },
  
  // Neutral/Mixed
  { id: 'bingung', label: 'Bingung/Bimbang', labelId: 'Bingung/Bimbang', valence: -0.1, arousal: 0.2, color: '#EC4899' },
  { id: 'terkejut', label: 'Terkejut', labelId: 'Terkejut', valence: 0, arousal: 0.8, color: '#F472B6' },
  { id: 'netral', label: 'Netral', labelId: 'Netral', valence: 0, arousal: 0, color: '#737373' },
];

export interface EmotionMix {
  emotion: Emotion;
  percentage: number;
}

export function calculateMixedVA(mixes: EmotionMix[]): { valence: number; arousal: number } {
  let totalValence = 0;
  let totalArousal = 0;
  
  mixes.forEach(mix => {
    const weight = mix.percentage / 100;
    totalValence += mix.emotion.valence * weight;
    totalArousal += mix.emotion.arousal * weight;
  });
  
  return {
    valence: Math.max(-1, Math.min(1, totalValence)),
    arousal: Math.max(-1, Math.min(1, totalArousal))
  };
}

export function findClosestEmotions(valence: number, arousal: number, count: number = 3): Emotion[] {
  const distances = EMOTIONS.map(emotion => ({
    emotion,
    distance: Math.sqrt(
      Math.pow(emotion.valence - valence, 2) + 
      Math.pow(emotion.arousal - arousal, 2)
    )
  }));
  
  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, count).map(d => d.emotion);
}

export function snapToFivePercent(value: number): number {
  return Math.round(value / 5) * 5;
}