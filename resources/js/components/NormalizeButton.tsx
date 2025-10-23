"use client";

import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

interface NormalizeButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function NormalizeButton({ onClick, disabled }: NormalizeButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outline"
      size="sm"
      className="gap-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
    >
      <Calculator className="w-4 h-4" />
      Normalisasi ke 100%
    </Button>
  );
}