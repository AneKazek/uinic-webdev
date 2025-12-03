"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Trophy,
  Flame,
  ShoppingCart,
  UserRound,
  Menu,
  Sparkles,
  Star,
  TrendingUp,
  Calendar,
  Activity,
  Heart,
  Smile,
  Target,
  Award,
  Zap,
  Clock,
  ChevronRight,
  Play,
  MessageCircle,
  Pen,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { mentoring, leaderboard, missions, shop, profile } from "@/routes";
import { journal } from "@/routes";
import DashboardTopNav from "@/components/dashboard-top-nav";
import { useAppearance } from "@/hooks/use-appearance";
import { supabase } from "@/lib/supabaseClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

type SharedProps = {
  auth: {
    user: { id: number; name: string; email: string } | null;
  };
};

function ymd(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getJakartaRemainingSeconds() {
  const parts = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value || 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value || 0);
  const s = Number(parts.find((p) => p.type === "second")?.value || 0);
  const elapsed = h * 3600 + m * 60 + s;
  return Math.max(0, 24 * 3600 - elapsed);
}

export default function Dashboard() {
  const { auth } = usePage<SharedProps>().props;
  const name = auth?.user?.name ?? "Player";
  const { updateAppearance } = useAppearance();

  const [currentStreak, setCurrentStreak] = useState(3);
  const [stats, setStats] = useState({ totalPoints: 245, level: 5, badges: 12 });
  const [timeRemaining, setTimeRemaining] = useState(getJakartaRemainingSeconds());
  const [friendEmail, setFriendEmail] = useState("");
  const [inviteSuccessOpen, setInviteSuccessOpen] = useState(false);
  const [inviteSentEmail, setInviteSentEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getJakartaRemainingSeconds());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Force light theme for this page to match the reference design
  useEffect(() => {
    updateAppearance("light");
  }, [updateAppearance]);

  

  const DAILY_GOAL_XP = 10;
  const [dailyXP, setDailyXP] = useState(0);
  const [missionsTotal, setMissionsTotal] = useState(0);
  const [missionsCompleted, setMissionsCompleted] = useState(0);
  const [isMoodOpen, setMoodOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const dailyPct = useMemo(
    () => Math.min(100, Math.round((dailyXP / DAILY_GOAL_XP) * 100)),
    [dailyXP]
  );
  const missionsPct = useMemo(
    () => (missionsTotal > 0 ? Math.round((missionsCompleted / missionsTotal) * 100) : 0),
    [missionsTotal, missionsCompleted]
  );

  useEffect(() => {
    if (loadError) toast.error(loadError);
  }, [loadError]);

  const quickActions = [
    { icon: Brain, label: "Belajar", color: "bg-purple-500", href: mentoring().url, active: true },
    { icon: Trophy, label: "Skor", color: "bg-yellow-500", href: leaderboard().url },
    { icon: Target, label: "Misi", color: "bg-blue-500", href: missions().url },
    { icon: ShoppingCart, label: "Toko", color: "bg-green-500", href: shop().url },
    { icon: UserRound, label: "Profil", color: "bg-pink-500", href: profile().url },
    { icon: Award, label: "Lainnya", color: "bg-gray-500", href: "/" },
  ] as const;

  const achievements = [
    { icon: Flame, label: "Streak", value: `${currentStreak} hari`, color: "text-orange-500" },
    { icon: Star, label: "Level", value: stats.level, color: "text-yellow-500" },
    { icon: Zap, label: "XP", value: stats.totalPoints, color: "text-purple-500" },
    { icon: Award, label: "Badge", value: String(stats.badges), color: "text-blue-500" },
  ] as const;

  const [streak, setStreak] = useState<number>(0);
  const [moodHistory, setMoodHistory] = useState<Record<string, { emoji: string; label?: string }>>({});
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [weeklyCompletedLessons, setWeeklyCompletedLessons] = useState(0);
  const [weeklyTotalLessons, setWeeklyTotalLessons] = useState(3);

  const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const currentMonthLabel = currentMonthDate.toLocaleString("id-ID", { month: "long", year: "numeric" });

  const [isDetailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detailStats, setDetailStats] = useState({
    totalXP: 0,
    xpToday: 0,
    level: 0,
    badges: 0,
    missionsCompleted: 0,
    missionsTotal: 0,
    weeklyCompleted: 0,
    weeklyTotal: 0,
    streakDays: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoadError(null);
      setLoading(true);
      const userId = auth?.user?.id;
      if (!userId) return;
      const isSupabaseConfigured = Boolean(
        (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) &&
        (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)
      );
      if (!isSupabaseConfigured) return;
      try {
        const { data: moods } = await supabase
          .from("mood_logs")
          .select("date,created_at,mood,label")
          .eq("user_id", userId)
          .order("created_at", { ascending: true });
      const map: Record<string, { emoji: string; label?: string }> = {};
      if (Array.isArray(moods)) {
        for (const log of moods) {
          const key = typeof log.date === "string" && log.date.length >= 10
            ? log.date
            : (()=>{ const d = new Date(log.created_at); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` })();
          map[key] = { emoji: log.mood as string, label: (log.label as string | undefined) };
        }
      }
      setMoodHistory(map);
      const s = (() => {
        let c = 0;
        let date = new Date();
        while (true) {
          const key = ymd(date);
          if (map[key]) {
            c++;
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
          } else {
            break;
          }
        }
        return c;
      })();
      setStreak(s);
      setCurrentStreak(s);
      } catch (e) {
        setLoadError("Gagal memuat mood");
      }
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      try {
        const { data: xpToday } = await supabase
          .from("xp_events")
          .select("points,created_at")
          .eq("user_id", userId)
          .gte("created_at", start.toISOString());
        const sum = Array.isArray(xpToday) ? xpToday.reduce((acc, e) => acc + (e.points || 0), 0) : 0;
        setDailyXP(sum);
      } catch {}

      try {
        const { data: agg } = await supabase
          .from("dashboard_user_stats")
          .select("level,total_points,badges_count")
          .eq("user_id", userId)
          .limit(1);
        const row = Array.isArray(agg) ? agg[0] : null;
        if (row) setStats({ level: row.level ?? stats.level, totalPoints: row.total_points ?? stats.totalPoints, badges: row.badges_count ?? stats.badges });
      } catch {}

      try {
        const { data: missions } = await supabase
          .from("user_daily_missions")
          .select("computed_progress,target_total")
          .eq("user_id", userId);
        const list = Array.isArray(missions) ? missions : [];
        const total = list.length;
        const done = list.filter((m: any) => (Number(m.computed_progress) || 0) >= Number(m.target_total)).length;
        setMissionsTotal(total);
        setMissionsCompleted(done);
      } catch {}
      try {
        const { data: comps } = await supabase
          .from("level_completions")
          .select("level_id,stars")
          .eq("user_id", userId);
        const list = Array.isArray(comps) ? comps : [];
        const completed = list.filter((r: any) => Number(r.stars || 0) > 0).length;
        setWeeklyCompletedLessons(completed);
        setWeeklyTotalLessons(3);
      } catch {}
      setLoading(false);
    };
    loadDashboardData();
  }, [auth?.user?.id]);

  async function saveMoodQuick() {
    const userId = auth?.user?.id;
    if (!userId) return;
    const isSupabaseConfigured = Boolean(
      (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) &&
      (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)
    );
    if (!isSupabaseConfigured) return;
    const now = new Date();
    const today = ymd(now);
    const mood = selectedMood || "🙂";
    const label = note || "";
    const hadMoodBefore = !!moodHistory[today];
    let existingRows: any[] | null = null;
    try {
      const res = await supabase
        .from("mood_logs")
        .select("id")
        .eq("user_id", userId)
        .eq("date", today)
        .limit(1);
      existingRows = res.data as any[] | null;
    } catch {
      existingRows = null;
    }
    const existingId = existingRows?.[0]?.id as number | undefined;
    try {
      if (existingId) {
        await supabase
          .from("mood_logs")
          .update({ mood, label, updated_at: now.toISOString() })
          .eq("id", existingId);
      } else {
        await supabase
          .from("mood_logs")
          .insert({ user_id: userId, date: today, created_at: now.toISOString(), mood, label });
      }
    } catch {
      toast.error("Gagal mencatat mood");
      return;
    }
    setMoodHistory((prev) => ({ ...prev, [today]: { emoji: mood, label } }));
    if (!hadMoodBefore) {
      try {
        await supabase.from("user_xp_events").insert({ user_id: userId, amount: 2, source: "mood_quick", occurred_at: now.toISOString(), created_at: now.toISOString() });
      } catch {}
      setDailyXP((v) => v + 2);
      setStreak((s) => s + 1);
    }
    setMoodOpen(false);
    setSelectedMood("");
    setNote("");
    toast.success(hadMoodBefore ? "Mood diperbarui" : "Mood dicatat");
  }

  async function addDailyXP(points: number) {
    const userId = auth?.user?.id;
    if (!userId) return;
    const isSupabaseConfigured = Boolean(
      (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) &&
      (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)
    );
    if (!isSupabaseConfigured) return;
    const now = new Date();
    try {
      await supabase.from("user_xp_events").insert({ user_id: userId, amount: points, source: "daily_task", occurred_at: now.toISOString(), created_at: now.toISOString() });
    } catch {}
    setDailyXP((v) => Math.min(DAILY_GOAL_XP, v + points));
  }

  function prevMoodHasToday(prev: Record<string, { emoji: string; label?: string }>) {
    return !!prev[ymd(new Date())];
  }

  const calendarDays = (() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const leading = (firstDay + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days: Array<{ day: number | null; highlighted: boolean; emoji?: string }> = [];
    for (let i = 0; i < leading; i++) days.push({ day: null, highlighted: false, emoji: undefined });
    for (let d = 1; d <= totalDays; d++) {
      const date = ymd(new Date(year, month, d));
      const entry = moodHistory[date];
      const hasMood = !!entry;
      days.push({ day: d, highlighted: hasMood, emoji: entry?.emoji });
    }
    return days;
  })();

  const handleInviteFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendEmail) return;
    const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
    try {
      const targetEmail = friendEmail;
      const res = await fetch(route('invites.store'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
        body: JSON.stringify({ email: targetEmail }),
      });
      const json = await res.json().catch(() => ({}));
      setFriendEmail('');
      if (json?.ok) {
        toast.success('Undangan dikirim');
        setInviteSentEmail(targetEmail);
        setInviteSuccessOpen(true);
      } else {
        toast.error('Gagal mengirim undangan');
      }
    } catch {
      toast.error('Gagal mengirim undangan');
    }
  };

  async function loadDetailData() {
    const userId = auth?.user?.id;
    setDetailError(null);
    setDetailLoading(true);
    if (!userId) {
      setDetailLoading(false);
      return;
    }
    const isSupabaseConfigured = Boolean(
      (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) &&
      (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)
    );
    if (!isSupabaseConfigured) {
      setDetailError("Konfigurasi database belum tersedia");
      setDetailStats({
        totalXP: stats.totalPoints,
        xpToday: dailyXP,
        level: stats.level,
        badges: stats.badges,
        missionsCompleted,
        missionsTotal,
        weeklyCompleted: weeklyCompletedLessons,
        weeklyTotal: weeklyTotalLessons,
        streakDays: streak,
      });
      setDetailLoading(false);
      return;
    }
    let totalXP = stats.totalPoints;
    let level = stats.level;
    let badges = stats.badges;
    let missionsC = missionsCompleted;
    let missionsT = missionsTotal;
    let weeklyC = weeklyCompletedLessons;
    let weeklyT = weeklyTotalLessons;
    let xpToday = dailyXP;
    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const { data: xpRows } = await supabase
        .from("xp_events")
        .select("points,created_at")
        .eq("user_id", userId)
        .gte("created_at", start.toISOString());
      xpToday = Array.isArray(xpRows) ? xpRows.reduce((acc: number, e: any) => acc + (e.points || 0), 0) : xpToday;
    } catch {}
    try {
      const { data: agg } = await supabase
        .from("dashboard_user_stats")
        .select("level,total_points,badges_count")
        .eq("user_id", userId)
        .limit(1);
      const row = Array.isArray(agg) ? agg[0] : null;
      if (row) {
        level = row.level ?? level;
        totalXP = row.total_points ?? totalXP;
        badges = row.badges_count ?? badges;
      }
    } catch {}
    try {
      const { data: missions } = await supabase
        .from("user_daily_missions")
        .select("computed_progress,target_total")
        .eq("user_id", userId);
      const list = Array.isArray(missions) ? missions : [];
      missionsT = list.length;
      missionsC = list.filter((m: any) => (Number(m.computed_progress) || 0) >= Number(m.target_total)).length;
    } catch {}
    try {
      const { data: comps } = await supabase
        .from("level_completions")
        .select("level_id,stars")
        .eq("user_id", userId);
      const list = Array.isArray(comps) ? comps : [];
      weeklyC = list.filter((r: any) => Number(r.stars || 0) > 0).length;
      weeklyT = 3;
    } catch {}
    setDetailStats({
      totalXP,
      xpToday,
      level,
      badges,
      missionsCompleted: missionsC,
      missionsTotal: missionsT,
      weeklyCompleted: weeklyC,
      weeklyTotal: weeklyT,
      streakDays: streak,
    });
    setDetailLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Head title="Dashboard" />

      <DashboardTopNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-800/30 rounded-full blur-2xl -ml-24 -mb-24" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Smile className="w-6 h-6 text-yellow-300" />
                      <span className="text-yellow-300 text-sm font-semibold">Howdy @{name}! How are you feeling?</span>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Halo, {name}! 👋</h2>
                    <p className="text-purple-100 text-sm">Bagaimana perasaanmu hari ini? Mari lanjutkan perjalanan mentalmu.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                      <div className="text-2xl font-black text-white">{item.value}</div>
                      <div className="text-xs text-purple-100">{item.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
              <div className="h-2 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400" />
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/30 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200/30 rounded-full blur-2xl" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 mb-3 font-bold">🌱 PERJALANAN HARIAN</Badge>
                      <h3 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-2">
                        <Heart className="w-7 h-7 text-rose-500" />
                        Kesehatan Mental Journey
                      </h3>
                      <p className="text-sm text-gray-700 font-medium">Latihan berikutnya: <span className="font-bold text-teal-700">Meditasi Pernapasan 5 Menit</span></p>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white border-0 flex items-center gap-1.5 px-4 py-2 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-bold">Level {stats.level}</span>
                    </Badge>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-teal-600" />
                      <span className="text-sm font-bold text-gray-700">Progress Minggu Ini</span>
                    </div>
                    <span className="text-2xl font-black bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                      {weeklyTotalLessons > 0 ? Math.round((weeklyCompletedLessons / weeklyTotalLessons) * 100) : 0}%
                    </span>
                  </div>

                  <div className="relative">
                    <Progress value={weeklyTotalLessons > 0 ? Math.round((weeklyCompletedLessons / weeklyTotalLessons) * 100) : 0} className="h-4 mb-2" />
                    <div className="flex items-center justify-between text-xs text-gray-600 font-semibold">
                      <span>{weeklyCompletedLessons} dari {weeklyTotalLessons} latihan selesai</span>
                      <span className="text-teal-700">+{Math.max(0, weeklyTotalLessons - weeklyCompletedLessons)} latihan lagi!</span>
                    </div>
                  </div>

                  

                  <div className="flex gap-3 mt-3">
                    <Link href={mentoring().url} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 hover:from-teal-700 hover:via-green-700 hover:to-emerald-700 text-white font-bold shadow-lg h-12 text-base group-hover:scale-[1.02] transition-transform">
                        <Play className="w-5 h-5 mr-2" /> Mulai Latihan
                      </Button>
                    </Link>
                    <Dialog open={isDetailOpen} onOpenChange={(o)=>{ setDetailOpen(o); if(o) loadDetailData(); }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-2 border-teal-300 text-teal-700 hover:bg-teal-50 font-bold h-12 px-6"
                          onClick={() => { setDetailOpen(true); }}
                        >
                          <Activity className="w-4 h-4 mr-2" /> Lihat Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center justify-between">
                            <span>Ringkasan Pelatihan</span>
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">Level {detailStats.level}</Badge>
                          </DialogTitle>
                        </DialogHeader>
                        {detailLoading ? (
                          <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                          </div>
                        ) : detailError ? (
                          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{detailError}</div>
                        ) : (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <Card className="bg-gradient-to-br from-teal-50 to-green-50">
                                <CardContent className="p-4">
                                  <div className="text-xs font-semibold text-teal-700">XP Hari Ini</div>
                                  <div className="text-2xl font-black text-teal-900">{detailStats.xpToday}</div>
                                </CardContent>
                              </Card>
                              <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                                <CardContent className="p-4">
                                  <div className="text-xs font-semibold text-purple-700">Total XP</div>
                                  <div className="text-2xl font-black text-purple-900">{detailStats.totalXP}</div>
                                </CardContent>
                              </Card>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                                <CardContent className="p-4">
                                  <div className="text-xs font-semibold text-blue-700">Badges</div>
                                  <div className="text-2xl font-black text-blue-900">{detailStats.badges}</div>
                                </CardContent>
                              </Card>
                              <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
                                <CardContent className="p-4">
                                  <div className="text-xs font-semibold text-orange-700">Streak Mood</div>
                                  <div className="text-2xl font-black text-orange-900">{detailStats.streakDays} hari</div>
                                </CardContent>
                              </Card>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold text-gray-700">Misi Harian</span>
                                <span className="text-xs text-gray-600">{detailStats.missionsCompleted} / {detailStats.missionsTotal}</span>
                              </div>
                              <Progress value={detailStats.missionsTotal>0?Math.round((detailStats.missionsCompleted/detailStats.missionsTotal)*100):0} className="h-3" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold text-gray-700">Kemajuan Minggu Ini</span>
                                <span className="text-xs text-gray-600">{detailStats.weeklyCompleted} / {detailStats.weeklyTotal}</span>
                              </div>
                              <Progress value={detailStats.weeklyTotal>0?Math.round((detailStats.weeklyCompleted/detailStats.weeklyTotal)*100):0} className="h-3" />
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Jelajahi Lebih Banyak</h3>
                <p className="text-sm text-gray-600">Temukan aktivitas menarik untuk pengembangan dirimu</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[{ title: "Daily Journaling", description: "Tulis refleksi harianmu dan pantau mood serta tujuan.", icon: Pen, gradient: "from-amber-400 via-orange-500 to-amber-500", href: journal().url }, { title: "Teman Cerita AI", description: "Tempat aman untuk berbagi pikiran dan perasaanmu.", icon: MessageCircle, gradient: "from-pink-400 via-rose-500 to-pink-500", href: "/mental-health-chat" }].map((card, idx) => (
                  <div key={idx} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`} />
                    <Card className="relative border-2 border-gray-100 hover:border-transparent overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                            <card.icon className="w-7 h-7 text-white" />
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl animate-ping opacity-0 group-hover:opacity-30`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-black text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">{card.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">Gratis</Badge>
                              <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50">Populer</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-5">{card.description}</p>
                        <Link href={card.href} className="contents">
                          <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-purple-600 hover:to-pink-600 text-white font-semibold group/btn h-11 transition-all duration-300">
                            <span>Mulai Sekarang</span>
                            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-yellow-100 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Buka Papan Skor!</h3>
                    <p className="text-sm text-gray-600 mb-3">Selesaikan 10 pelajaran lagi untuk mulai berkompetisi</p>
                  </div>
                </div>
                <Link href={mentoring().url}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">Mulai Pelajaran</Button>
                </Link>
                <p className="text-center text-sm font-semibold text-purple-700 mt-2">Dapatkan 10 XP</p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-900">Misi Harian</h3>
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {`${Math.floor(timeRemaining / 3600)} JAM ${Math.floor((timeRemaining % 3600) / 60)} MENIT`}
                  </Badge>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-purple-900">{missionsCompleted} / {missionsTotal}</span>
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <Progress value={missionsPct} className="h-3 mb-2" />
                  <p className="text-sm text-purple-700 font-semibold">Selesaikan {Math.max(0, missionsTotal - missionsCompleted)} misi lagi hari ini</p>
                </div>
                <Link href={missions().url} className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">Kerjakan</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Mood Tracker</h3>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-0">Buka</Badge>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 mb-4 border border-orange-200">
                  <div className="flex items-center justify-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <p className="text-sm font-semibold text-gray-700">Streak: <span className="text-orange-600">{streak} hari berturut-turut</span></p>
                  </div>
                </div>
                <Dialog open={isMoodOpen} onOpenChange={setMoodOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold">
                      <Smile className="w-4 h-4 mr-2" />
                      Catat Mood Hari Ini
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Pilih Mood Hari Ini</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-5 gap-2">
                      {["😡","😟","😐","🙂","😄"].map((m) => (
                        <button key={m} onClick={() => setSelectedMood(m)} className={`aspect-square rounded-xl border ${selectedMood===m?"border-purple-600 bg-purple-50":"border-gray-200 hover:bg-gray-50"} text-2xl flex items-center justify-center`}>{m}</button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Catatan singkat (opsional)" className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" rows={3} />
                    </div>
                    <div className="mt-4">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={saveMoodQuick} disabled={!selectedMood}>Simpan</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setCurrentMonthDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>
                    <ChevronRight className="w-4 h-4 text-gray-600 rotate-180" />
                  </button>
                  <h3 className="font-bold text-gray-900">{currentMonthLabel}</h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setCurrentMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="text-center text-xs font-semibold text-gray-500">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((item, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square flex items-center justify-center text-sm font-semibold rounded-lg transition-all ${
                          item.day === null
                            ? "invisible"
                            : item.highlighted
                            ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                        }`}
                      >
                        {item.highlighted && item.emoji ? (
                          <span className="text-xl">{item.emoji}</span>
                        ) : (
                          item.day
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-1">🧠</div>
                  <div className="text-white font-black text-xl">💚</div>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Ajak Teman!</h2>
              <p className="text-gray-300 text-base mb-5 leading-relaxed">Sedang seru? Bagikan kebahagiaan dengan teman! 🎉<br />Masukkan email dan kami akan kirimkan undangan personal. 📧</p>
              <form onSubmit={handleInviteFriend} className="flex flex-col sm:flex-row gap-3">
                <Input type="email" placeholder="Email temanmu" value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} className="flex-1 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 text-base" required />
                <Button type="submit" className="h-12 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-gray-900 font-black text-base shadow-lg hover:shadow-xl transition-all">
                  Kirim Undangan
                </Button>
              </form>
              <Dialog open={inviteSuccessOpen} onOpenChange={setInviteSuccessOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Undangan Terkirim</DialogTitle>
                    <DialogDescription>
                      Kami telah mengirim undangan ke {inviteSentEmail}. Minta temanmu cek emailnya.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setInviteSuccessOpen(false)}>Oke</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
