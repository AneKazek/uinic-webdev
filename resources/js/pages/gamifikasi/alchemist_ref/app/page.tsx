"use client";

import { useRouter } from 'next/navigation';
import { HeaderBar } from '@/components/HeaderBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Droplet, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    sessionStorage.clear();
    router.push('/mixer');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeaderBar title="Emotion Alchemist" />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-xl landscape:max-w-6xl">
        {/* Landscape: Two-column layout */}
        <div className="landscape:grid landscape:grid-cols-2 landscape:gap-8 landscape:items-start">
          
          {/* Left Column (Landscape) / Top Section (Portrait) */}
          <div className="space-y-6 landscape:space-y-8">
            {/* Hero Section */}
            <div className="text-center landscape:text-left space-y-3 sm:space-y-4 py-6 sm:py-8 landscape:py-4">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 landscape:w-20 landscape:h-20 rounded-full bg-gradient-to-br from-indigo-600 to-emerald-600 mb-3 sm:mb-4 landscape:mb-3 animate-pulse">
                <Droplet className="w-10 h-10 sm:w-12 sm:h-12 landscape:w-10 landscape:h-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl landscape:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent px-4 landscape:px-0">
                Emotion Alchemist
              </h1>
              <p className="text-[#A3A3A3] text-base sm:text-lg landscape:text-base max-w-md mx-auto landscape:mx-0 px-4 landscape:px-0">
                Racik esens emosimu, temukan label yang pas, dan latih teknik meredakan ketegangan
              </p>
            </div>

            {/* Features - moved up in landscape */}
            <div className="grid grid-cols-2 gap-3 landscape:hidden">
              <Card className="p-3 sm:p-4 bg-indigo-600/10 border-indigo-500/30 text-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-medium">Duolingo-style</p>
                <p className="text-[10px] sm:text-xs text-[#737373]">Game interaktif</p>
              </Card>
              
              <Card className="p-3 sm:p-4 bg-emerald-600/10 border-emerald-500/30 text-center">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-medium">Sesi Singkat</p>
                <p className="text-[10px] sm:text-xs text-[#737373]">2-3 menit</p>
              </Card>
            </div>
          </div>

          {/* Right Column (Landscape) / Middle Section (Portrait) */}
          <div className="space-y-6 landscape:space-y-6 mt-6 landscape:mt-0">
            {/* How It Works */}
            <Card className="p-5 sm:p-6 landscape:p-5 bg-[#1A1A1A] border-[#2A2A2A] space-y-5 sm:space-y-6 landscape:space-y-4">
              <h2 className="text-lg sm:text-xl landscape:text-lg font-bold text-center">Cara Bermain</h2>
              
              <div className="space-y-4 landscape:space-y-3">
                {/* Step 1 */}
                <div className="flex gap-3 sm:gap-4 landscape:gap-3">
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 landscape:w-8 landscape:h-8 rounded-full bg-indigo-600/20 border-2 border-indigo-600 flex-shrink-0">
                    <span className="font-bold text-indigo-400 text-sm sm:text-base landscape:text-sm">1</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 text-sm sm:text-base landscape:text-sm">Racik Emosi</h3>
                    <p className="text-xs sm:text-sm landscape:text-xs text-[#A3A3A3]">
                      Pilih 2-3 emosi dan atur proporsinya hingga 100%. Lihat hasilnya di peta Valence-Arousal.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3 sm:gap-4 landscape:gap-3">
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 landscape:w-8 landscape:h-8 rounded-full bg-indigo-600/20 border-2 border-indigo-600 flex-shrink-0">
                    <span className="font-bold text-indigo-400 text-sm sm:text-base landscape:text-sm">2</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 text-sm sm:text-base landscape:text-sm">Beri Label</h3>
                    <p className="text-xs sm:text-sm landscape:text-xs text-[#A3A3A3]">
                      Pilih dari 3 saran label atau buat sendiri. Algoritme menghitung jarak Euclidean untuk saran terbaik.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3 sm:gap-4 landscape:gap-3">
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 landscape:w-8 landscape:h-8 rounded-full bg-emerald-600/20 border-2 border-emerald-600 flex-shrink-0">
                    <span className="font-bold text-emerald-400 text-sm sm:text-base landscape:text-sm">3</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 text-sm sm:text-base landscape:text-sm">Intervensi 30-60s</h3>
                    <p className="text-xs sm:text-sm landscape:text-xs text-[#A3A3A3]">
                      Pilih: Napas Dalam (4-4-6), Fokus Pop (game ketuk), atau Reframe (susun kata positif).
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-3 sm:gap-4 landscape:gap-3">
                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 landscape:w-8 landscape:h-8 rounded-full bg-emerald-600/20 border-2 border-emerald-600 flex-shrink-0">
                    <span className="font-bold text-emerald-400 text-sm sm:text-base landscape:text-sm">4</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 text-sm sm:text-base landscape:text-sm">Refleksi & XP</h3>
                    <p className="text-xs sm:text-sm landscape:text-xs text-[#A3A3A3]">
                      Bandingkan ketegangan sebelum/sesudah dan raih XP berdasarkan progress Anda!
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features in landscape - show here */}
            <div className="hidden landscape:grid grid-cols-2 gap-3">
              <Card className="p-3 bg-indigo-600/10 border-indigo-500/30 text-center">
                <Sparkles className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                <p className="text-xs font-medium">Duolingo-style</p>
                <p className="text-[10px] text-[#737373]">Game interaktif</p>
              </Card>
              
              <Card className="p-3 bg-emerald-600/10 border-emerald-500/30 text-center">
                <Zap className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs font-medium">Sesi Singkat</p>
                <p className="text-[10px] text-[#737373]">2-3 menit</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom Section - Full Width in Both Orientations */}
        <div className="space-y-6 sm:space-y-6 landscape:space-y-4 mt-6 sm:mt-8 landscape:mt-6">
          {/* Start Button */}
          <Button
            onClick={handleStart}
            className="w-full h-12 sm:h-14 landscape:h-12 landscape:max-w-md landscape:mx-auto landscape:block bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-base sm:text-lg landscape:text-base font-semibold gap-2 touch-manipulation"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 landscape:w-4 landscape:h-4" />
            Mulai Sesi Baru
          </Button>

          {/* Disclaimer */}
          <Card className="p-3 sm:p-4 landscape:p-3 bg-amber-600/10 border-amber-500/30 landscape:max-w-3xl landscape:mx-auto">
            <p className="text-[10px] sm:text-xs landscape:text-[10px] text-[#A3A3A3] text-center leading-relaxed">
              ⚠️ Ini bukan pengganti terapi profesional. Jika mengalami krisis, tekan ikon telepon di kanan atas untuk bantuan darurat.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}