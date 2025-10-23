"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderBar } from '@/components/HeaderBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Trophy, TrendingDown, TrendingUp, Home } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function RewardsPage() {
  const router = useRouter();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [emotionLabel, setEmotionLabel] = useState('');
  const [tensionBefore, setTensionBefore] = useState(0);
  const [tensionAfter, setTensionAfter] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Load session data
    const label = sessionStorage.getItem('emotionLabel') || 'Campuran Emosi';
    const before = parseInt(sessionStorage.getItem('tensionBefore') || '5');
    const after = parseInt(sessionStorage.getItem('tensionAfter') || '5');
    
    setEmotionLabel(label);
    setTensionBefore(before);
    setTensionAfter(after);

    // Calculate XP based on completion and improvement
    const baseXP = 50;
    const improvementBonus = Math.max(0, (before - after) * 10);
    const totalXP = baseXP + improvementBonus;
    
    // Animate XP gain
    let currentXP = 0;
    const interval = setInterval(() => {
      currentXP += 5;
      if (currentXP >= totalXP) {
        currentXP = totalXP;
        clearInterval(interval);
        setShowConfetti(true);
      }
      setXp(currentXP);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const xpToNextLevel = 100;
  const progressPercent = (xp / xpToNextLevel) * 100;

  const handleNewSession = () => {
    sessionStorage.clear();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeaderBar title="Hasil" showCrisis={false} />

      <main className="container mx-auto px-4 py-4 sm:py-6 max-w-md sm:max-w-2xl landscape:max-w-4xl">
        {/* Portrait: Vertical Layout */}
        <div className="portrait:block landscape:hidden space-y-4 sm:space-y-6">
          {/* Celebration Header */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-600 to-emerald-600 animate-bounce">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Sesi Selesai!</h1>
            <p className="text-[#A3A3A3] text-sm">
              Anda telah menyelesaikan sesi Emotion Alchemist
            </p>
          </div>

          {/* XP Card */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-indigo-600/20 to-emerald-600/20 border-indigo-500/30">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Level {level}</h3>
                  <p className="text-xs sm:text-sm text-[#A3A3A3]">Pemula Alchemist</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-bold text-indigo-400 font-mono">
                    +{xp} XP
                  </div>
                  <p className="text-xs text-[#A3A3A3]">
                    {xp}/{xpToNextLevel} untuk Level {level + 1}
                  </p>
                </div>
              </div>
              <Progress value={progressPercent} className="h-2 sm:h-3" />
            </div>
          </Card>

          {/* Session Summary */}
          <Card className="p-4 sm:p-6 bg-[#1A1A1A] border-[#2A2A2A] space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg">Ringkasan Sesi</h3>
            
            <div className="space-y-3">
              {/* Emotion Label */}
              <div className="flex items-start gap-3 p-3 bg-[#2A2A2A] rounded-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-[#A3A3A3]">Label Emosi</p>
                  <p className="font-semibold text-sm sm:text-base text-indigo-400">{emotionLabel}</p>
                </div>
              </div>

              {/* Tension Change */}
              <div className="flex items-start gap-3 p-3 bg-[#2A2A2A] rounded-lg">
                {tensionAfter < tensionBefore ? (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-[#A3A3A3]">Perubahan Ketegangan</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm sm:text-base text-red-400">{tensionBefore}</span>
                    <span className="text-[#737373]">→</span>
                    <span className="font-mono text-sm sm:text-base text-emerald-400">{tensionAfter}</span>
                    <span className={`ml-auto font-semibold text-sm sm:text-base ${
                      tensionAfter < tensionBefore ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {tensionAfter < tensionBefore ? '↓' : '↑'} {Math.abs(tensionBefore - tensionAfter)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Insights */}
          <Card className="p-4 sm:p-6 bg-[#1A1A1A] border-[#2A2A2A] space-y-2 sm:space-y-3">
            <h3 className="font-semibold text-base sm:text-lg">Wawasan</h3>
            
            {tensionAfter < tensionBefore ? (
              <div className="space-y-2">
                <p className="text-emerald-400 font-medium text-sm sm:text-base">🎉 Luar biasa!</p>
                <p className="text-xs sm:text-sm text-[#A3A3A3]">
                  Latihan ini efektif mengurangi ketegangan Anda. Pertimbangkan untuk menggunakan 
                  teknik serupa saat mengalami emosi yang sama di masa depan.
                </p>
              </div>
            ) : tensionAfter === tensionBefore ? (
              <div className="space-y-2">
                <p className="text-indigo-400 font-medium text-sm sm:text-base">💫 Stabil</p>
                <p className="text-xs sm:text-sm text-[#A3A3A3]">
                  Ketegangan Anda tetap sama. Mungkin perlu waktu lebih lama atau teknik berbeda. 
                  Terus berlatih untuk menemukan yang cocok untuk Anda.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-amber-400 font-medium text-sm sm:text-base">🌱 Terus Berlatih</p>
                <p className="text-xs sm:text-sm text-[#A3A3A3]">
                  Tidak apa-apa jika ketegangan meningkat. Kesadaran diri adalah langkah pertama. 
                  Cobalah teknik berbeda atau ulangi latihan saat lebih siap.
                </p>
              </div>
            )}
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleNewSession}
              className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2 h-11 sm:h-12"
            >
              <Home className="w-4 h-4" />
              Mulai Sesi Baru
            </Button>
            
            <p className="text-center text-xs text-[#737373]">
              Latihan reguler meningkatkan kesadaran emosi dan kesejahteraan mental
            </p>
          </div>
        </div>

        {/* Landscape: 2-Column Layout */}
        <div className="portrait:hidden landscape:block">
          <div className="space-y-3">
            {/* Celebration Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-emerald-600 animate-bounce">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Sesi Selesai!</h1>
              <p className="text-[#A3A3A3] text-xs">
                Anda telah menyelesaikan sesi Emotion Alchemist
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Left Column: XP + Summary */}
              <div className="space-y-3">
                {/* XP Card */}
                <Card className="p-4 bg-gradient-to-br from-indigo-600/20 to-emerald-600/20 border-indigo-500/30">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">Level {level}</h3>
                        <p className="text-xs text-[#A3A3A3]">Pemula Alchemist</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-400 font-mono">
                          +{xp} XP
                        </div>
                        <p className="text-[10px] text-[#A3A3A3]">
                          {xp}/{xpToNextLevel} untuk Level {level + 1}
                        </p>
                      </div>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>
                </Card>

                {/* Session Summary */}
                <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] space-y-3">
                  <h3 className="font-semibold text-sm">Ringkasan Sesi</h3>
                  
                  <div className="space-y-2">
                    {/* Emotion Label */}
                    <div className="flex items-start gap-2 p-2 bg-[#2A2A2A] rounded-lg">
                      <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#A3A3A3]">Label Emosi</p>
                        <p className="font-semibold text-xs text-indigo-400">{emotionLabel}</p>
                      </div>
                    </div>

                    {/* Tension Change */}
                    <div className="flex items-start gap-2 p-2 bg-[#2A2A2A] rounded-lg">
                      {tensionAfter < tensionBefore ? (
                        <TrendingDown className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-xs text-[#A3A3A3]">Perubahan Ketegangan</p>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-red-400">{tensionBefore}</span>
                          <span className="text-[#737373] text-xs">→</span>
                          <span className="font-mono text-sm text-emerald-400">{tensionAfter}</span>
                          <span className={`ml-auto font-semibold text-sm ${
                            tensionAfter < tensionBefore ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            {tensionAfter < tensionBefore ? '↓' : '↑'} {Math.abs(tensionBefore - tensionAfter)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: Insights + Action */}
              <div className="space-y-3">
                <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] space-y-2">
                  <h3 className="font-semibold text-sm">Wawasan</h3>
                  
                  {tensionAfter < tensionBefore ? (
                    <div className="space-y-2">
                      <p className="text-emerald-400 font-medium text-sm">🎉 Luar biasa!</p>
                      <p className="text-xs text-[#A3A3A3]">
                        Latihan ini efektif mengurangi ketegangan Anda. Pertimbangkan untuk menggunakan 
                        teknik serupa saat mengalami emosi yang sama di masa depan.
                      </p>
                    </div>
                  ) : tensionAfter === tensionBefore ? (
                    <div className="space-y-2">
                      <p className="text-indigo-400 font-medium text-sm">💫 Stabil</p>
                      <p className="text-xs text-[#A3A3A3]">
                        Ketegangan Anda tetap sama. Mungkin perlu waktu lebih lama atau teknik berbeda. 
                        Terus berlatih untuk menemukan yang cocok untuk Anda.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-amber-400 font-medium text-sm">🌱 Terus Berlatih</p>
                      <p className="text-xs text-[#A3A3A3]">
                        Tidak apa-apa jika ketegangan meningkat. Kesadaran diri adalah langkah pertama. 
                        Cobalah teknik berbeda atau ulangi latihan saat lebih siap.
                      </p>
                    </div>
                  )}
                </Card>

                <Button
                  onClick={handleNewSession}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2 h-10"
                >
                  <Home className="w-4 h-4" />
                  Mulai Sesi Baru
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}