"use client";

import { useState } from 'react';
import { Phone, Volume2, VolumeX, Zap, ZapOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface HeaderBarProps {
  title?: string;
  showCrisis?: boolean;
}

export function HeaderBar({ title = "Emotion Alchemist", showCrisis = true }: HeaderBarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showCrisisDialog, setShowCrisisDialog] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleMotion = () => {
    setReducedMotion(!reducedMotion);
    if (!reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            {title}
          </h1>
          
          <div className="flex items-center gap-2">
            {showCrisis && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCrisisDialog(true)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                title="Bantuan Darurat"
              >
                <Phone className="w-5 h-5" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-[#A3A3A3] hover:text-[#F5F5F5]"
              title={isMuted ? "Aktifkan Suara" : "Bisukan"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMotion}
              className="text-[#A3A3A3] hover:text-[#F5F5F5]"
              title={reducedMotion ? "Aktifkan Animasi" : "Kurangi Gerakan"}
            >
              {reducedMotion ? <ZapOff className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <AlertDialog open={showCrisisDialog} onOpenChange={setShowCrisisDialog}>
        <AlertDialogContent className="bg-[#1A1A1A] border-red-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Bantuan Darurat</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 text-[#A3A3A3]">
              <p>Jika Anda mengalami krisis kesehatan mental, hubungi:</p>
              <div className="space-y-2 text-[#F5F5F5]">
                <p><strong>Hotline 119 ext 8</strong> - Kementerian Kesehatan RI</p>
                <p><strong>Hotline Sejiwa:</strong> 119 ext 8</p>
                <p><strong>Into the Light:</strong> 021-788-42580</p>
              </div>
              <p className="text-sm">Anda tidak sendirian. Bantuan tersedia 24/7.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600">
              Mengerti
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}