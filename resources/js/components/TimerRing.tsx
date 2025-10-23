"use client";

import { useEffect, useState } from 'react';

interface TimerRingProps {
  duration: number; // in seconds
  size?: number;
  strokeWidth?: number;
  onComplete?: () => void;
}

export function TimerRing({ duration, size = 120, strokeWidth = 8, onComplete }: TimerRingProps) {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    setProgress(0);
    setTimeLeft(duration);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration * 10));
        if (newProgress >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return newProgress;
      });

      setTimeLeft((prev) => {
        const newTime = Math.max(0, prev - 0.1);
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2A2A2A"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#6366F1"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-100 ease-linear"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))',
          }}
        />
      </svg>
      {/* Time display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold font-mono text-indigo-400">
          {Math.ceil(timeLeft)}
        </span>
      </div>
    </div>
  );
}