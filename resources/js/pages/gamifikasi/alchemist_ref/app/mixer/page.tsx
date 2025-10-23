"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderBar } from '@/components/HeaderBar';
import { EssenceSlider } from '@/components/EssenceSlider';
import { VAWidget } from '@/components/VAWidget';
import { NormalizeButton } from '@/components/NormalizeButton';
import { Button } from '@/components/ui/button';
import { EMOTIONS, EmotionMix, calculateMixedVA } from '@/lib/emotions';
import { Sparkles, Plus, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import * as Select from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';

export default function MixerPage() {
  const router = useRouter();
  const [selectedMixes, setSelectedMixes] = useState<EmotionMix[]>([
    { emotion: EMOTIONS[0], percentage: 50 },
    { emotion: EMOTIONS[4], percentage: 50 },
  ]);

  const totalPercentage = selectedMixes.reduce((sum, mix) => sum + mix.percentage, 0);
  const isValid = totalPercentage === 100 && selectedMixes.length >= 2 && selectedMixes.length <= 3;
  const mixedVA = calculateMixedVA(selectedMixes);

  const handlePercentageChange = (index: number, newPercentage: number) => {
    const newMixes = [...selectedMixes];
    newMixes[index].percentage = newPercentage;
    setSelectedMixes(newMixes);
  };

  const handleNormalize = () => {
    if (totalPercentage === 0) return;
    const normalized = selectedMixes.map(mix => ({
      ...mix,
      percentage: Math.round((mix.percentage / totalPercentage) * 100),
    }));
    
    // Fix rounding errors
    const newTotal = normalized.reduce((sum, mix) => sum + mix.percentage, 0);
    if (newTotal !== 100 && normalized.length > 0) {
      normalized[0].percentage += (100 - newTotal);
    }
    
    setSelectedMixes(normalized);
  };

  const handleAddEmotion = (emotionId: string) => {
    const emotion = EMOTIONS.find(e => e.id === emotionId);
    if (emotion && selectedMixes.length < 3) {
      setSelectedMixes([...selectedMixes, { emotion, percentage: 0 }]);
    }
  };

  const handleRemoveEmotion = (index: number) => {
    if (selectedMixes.length > 2) {
      const newMixes = selectedMixes.filter((_, i) => i !== index);
      setSelectedMixes(newMixes);
    }
  };

  const availableEmotions = EMOTIONS.filter(
    e => !selectedMixes.find(mix => mix.emotion.id === e.id)
  );

  const handleContinue = () => {
    sessionStorage.setItem('emotionMix', JSON.stringify({
      mixes: selectedMixes,
      valence: mixedVA.valence,
      arousal: mixedVA.arousal,
    }));
    router.push('/labels');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <HeaderBar title="Campur Emosi" />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-md sm:max-w-lg md:max-w-xl landscape:max-w-4xl">
        {/* Portrait Layout */}
        <div className="flex flex-col h-full space-y-4 sm:space-y-5 portrait:block landscape:hidden">
          {/* Header */}
          <div className="text-center space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">Langkah 1 dari 4</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">Racik Esens Emosi</h1>
            <p className="text-[#A3A3A3] text-xs sm:text-sm px-4">
              Pilih 2-3 emosi dan atur proporsinya hingga total 100%
            </p>
          </div>

          {/* VA Map */}
          <Card className="p-3 sm:p-4 bg-[#1A1A1A] border-[#2A2A2A]">
            <div className="flex justify-center">
              <VAWidget 
                valence={mixedVA.valence} 
                arousal={mixedVA.arousal}
                mixes={selectedMixes}
                size={180}
              />
            </div>
          </Card>

          {/* Sliders */}
          <Card className="p-4 sm:p-5 bg-[#1A1A1A] border-[#2A2A2A] space-y-4 sm:space-y-5">
            {selectedMixes.map((mix, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <EssenceSlider
                      emotion={mix.emotion}
                      value={mix.percentage}
                      onChange={(value) => handlePercentageChange(index, value)}
                    />
                  </div>
                  {selectedMixes.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveEmotion(index)}
                      className="ml-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Add Emotion */}
            {selectedMixes.length < 3 && availableEmotions.length > 0 && (
              <Select.Root onValueChange={handleAddEmotion}>
                <Select.Trigger className="w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#2A2A2A] hover:bg-[#333333] rounded-lg border border-[#3A3A3A] transition-colors">
                  <div className="flex items-center gap-2 text-[#A3A3A3]">
                    <Plus className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Tambah Emosi</span>
                  </div>
                  <Select.Icon>
                    <ChevronDown className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl overflow-hidden z-50">
                    <Select.Viewport className="p-1">
                      {availableEmotions.map((emotion) => (
                        <Select.Item
                          key={emotion.id}
                          value={emotion.id}
                          className="px-3 py-2 text-xs sm:text-sm rounded cursor-pointer hover:bg-[#2A2A2A] outline-none flex items-center gap-2"
                        >
                          <Select.ItemText>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full flex-shrink-0" 
                                style={{ backgroundColor: emotion.color }}
                              />
                              <span>{emotion.labelId}</span>
                            </div>
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            )}
          </Card>

          {/* Total & Controls */}
          <div className="space-y-3 sm:space-y-4 pt-2">
            <div className="flex items-center justify-between px-2 sm:px-4">
              <span className="text-sm sm:text-base text-[#A3A3A3] font-medium">Total:</span>
              <span 
                className={`text-2xl sm:text-3xl font-bold font-mono ${
                  totalPercentage === 100 ? 'text-emerald-400' : 
                  totalPercentage > 100 ? 'text-red-400' : 'text-amber-400'
                }`}
              >
                {totalPercentage}%
              </span>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <NormalizeButton 
                onClick={handleNormalize}
                disabled={totalPercentage === 0}
                className="flex-shrink-0"
              />
              <Button
                onClick={handleContinue}
                disabled={!isValid}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed gap-2 h-11 sm:h-12 text-sm sm:text-base"
              >
                Lanjut ke Label
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>

            {!isValid && (
              <p className="text-center text-xs sm:text-sm text-amber-400 px-4">
                {totalPercentage !== 100 ? 
                  `Sesuaikan total ke 100% (saat ini ${totalPercentage}%)` :
                  selectedMixes.length < 2 ? 'Minimal 2 emosi diperlukan' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Landscape Layout */}
        <div className="hidden landscape:grid landscape:grid-cols-2 landscape:gap-6 landscape:h-full landscape:items-center">
          {/* Left Column: VA Map */}
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-emerald-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium">Langkah 1 dari 4</span>
              </div>
              <h1 className="text-lg font-bold">Racik Esens Emosi</h1>
              <p className="text-[#A3A3A3] text-xs px-4">
                Pilih 2-3 emosi dan atur proporsinya hingga total 100%
              </p>
            </div>
            
            <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A]">
              <div className="flex justify-center">
                <VAWidget 
                  valence={mixedVA.valence} 
                  arousal={mixedVA.arousal}
                  mixes={selectedMixes}
                  size={160}
                />
              </div>
            </Card>

            <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
              <span className="text-sm text-[#A3A3A3] font-medium">Total:</span>
              <span 
                className={`text-2xl font-bold font-mono ${
                  totalPercentage === 100 ? 'text-emerald-400' : 
                  totalPercentage > 100 ? 'text-red-400' : 'text-amber-400'
                }`}
              >
                {totalPercentage}%
              </span>
            </div>
          </div>

          {/* Right Column: Sliders + Controls */}
          <div className="space-y-4">
            <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] space-y-4">
              {selectedMixes.map((mix, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <EssenceSlider
                        emotion={mix.emotion}
                        value={mix.percentage}
                        onChange={(value) => handlePercentageChange(index, value)}
                      />
                    </div>
                    {selectedMixes.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveEmotion(index)}
                        className="ml-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {selectedMixes.length < 3 && availableEmotions.length > 0 && (
                <Select.Root onValueChange={handleAddEmotion}>
                  <Select.Trigger className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#2A2A2A] hover:bg-[#333333] rounded-lg border border-[#3A3A3A] transition-colors">
                    <div className="flex items-center gap-2 text-[#A3A3A3]">
                      <Plus className="w-4 h-4" />
                      <span className="text-xs">Tambah Emosi</span>
                    </div>
                    <Select.Icon>
                      <ChevronDown className="w-4 h-4" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl overflow-hidden z-50">
                      <Select.Viewport className="p-1">
                        {availableEmotions.map((emotion) => (
                          <Select.Item
                            key={emotion.id}
                            value={emotion.id}
                            className="px-3 py-2 text-xs rounded cursor-pointer hover:bg-[#2A2A2A] outline-none flex items-center gap-2"
                          >
                            <Select.ItemText>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full flex-shrink-0" 
                                  style={{ backgroundColor: emotion.color }}
                                />
                                <span>{emotion.labelId}</span>
                              </div>
                            </Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              )}
            </Card>

            <div className="flex gap-2">
              <NormalizeButton onClick={handleNormalize} disabled={totalPercentage === 0} />
              <Button
                onClick={handleContinue}
                disabled={!isValid}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed gap-2 h-10 text-sm"
              >
                Lanjut ke Label
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}