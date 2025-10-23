"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderBar } from '@/components/HeaderBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TimerRing } from '@/components/TimerRing';
import { Sparkles, Wind, Target, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type InterventionMode = 'select' | 'breathe' | 'focus' | 'reframe';

const REFRAME_WORDS = [
  'Saya', 'bisa', 'menghadapi', 'ini', 'dengan', 'tenang',
  'Saya', 'kuat', 'dan', 'mampu', 'mengatasi', 'tantangan',
  'Ini', 'adalah', 'kesempatan', 'untuk', 'belajar', 'dan', 'tumbuh',
  'Perasaan', 'ini', 'bersifat', 'sementara', 'akan', 'berlalu',
];

export default function InterventionPage() {
  const router = useRouter();
  const [mode, setMode] = useState<InterventionMode>('select');
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [breathCount, setBreathCount] = useState(0);
  const [focusScore, setFocusScore] = useState(0);
  const [focusTargets, setFocusTargets] = useState<{ x: number; y: number; id: number }[]>([]);
  const [reframeText, setReframeText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [interventionComplete, setInterventionComplete] = useState(false);

  // Breathe cycle
  useEffect(() => {
    if (mode === 'breathe' && !interventionComplete) {
      const phases: Array<{ phase: 'in' | 'hold' | 'out'; duration: number }> = [
        { phase: 'in', duration: 4000 },
        { phase: 'hold', duration: 4000 },
        { phase: 'out', duration: 6000 },
      ];

      let currentPhaseIndex = 0;
      setBreathPhase(phases[0].phase);

      const cyclePhase = () => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        setBreathPhase(phases[currentPhaseIndex].phase);

        if (currentPhaseIndex === 0) {
          setBreathCount((prev) => {
            const newCount = prev + 1;
            if (newCount >= 4) {
              setInterventionComplete(true);
            }
            return newCount;
          });
        }
      };

      const interval = setInterval(cyclePhase, phases[currentPhaseIndex].duration);

      return () => clearInterval(interval);
    }
  }, [mode, breathPhase, interventionComplete]);

  // Focus game
  const spawnTarget = () => {
    const x = Math.random() * 80 + 10; // 10-90%
    const y = Math.random() * 80 + 10;
    setFocusTargets((prev) => [...prev, { x, y, id: Date.now() }]);
  };

  const handleTargetClick = (id: number) => {
    setFocusTargets((prev) => prev.filter((t) => t.id !== id));
    setFocusScore((prev) => {
      const newScore = prev + 1;
      if (newScore >= 10) {
        setInterventionComplete(true);
      }
      return newScore;
    });
  };

  useEffect(() => {
    if (mode === 'focus' && !interventionComplete) {
      const interval = setInterval(spawnTarget, 1500);
      return () => clearInterval(interval);
    }
  }, [mode, interventionComplete]);

  // Reframe word selection
  const toggleWord = (word: string) => {
    setSelectedWords((prev) => {
      if (prev.includes(word)) {
        return prev.filter((w) => w !== word);
      } else {
        const newWords = [...prev, word];
        const newText = newWords.join(' ');
        if (newText.length <= 120) {
          setReframeText(newText);
          return newWords;
        }
        return prev;
      }
    });
  };

  const handleReframeComplete = () => {
    if (reframeText.length >= 10) {
      setInterventionComplete(true);
    }
  };

  const handleContinue = () => {
    sessionStorage.setItem('interventionMode', mode);
    router.push('/reflection');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeaderBar title="Intervensi" />

      <main className="container mx-auto px-4 py-4 sm:py-6 max-w-md sm:max-w-2xl landscape:max-w-4xl">
        {/* Mode Selection */}
        {mode === 'select' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Langkah 3 dari 4</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">Pilih Intervensi</h1>
              <p className="text-[#A3A3A3] text-xs sm:text-sm">
                Lakukan latihan 30-60 detik untuk meredakan ketegangan
              </p>
            </div>

            <div className="space-y-3">
              <Card
                onClick={() => setMode('breathe')}
                className="p-4 sm:p-6 bg-[#1A1A1A] border-[#2A2A2A] hover:border-indigo-500/50 cursor-pointer transition-all hover:bg-indigo-600/10"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                    <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Napas Dalam</h3>
                    <p className="text-xs sm:text-sm text-[#A3A3A3]">
                      Latihan pernapasan 4-4-6 untuk menenangkan sistem saraf
                    </p>
                    <Badge className="mt-2 bg-indigo-600/20 text-indigo-400 border-indigo-500/30 text-xs">
                      ~45 detik
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card
                onClick={() => setMode('focus')}
                className="p-4 sm:p-6 bg-[#1A1A1A] border-[#2A2A2A] hover:border-emerald-500/50 cursor-pointer transition-all hover:bg-emerald-600/10"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Fokus Pop</h3>
                    <p className="text-xs sm:text-sm text-[#A3A3A3]">
                      Game cepat untuk mengalihkan perhatian dari pikiran negatif
                    </p>
                    <Badge className="mt-2 bg-emerald-600/20 text-emerald-400 border-emerald-500/30 text-xs">
                      ~30 detik
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card
                onClick={() => setMode('reframe')}
                className="p-4 sm:p-6 bg-[#1A1A1A] border-[#2A2A2A] hover:border-amber-500/50 cursor-pointer transition-all hover:bg-amber-600/10"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-600/20 flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Reframe</h3>
                    <p className="text-xs sm:text-sm text-[#A3A3A3]">
                      Susun kata-kata positif untuk mengubah perspektif (maks 120 karakter)
                    </p>
                    <Badge className="mt-2 bg-amber-600/20 text-amber-400 border-amber-500/30 text-xs">
                      ~60 detik
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Breathe Mode - Horizontal layout for landscape */}
        {mode === 'breathe' && (
          <div className="space-y-4 landscape:space-y-3">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium">Langkah 3 dari 4</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold landscape:text-base">Napas Dalam</h1>
            </div>

            <Card className="p-6 landscape:p-4 bg-[#1A1A1A] border-[#2A2A2A]">
              {/* Portrait: vertical layout */}
              <div className="portrait:block landscape:hidden text-center space-y-4">
                <div className="flex justify-center">
                  <div
                    className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 transition-all duration-1000 ease-in-out ${
                      breathPhase === 'in'
                        ? 'scale-100'
                        : breathPhase === 'hold'
                        ? 'scale-100'
                        : 'scale-75'
                    }`}
                    style={{
                      boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)',
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">
                    {breathPhase === 'in' && 'Tarik Napas'}
                    {breathPhase === 'hold' && 'Tahan'}
                    {breathPhase === 'out' && 'Hembuskan'}
                  </h3>
                  <p className="text-[#A3A3A3] text-sm">
                    Siklus {breathCount + 1} dari 4
                  </p>
                </div>

                {interventionComplete && (
                  <Button
                    onClick={handleContinue}
                    className="bg-indigo-600 hover:bg-indigo-700 gap-2 h-10"
                  >
                    Lanjut ke Refleksi
                    <Sparkles className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Landscape: horizontal layout */}
              <div className="hidden landscape:flex landscape:items-center landscape:justify-between landscape:gap-6">
                <div
                  className={`w-28 h-28 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 transition-all duration-1000 ease-in-out ${
                    breathPhase === 'in'
                      ? 'scale-100'
                      : breathPhase === 'hold'
                      ? 'scale-100'
                      : 'scale-75'
                  }`}
                  style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' }}
                />

                <TimerRing duration={45} onComplete={() => setInterventionComplete(true)} />

                <div className="text-center">
                  <h3 className="text-lg font-bold mb-1">
                    {breathPhase === 'in' && 'Tarik Napas'}
                    {breathPhase === 'hold' && 'Tahan'}
                    {breathPhase === 'out' && 'Hembuskan'}
                  </h3>
                  <p className="text-[#A3A3A3] text-xs">Siklus {breathCount + 1} dari 4</p>

                  {interventionComplete && (
                    <Button
                      onClick={handleContinue}
                      className="mt-3 bg-indigo-600 hover:bg-indigo-700 gap-2 h-9"
                    >
                      Lanjut ke Refleksi
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Focus Mode */}
        {mode === 'focus' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium">Langkah 3 dari 4</span>
              </div>
              <h1 className="text-lg font-bold">Fokus Pop</h1>
            </div>

            <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A]">
              <div className="relative h-64">
                {focusTargets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTargetClick(t.id)}
                    className="absolute w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/50 hover:bg-emerald-600/50"
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    aria-label="Target"
                  />
                ))}
                <div className="absolute bottom-2 right-2 text-xs text-[#A3A3A3]">
                  Skor: {focusScore}/10
                </div>
              </div>
            </Card>

            <div className="flex gap-2">
              <Button onClick={() => setFocusTargets([])} variant="outline">Reset Target</Button>
              <Button onClick={() => spawnTarget()} className="bg-emerald-600 hover:bg-emerald-700">Tambah Target</Button>
              {focusScore >= 10 && (
                <Button onClick={handleContinue} className="ml-auto bg-indigo-600 hover:bg-indigo-700 gap-2">
                  Lanjut ke Refleksi
                  <Sparkles className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Reframe Mode */}
        {mode === 'reframe' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium">Langkah 3 dari 4</span>
              </div>
              <h1 className="text-lg font-bold">Reframe</h1>
            </div>

            <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] space-y-3">
              <p className="text-[#A3A3A3] text-xs">
                Susun kalimat pendek yang realistis & ramah. Maks 120 karakter.
              </p>
              <div className="flex flex-wrap gap-2">
                {REFRAME_WORDS.map((word, idx) => (
                  <Button
                    key={`${word}-${idx}`}
                    variant={selectedWords.includes(word) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleWord(word)}
                    className={selectedWords.includes(word) ? 'bg-indigo-600' : ''}
                  >
                    {word}
                  </Button>
                ))}
              </div>
              <Card className="p-3 bg-[#2A2A2A] border-[#3A3A3A]">
                <p className="text-sm text-[#F5F5F5] min-h-[48px]">{reframeText || '...'}</p>
              </Card>
              <div className="flex justify-end gap-2">
                <Button onClick={() => { setSelectedWords([]); setReframeText(''); }} variant="outline">Reset</Button>
                <Button onClick={handleReframeComplete} disabled={reframeText.length < 10} className="bg-indigo-600 hover:bg-indigo-700">Selesai</Button>
              </div>
              {interventionComplete && (
                <Button onClick={handleContinue} className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2">
                  Lanjut ke Refleksi
                  <Sparkles className="w-4 h-4" />
                </Button>
              )}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}