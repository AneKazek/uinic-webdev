"use client";

import React, { useState } from 'react';
import { Level, Choice } from "@/lib/cbt-game-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, HeartPulse, BrainCircuit } from "lucide-react";

interface BattleEncounterProps {
  level: Level;
  onChoiceSelected: (choice: Choice) => void;
  onNextLevel: () => void;
  currentHealth: number;
  maxHealth: number;
  isLevelComplete: boolean;
  feedback: string | null;
  healthChange: number | null;
}

const BattleEncounter: React.FC<BattleEncounterProps> = ({
  level,
  onChoiceSelected,
  onNextLevel,
  currentHealth,
  maxHealth,
  isLevelComplete,
  feedback,
  healthChange
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const handleChoice = (choice: Choice) => {
    if (isLevelComplete) return;
    setSelectedChoiceId(choice.id);
    onChoiceSelected(choice);
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 min-h-[600px]">
      <div className="relative flex flex-col items-center justify-center rounded-xl overflow-hidden bg-black/80 border-2 border-zinc-800 shadow-2xl aspect-video lg:aspect-auto lg:h/full">
        <div 
          className="absolute inset-0 z-0 opacity-50"
          style={{ 
            backgroundImage: `url(${level.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center text-center p-6"
        >
          <div className="relative">
             <div className="absolute -inset-4 bg-red-500/20 blur-2xl rounded-full animate-pulse" />
             <img 
               src={level.monster.image} 
               alt={level.monster.name} 
               loading="lazy"
               className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl relative z-10"
             />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-white drop-shadow-md">{level.monster.name}</h3>
          <p className="text-red-200 font-medium tracking-wide">{level.monster.negativeThoughtType}</p>
        </motion.div>
        <div className="absolute top-4 left-4 z-20 w-48 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <HeartPulse className="w-3 h-3 text-red-500" /> HP
            </span>
            <span className="text-xs text-white">{currentHealth}/{maxHealth}</span>
          </div>
          <Progress value={(currentHealth / maxHealth) * 100} className="h-2 bg-red-950" indicatorClassName="bg-red-500" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 h/full">
        <Card className="flex-1 border-2 shadow-lg flex flex-col overflow-hidden">
          <CardHeader className="bg-muted/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              Encounter
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground italic">{level.introDialogue}</p>
            </div>
            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-md my-4">
              <h4 className="font-semibold text-destructive mb-1 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4" />
                The Negative Thought:
              </h4>
              <p className="text-lg font-medium italic">"{level.playerThought}"</p>
            </div>
            <AnimatePresence mode="wait">
              {isLevelComplete && feedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-lg border ${
                    healthChange && healthChange > 0 
                      ? 'bg-green-500/10 border-green-500/50 text-green-800 dark:text-green-200' 
                      : healthChange && healthChange < 0 
                        ? 'bg-red-500/10 border-red-500/50 text-red-800 dark:text-red-200'
                        : 'bg-blue-500/10 border-blue-500/50 text-blue-800 dark:text-blue-200'
                  }`}
                >
                  <p className="font-medium">{feedback}</p>
                  {healthChange !== 0 && (
                    <p className="text-sm mt-1 font-bold">
                      {healthChange && healthChange > 0 ? `+${healthChange} Health restored!` : `${healthChange} Health lost!`}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="p-4 bg-muted/30 border-t flex flex-col gap-3">
            {!isLevelComplete ? (
               <div className="w/full grid gap-3">
                 <p className="text-sm font-semibold text-muted-foreground mb-1">Choose your response:</p>
                 {level.choices.map((choice) => (
                   <Button
                     key={choice.id}
                     variant={selectedChoiceId === choice.id ? "default" : "outline"}
                     className={`w/full justify-start text-left h-auto py-3 px-4 whitespace-normal ${
                       selectedChoiceId === choice.id ? 'ring-2 ring-offset-2' : ''
                     }`}
                     onClick={() => handleChoice(choice)}
                   >
                     {choice.text}
                   </Button>
                 ))}
               </div>
            ) : (
              <Button size="lg" onClick={onNextLevel} className="w/full animate-in fade-in zoom-in duration-300">
                Continue Journey
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BattleEncounter;