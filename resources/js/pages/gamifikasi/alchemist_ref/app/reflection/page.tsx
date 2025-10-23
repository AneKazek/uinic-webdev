"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderBar } from '@/components/HeaderBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Sparkles } from 'lucide-react';

export default function ReflectionPage() {
  const router = useRouter();
  const [tensionBefore, setTensionBefore] = useState(5);
  const [tensionAfter, setTensionAfter] = useState(5);

  const handleContinue = () => {
    const tensionDelta = tensionBefore - tensionAfter;
    sessionStorage.setItem('tensionBefore', tensionBefore.toString());
    sessionStorage.setItem('tensionAfter', tensionAfter.toString());
    router.push('/rewards');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeaderBar title="Refleksi" />

      <main className="container mx-auto px-4 py-4 sm:py-6 max-w-md sm:max-w-2xl landscape:max-w-4xl">
        {/* Portrait: Vertical Layout */}
        <div className="portrait:block landscape:hidden space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Langkah 4 dari 4</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">Refleksi</h1>
            <p className="text-[#A3A3A3] text-xs sm:text-sm">
              Bandingkan tingkat ketegangan Anda sebelum dan sesudah latihan
            </p>
          </div>

          {/* Tension Before */}
          <Card className="p-4 sm:p-6 bg-[#1A1A1A] border-[#2A2A2A] space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base">Ketegangan Sebelum</h3>
              <span className="text-2xl sm:text-3xl font-bold text-red-400 font-mono">
                {tensionBefore}
              </span>
            </div>

            <div className="space-y-2">
              <Slider
                value={[tensionBefore]}
                onValueChange={(values) => setTensionBefore(values[0])}
                max={10}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[#737373]">
                <span>Sangat Rileks</span>
                <span>Sangat Tegang</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A3A3A3] italic">
              Bagaimana perasaan Anda sebelum memulai latihan?
            </p>
          </Card>

          {/* Tension After */}
          <Card className="p-4 sm:p-6 bg-[#1A1A1A] border-[#2A2A2A] space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base">Ketegangan Sesudah</h3>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">
                {tensionAfter}
              </span>
            </div>

            <div className="space-y-2">
              <Slider
                value={[tensionAfter]}
                onValueChange={(values) => setTensionAfter(values[0])}
                max={10}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[#737373]">
                <span>Sangat Rileks</span>
                <span>Sangat Tegang</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A3A3A3] italic">
              Bagaimana perasaan Anda sekarang setelah latihan?
            </p>
          </Card>

          {/* Delta Display */}
          {tensionBefore !== tensionAfter && (
            <Card className={`p-3 sm:p-4 ${
              tensionAfter < tensionBefore
                ? 'bg-emerald-600/10 border-emerald-500/30'
                : 'bg-amber-600/10 border-amber-500/30'
            }`}>
              <div className="text-center">
                <p className="text-xs sm:text-sm text-[#A3A3A3] mb-1">Perubahan Ketegangan:</p>
                <p className={`text-xl sm:text-2xl font-bold ${
                  tensionAfter < tensionBefore ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {tensionAfter < tensionBefore ? '↓' : '↑'} {Math.abs(tensionBefore - tensionAfter)} poin
                </p>
                <p className="text-xs text-[#A3A3A3] mt-1">
                  {tensionAfter < tensionBefore
                    ? 'Ketegangan berkurang! 🎉'
                    : 'Tidak apa-apa, terus berlatih!'}
                </p>
              </div>
            </Card>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2 h-11 sm:h-12"
          >
            Lihat Hasil
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>

        {/* Landscape: 2-Column Layout */}
        <div className="portrait:hidden landscape:block">
          <div className="space-y-3">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium">Langkah 4 dari 4</span>
              </div>
              <h1 className="text-xl font-bold">Refleksi</h1>
              <p className="text-[#A3A3A3] text-xs">
                Bandingkan tingkat ketegangan Anda sebelum dan sesudah latihan
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Tension Before */}
              <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Ketegangan Sebelum</h3>
                  <span className="text-2xl font-bold text-red-400 font-mono">
                    {tensionBefore}
                  </span>
                </div>

                <div className="space-y-2">
                  <Slider
                    value={[tensionBefore]}
                    onValueChange={(values) => setTensionBefore(values[0])}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-[#737373]">
                    <span>Rileks</span>
                    <span>Tegang</span>
                  </div>
                </div>

                <p className="text-xs text-[#A3A3A3] italic">
                  Bagaimana perasaan Anda sebelum latihan?
                </p>
              </Card>

              {/* Tension After */}
              <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Ketegangan Sesudah</h3>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">
                    {tensionAfter}
                  </span>
                </div>

                <div className="space-y-2">
                  <Slider
                    value={[tensionAfter]}
                    onValueChange={(values) => setTensionAfter(values[0])}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-[#737373]">
                    <span>Rileks</span>
                    <span>Tegang</span>
                  </div>
                </div>

                <p className="text-xs text-[#A3A3A3] italic">
                  Bagaimana perasaan Anda sekarang?
                </p>
              </Card>
            </div>

            {/* Delta Display */}
            {tensionBefore !== tensionAfter && (
              <Card className={`p-3 ${
                tensionAfter < tensionBefore
                  ? 'bg-emerald-600/10 border-emerald-500/30'
                  : 'bg-amber-600/10 border-amber-500/30'
              }`}>
                <div className="text-center">
                  <p className="text-xs text-[#A3A3A3] mb-1">Perubahan Ketegangan:</p>
                  <p className={`text-lg font-bold ${
                    tensionAfter < tensionBefore ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {tensionAfter < tensionBefore ? '↓' : '↑'} {Math.abs(tensionBefore - tensionAfter)} poin
                  </p>
                  <p className="text-xs text-[#A3A3A3] mt-0.5">
                    {tensionAfter < tensionBefore
                      ? 'Ketegangan berkurang! 🎉'
                      : 'Tidak apa-apa, terus berlatih!'}
                  </p>
                </div>
              </Card>
            )}

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2 h-10 text-sm"
            >
              Lihat Hasil
              <Sparkles className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}