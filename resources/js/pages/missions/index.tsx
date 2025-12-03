"use client";

import { Head, Link, usePage } from "@inertiajs/react";
import DashboardTopNav from "@/components/dashboard-top-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mentoring, leaderboard as leaderboardRoute, missions as missionsRoute, shop, profile } from "@/routes";
import { useAppearance } from "@/hooks/use-appearance";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import {
  Trophy,
  Target,
  Star,
  Flame,
  CheckCircle2,
  ShoppingCart,
  User,
  MoreHorizontal,
  Award,
  Zap,
  Clock,
  Calendar,
} from "lucide-react";

type SharedProps = {
  auth: { user: { id: number; name: string; email: string } | null };
};

export default function MissionsPage() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");
  const { updateAppearance } = useAppearance();
  const { auth } = usePage<SharedProps>().props;
  const name = auth?.user?.name ?? "Player";
  const userId = auth?.user?.id ?? null;
  const [dailyMissions, setDailyMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateAppearance("light");
  }, [updateAppearance]);

  useEffect(() => {
    const isSupabaseConfigured = Boolean(
      (import.meta as any).env.VITE_SUPABASE_URL || (import.meta as any).env.SUPABASE_URL
    );
    if (!userId || !isSupabaseConfigured) return;
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("user_daily_missions")
        .select("mission_id,slug,title,description,icon,icon_bg,target_total,xp_reward,order_index,computed_progress,completed_at,user_id")
        .eq("user_id", userId)
        .order("order_index", { ascending: true });
      setDailyMissions(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    load();
  }, [userId]);

  return (
    <div className="missions-ref-theme antialiased min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Head title="Missions" />

      <DashboardTopNav />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Misi Kamu</h1>
          <p className="text-gray-600">Selesaikan misi untuk mendapatkan XP dan naik level</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("daily")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "daily"
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Clock className="w-4 h-4" />
            Misi Harian
            {activeTab === "daily" && (
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-0">
                4
              </Badge>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "weekly"
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Misi Mingguan
            {activeTab === "weekly" && (
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-0">
                2
              </Badge>
            )}
          </button>
        </div>

        {/* Daily Missions */}
        {activeTab === "daily" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Misi Harian</h2>
              <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
                <Clock className="w-3 h-3 mr-1" />
                Reset dalam 6 jam
              </Badge>
            </div>

            {loading && (
              <div className="space-y-3">
                <div className="h-24 rounded-xl bg-gray-100 animate-pulse" />
                <div className="h-24 rounded-xl bg-gray-100 animate-pulse" />
              </div>
            )}
            {!loading && dailyMissions.map((m, idx) => (
              <MissionCard
                key={`${m.slug}-${idx}`}
                title={m.title}
                description={m.description}
                icon={m.icon}
                iconBg={m.icon_bg}
                progress={Number(m.computed_progress) || 0}
                total={Number(m.target_total)}
                xp={Number(m.xp_reward)}
                isCompleted={(Number(m.computed_progress) || 0) >= Number(m.target_total) || !!m.completed_at}
                delay={0.1 + idx * 0.1}
                onSolve={async () => {
                  if (!userId) return;
                  const today = new Date();
                  const period_key = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
                  const next = (Number(m.computed_progress) || 0) + 1;
                  const { data: up } = await supabase.from("user_mission_progress").upsert({
                    user_id: userId,
                    mission_id: m.mission_id,
                    period_key,
                    progress: next,
                    updated_at: new Date().toISOString(),
                    completed_at: next >= Number(m.target_total) ? new Date().toISOString() : null,
                  }, { onConflict: "user_id,mission_id,period_key" });
                  if (up) toast.success("Misi diperbarui");
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Weekly Missions */}
        {activeTab === "weekly" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Misi Mingguan</h2>
              <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                <Calendar className="w-3 h-3 mr-1" />
                Reset dalam 3 hari
              </Badge>
            </div>

            <MissionCard
              title="Juara Mingguan"
              description="Complete 50 missions this week"
              icon="🏆"
              iconBg="from-amber-400 to-yellow-500"
              progress={32}
              total={50}
              xp={500}
              delay={0.1}
            />
            
            <MissionCard
              title="Master Class"
              description="Get grade A in 10 different lessons"
              icon="👑"
              iconBg="from-indigo-400 to-purple-600"
              progress={6}
              total={10}
              xp={750}
              delay={0.2}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function NavTab({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
        active
          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

interface MissionCardProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  progress: number;
  total: number;
  xp: number;
  isCompleted?: boolean;
  delay: number;
  onSolve?: () => Promise<void> | void;
}

function MissionCard({
  title,
  description,
  icon,
  iconBg,
  progress,
  total,
  xp,
  isCompleted = false,
  delay,
  onSolve,
}: MissionCardProps) {
  const percentage = useMemo(() => (progress / total) * 100, [progress, total]);
  const [hidden, setHidden] = useState(false);
  const completeNow = isCompleted && !hidden;
  useEffect(() => {
    if (completeNow) {
      const t = setTimeout(() => setHidden(true), 2000);
      return () => clearTimeout(t);
    }
  }, [completeNow]);
  if (hidden) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card
        className={`border-0 shadow-md hover:shadow-xl transition-all cursor-pointer ${
          isCompleted ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500" : "bg-white hover:scale-[1.02]"
        }`}
        onClick={() => { if (onSolve && !isCompleted) onSolve(); }}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
              {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                
                {isCompleted ? (
                  <Badge className="bg-green-500 hover:bg-green-500 text-white ml-3 shadow-md">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Selesai
                  </Badge>
                ) : (
                  <div className="flex items-center gap-1.5 bg-purple-100 text-purple-700 font-bold px-3 py-1.5 rounded-full ml-3">
                    <Zap className="w-4 h-4 fill-current" />
                    <span className="text-sm">+{xp} XP</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">{isCompleted && total === 1 ? "1 / 1" : `${progress} / ${total}`}</span>
                  <span className="text-sm font-semibold text-purple-600">{Math.round(isCompleted && total === 1 ? 100 : percentage)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${isCompleted && total === 1 ? 100 : percentage}%` }}
                    transition={{ duration: 1, delay: delay + 0.2 }}
                    className={`h-full rounded-full ${
                      isCompleted ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-purple-500 to-purple-600"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
