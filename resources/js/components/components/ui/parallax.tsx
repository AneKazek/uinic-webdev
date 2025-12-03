import React, { useRef } from 'react';
import { useParallax } from '@/hooks/useParallax';

type ParallaxLayerProps = {
  speed?: number;
  axis?: 'y' | 'x';
  className?: string;
  children: React.ReactNode;
};

export function ParallaxLayer({ speed = 0.15, axis = 'y', className, children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, { speed, axis });
  return (
    <div ref={ref} className={`parallax-layer inline-block ${className ?? ''}`}>
      {children}
    </div>
  );
}