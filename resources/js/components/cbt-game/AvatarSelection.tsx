"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AVATARS, Avatar as AvatarType } from "@/lib/cbt-game-data";
import { Sword, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface AvatarSelectionProps {
  onSelect: (avatar: AvatarType) => void;
}

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 w-full max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Hero</h2>
        <p className="text-muted-foreground">Select an avatar to embark on your journey of mental resilience.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {AVATARS.map((avatar) => {
          const Icon = avatar.class === 'Warrior' ? Sword : avatar.class === 'Mage' ? Sparkles : Heart;
          return (
            <motion.div
              key={avatar.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h/full"
            >
              <Card className="h/full cursor-pointer hover:border-primary/50 transition-colors border-2" onClick={() => onSelect(avatar)}>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle>{avatar.name}</CardTitle>
                  <CardDescription>{avatar.class}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {avatar.class === 'Warrior' && "Specializes in directly challenging negative thoughts."}
                    {avatar.class === 'Mage' && "Uses wisdom to uncover the truth behind distortions."}
                    {avatar.class === 'Healer' && "Focuses on self-compassion and emotional regulation."}
                  </p>
                  <Button className="w/full">Select</Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarSelection;