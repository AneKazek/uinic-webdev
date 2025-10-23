"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderBar } from '@/components/HeaderBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { findClosestEmotions, Emotion } from '@/lib/emotions';
import { Sparkles, Search, ChevronRight } from 'lucide-react';

export default function LabelsPage() {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Emotion[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [customLabel, setCustomLabel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load mix from sessionStorage
    const mixData = sessionStorage.getItem('emotionMix');
    if (mixData) {
      const { valence, arousal } = JSON.parse(mixData);
      const closest = findClosestEmotions(valence, arousal, 3);
      setSuggestions(closest);
    } else {
      router.push('/mixer');
    }
  }, [router]);

  const handleSelectEmotion = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setCustomLabel(emotion.labelId);
  };

  const handleContinue = () => {
    const label = customLabel || selectedEmotion?.labelId || 'Campuran';
    sessionStorage.setItem('emotionLabel', label);
    router.push('/intervention');
  };

  // Filter suggestions based on search
  const filteredSuggestions = suggestions.filter(emotion =>
    emotion.labelId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeaderBar title="Pilih Label" />
      
      <main className="container mx-auto px-4 py-4 sm:py-6 max-w-md sm:max-w-2xl landscape:max-w-4xl">
        {/* Portrait: Vertical Layout */}
        <div className="portrait:block landscape:hidden space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Langkah 2 dari 4</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">Beri Nama Campuran</h1>
            <p className="text-[#A3A3A3] text-xs sm:text-sm">
              Pilih dari saran atau buat label sendiri
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#737373]" />
            <Input
              type="text"
              placeholder="Cari atau ketik label sendiri..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#737373] h-10 sm:h-11 text-sm"
            />
          </div>

          {/* Suggestions */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-medium text-[#A3A3A3]">Saran Label:</h3>
            {filteredSuggestions.map((emotion, index) => (
              <Card
                key={emotion.id}
                onClick={() => handleSelectEmotion(emotion)}
                className={`p-3 sm:p-4 cursor-pointer transition-all ${
                  selectedEmotion?.id === emotion.id
                    ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50'
                    : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-indigo-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${emotion.color}20`, border: `2px solid ${emotion.color}` }}
                    >
                      <span className="text-sm sm:text-lg font-semibold">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg">{emotion.labelId}</h4>
                      <p className="text-xs text-[#737373]">
                        Kemiripan tinggi dengan campuran Anda
                      </p>
                    </div>
                  </div>
                  {selectedEmotion?.id === emotion.id && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Custom Label */}
          {searchTerm && !filteredSuggestions.some(e => e.labelId.toLowerCase() === searchTerm.toLowerCase()) && (
            <Card className="p-3 sm:p-4 bg-emerald-600/10 border-emerald-500/30">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base">Label Kustom</h4>
                  <p className="text-xs sm:text-sm text-[#A3A3A3] truncate">"{searchTerm}"</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setCustomLabel(searchTerm);
                    setSelectedEmotion(null);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0 h-8 text-xs"
                >
                  Gunakan
                </Button>
              </div>
            </Card>
          )}

          {/* Selected Label Display */}
          {(selectedEmotion || customLabel) && (
            <Card className="p-3 sm:p-4 bg-[#2A2A2A] border-indigo-500/50">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-[#A3A3A3] mb-1">Label terpilih:</p>
                <p className="text-lg sm:text-xl font-bold text-indigo-400">
                  {customLabel || selectedEmotion?.labelId}
                </p>
              </div>
            </Card>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!selectedEmotion && !customLabel}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed gap-2 h-11 sm:h-12"
          >
            Lanjut ke Intervensi
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Landscape: 2-Column Layout */}
        <div className="portrait:hidden landscape:grid landscape:grid-cols-2 landscape:gap-6 landscape:items-start">
          {/* Left Column: Header + Search */}
          <div className="space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-emerald-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium">Langkah 2 dari 4</span>
              </div>
              <h1 className="text-xl font-bold">Beri Nama Campuran</h1>
              <p className="text-[#A3A3A3] text-xs">
                Pilih dari saran atau buat label sendiri
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
              <Input
                type="text"
                placeholder="Cari atau ketik label sendiri..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#737373] h-9 text-sm"
              />
            </div>

            {/* Selected Label Display */}
            {(selectedEmotion || customLabel) && (
              <Card className="p-3 bg-[#2A2A2A] border-indigo-500/50">
                <div className="text-center">
                  <p className="text-xs text-[#A3A3A3] mb-1">Label terpilih:</p>
                  <p className="text-lg font-bold text-indigo-400">
                    {customLabel || selectedEmotion?.labelId}
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Suggestions + Button */}
          <div className="space-y-4">
            {/* Suggestions */}
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-[#A3A3A3]">Saran Label:</h3>
              <div className="space-y-2">
                {filteredSuggestions.map((emotion, index) => (
                  <Card
                    key={emotion.id}
                    onClick={() => handleSelectEmotion(emotion)}
                    className={`p-3 cursor-pointer transition-all ${
                      selectedEmotion?.id === emotion.id
                        ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50'
                        : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${emotion.color}20`, border: `2px solid ${emotion.color}` }}
                        >
                          <span className="text-sm font-semibold">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{emotion.labelId}</h4>
                          <p className="text-xs text-[#737373]">
                            Kemiripan tinggi
                          </p>
                        </div>
                      </div>
                      {selectedEmotion?.id === emotion.id && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Custom Label */}
            {searchTerm && !filteredSuggestions.some(e => e.labelId.toLowerCase() === searchTerm.toLowerCase()) && (
              <Card className="p-3 bg-emerald-600/10 border-emerald-500/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm">Label Kustom</h4>
                    <p className="text-xs text-[#A3A3A3] truncate">"{searchTerm}"</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setCustomLabel(searchTerm);
                      setSelectedEmotion(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0 h-8 text-xs"
                  >
                    Gunakan
                  </Button>
                </div>
              </Card>
            )}

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!selectedEmotion && !customLabel}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed gap-2 h-9"
            >
              Lanjut ke Intervensi
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}