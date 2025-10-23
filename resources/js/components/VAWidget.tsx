"use client";

import { EmotionMix } from '@/lib/emotions';

interface VAWidgetProps {
  valence: number; // -1 to 1
  arousal: number; // -1 to 1
  mixes?: EmotionMix[];
  size?: number;
}

export function VAWidget({ valence, arousal, mixes, size = 80 }: VAWidgetProps) {
  // Convert VA coordinates to pixel positions
  // Center is at (size/2, size/2)
  // Valence: -1 (left) to 1 (right)
  // Arousal: -1 (bottom) to 1 (top)
  const x = ((valence + 1) / 2) * size;
  const y = ((1 - arousal) / 2) * size; // Inverted because y increases downward

  return (
    <div className="relative">
      <svg width={size} height={size} className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
        {/* Grid lines */}
        <line x1={size/2} y1="0" x2={size/2} y2={size} stroke="#2A2A2A" strokeWidth="1" />
        <line x1="0" y1={size/2} x2={size} y2={size/2} stroke="#2A2A2A" strokeWidth="1" />
        
        {/* Quadrant labels */}
        <text x={size * 0.75} y={size * 0.25} fill="#737373" fontSize="8" textAnchor="middle">+/+</text>
        <text x={size * 0.25} y={size * 0.25} fill="#737373" fontSize="8" textAnchor="middle">-/+</text>
        <text x={size * 0.25} y={size * 0.75} fill="#737373" fontSize="8" textAnchor="middle">-/-</text>
        <text x={size * 0.75} y={size * 0.75} fill="#737373" fontSize="8" textAnchor="middle">+/-</text>
        
        {/* Individual emotion points */}
        {mixes?.map((mix, idx) => {
          const ex = ((mix.emotion.valence + 1) / 2) * size;
          const ey = ((1 - mix.emotion.arousal) / 2) * size;
          const opacity = mix.percentage / 100;
          
          return (
            <circle
              key={idx}
              cx={ex}
              cy={ey}
              r={3}
              fill={mix.emotion.color}
              opacity={opacity * 0.6}
            />
          );
        })}
        
        {/* Mixed result point */}
        <circle
          cx={x}
          cy={y}
          r={6}
          fill="#6366F1"
          stroke="#818CF8"
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        <circle
          cx={x}
          cy={y}
          r={8}
          fill="none"
          stroke="#6366F1"
          strokeWidth="1"
          opacity="0.3"
          className="animate-ping"
          style={{ animationDuration: '2s' }}
        />
      </svg>
      
      {/* Axis labels */}
      <div className="mt-1 flex justify-between text-xs text-[#737373]">
        <span>Negatif</span>
        <span>Positif</span>
      </div>
      <div className="absolute top-0 left-0 right-0 text-center text-xs text-[#737373] -mt-4">
        Tinggi
      </div>
      <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-[#737373] -mb-4">
        Rendah
      </div>
    </div>
  );
}