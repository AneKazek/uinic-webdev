"use client";

import { useState, useEffect } from 'react';
import { Emotion, snapToFivePercent } from '@/lib/emotions';
import { Slider } from '@/components/ui/slider';

interface EssenceSliderProps {
  emotion: Emotion;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function EssenceSlider({ emotion, value, onChange, disabled }: EssenceSliderProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (values: number[]) => {
    const newValue = snapToFivePercent(values[0]);
    setDisplayValue(newValue);
  };

  const handleCommit = (values: number[]) => {
    const snappedValue = snapToFivePercent(values[0]);
    onChange(snappedValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: emotion.color }}
          />
          <span className="font-medium text-sm">{emotion.labelId}</span>
        </div>
        <span 
          className="text-lg font-bold font-mono"
          style={{ color: emotion.color }}
        >
          {displayValue}%
        </span>
      </div>
      
      <Slider
        value={[displayValue]}
        onValueChange={handleChange}
        onValueCommit={handleCommit}
        max={100}
        min={0}
        step={1}
        disabled={disabled}
        className="w-full"
        style={{
          '--slider-thumb-color': emotion.color,
          '--slider-track-color': emotion.color,
        } as React.CSSProperties}
      />
    </div>
  );
}