"use client";

import React, { Suspense, lazy, useState } from "react";
import LevelLayout from "./LevelLayout";
import { supabase } from "@/lib/supabaseClient";
import { usePage } from "@inertiajs/react";
import { getCompletion } from "./useLevelState";

const CBTGameContainer = lazy(() => import("@/components/cbt-game/CBTGameContainer"));

export default function Level3() {
  const { auth } = usePage<any>().props;
  const levelId = 3;
  const [reportedComplete, setReportedComplete] = useState(false);

  async function onComplete(payload: { score: number; health: number }) {
    if (reportedComplete) return;
    const userId = auth?.user?.id;
    if (!userId) return;
    const isConfigured = Boolean((import.meta as any).env.VITE_SUPABASE_URL || (import.meta as any).env.SUPABASE_URL);
    if (!isConfigured) return;
    const stars = payload.score >= 90 ? 3 : payload.score >= 60 ? 2 : 1;
    const xp = 75;
    const now = new Date().toISOString();
    const existing = await getCompletion(userId, levelId);
    if (!existing) {
      await supabase.from("level_completions").upsert({ user_id: userId, level_id: levelId, stars, xp_awarded: xp, completed_at: now }, { onConflict: "user_id,level_id" });
      await supabase.from("xp_events").insert({ user_id: userId, points: xp, type: "level_complete", created_at: now });
    } else {
      const prevStars = Number(existing.stars || 0);
      const prevXp = Number((existing as any).xp_awarded || 0);
      if (stars > prevStars) await supabase.from("level_completions").update({ stars }).eq("user_id", userId).eq("level_id", levelId);
      if (!prevXp || prevXp <= 0) {
        await supabase.from("level_completions").update({ xp_awarded: xp, completed_at: existing.completed_at ?? now }).eq("user_id", userId).eq("level_id", levelId);
        await supabase.from("xp_events").insert({ user_id: userId, points: xp, type: "level_complete", created_at: now });
      }
    }
    setReportedComplete(true);
  }

  return (
    <LevelLayout title="Level 3 · CBT Game">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-24 text-center text-muted-foreground">Memuat permainan…</div>}>
          <CBTGameContainer onComplete={onComplete as any} />
        </Suspense>
      </div>
    </LevelLayout>
  );
}
