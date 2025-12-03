import { useState, useEffect } from "react";
import DashboardTopNav from "@/components/dashboard-top-nav";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Lock, Trophy, Sparkles, Heart, Brain, Sun, Moon, Wind, Zap, CheckCircle2, Target, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { supabase } from "@/lib/supabaseClient";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Level {
  id: number;
  title: string;
  description: string;
  icon: any;
  status: "locked" | "current" | "completed";
  stars: number;
  maxStars: 3;
  xpReward: number;
}

const iconMap: Record<string, any> = {
  heart: Heart,
  brain: Brain,
  sun: Sun,
  moon: Moon,
  wind: Wind,
  trophy: Trophy,
  sparkles: Sparkles,
  target: Target,
  award: Award,
  trendingUp: TrendingUp,
};

// moved inside component

export default function MentoringPage() {
  const { auth } = usePage<any>().props;
  const [levels, setLevelState] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);

  const totalXP = levels.reduce((sum: number, level: Level) => (level.status === "completed" ? sum + level.xpReward : sum), 0);
  const completedLevels = levels.filter((l: Level) => l.status === "completed").length;
  const progressPercentage = (completedLevels / levels.length) * 100;

  const achievementTimeoutRef = { current: 0 as any }

  const handleLevelClick = (level: Level) => {
    if (level.status !== "locked") {
      setSelectedLevel(level);
      if (level.status === "completed" && level.stars === 3) {
        setShowAchievement(true);
        if (achievementTimeoutRef.current) clearTimeout(achievementTimeoutRef.current)
        achievementTimeoutRef.current = setTimeout(() => setShowAchievement(false), 3000)
      }
    }
  };

  const positions = [
    { top: 50, left: 50 },
    { top: 200, left: 30 },
    { top: 350, left: 50 },
    { top: 500, left: 70 },
    { top: 650, left: 50 },
    { top: 800, left: 30 },
  ];

  useEffect(() => {
    const load = async () => {
      const userId = auth?.user?.id;
      if (!userId) return;
      const isConfigured = Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY));
      if (!isConfigured) return;
      const { data: base } = await supabase
        .from('levels')
        .select('id,slug,title,description,icon_slug,xp_reward,order_index,active')
        .eq('active', true)
        .order('order_index', { ascending: true })
        .order('id', { ascending: true });
      const rawLevels = Array.isArray(base) ? base : [];
      const { data: comps } = await supabase
        .from('level_completions')
        .select('level_id,stars')
        .eq('user_id', userId);
      const compMap = new Map<number, number>();
      if (Array.isArray(comps)) comps.forEach((r: any) => compMap.set(r.level_id, Number(r.stars || 0)));
      const resolved: Level[] = rawLevels.map((l: any) => {
        const Icon = iconMap[l.icon_slug] ?? Brain;
        const stars = compMap.get(l.id) ?? 0;
        const status = stars > 0 ? 'completed' : 'current';
        return { id: l.id, title: l.title, description: l.description, icon: Icon, status, stars, maxStars: 3, xpReward: Number(l.xp_reward || 0) } as Level;
      });
      const final = resolved;
      setLevelState(final);
    };
    load();
    return () => {
      if (achievementTimeoutRef.current) clearTimeout(achievementTimeoutRef.current)
    }
  }, [auth?.user?.id]);

  const generatePath = () => {
    let pathString = "";
    positions.forEach((pos, index) => {
      if (index === 0) {
        pathString += `M ${pos.left}% ${pos.top}`;
      } else {
        const prevPos = positions[index - 1];
        const controlPointX = (prevPos.left + pos.left) / 2;
        const controlPointY = (prevPos.top + pos.top) / 2;
        pathString += ` Q ${controlPointX}% ${controlPointY} ${pos.left}% ${pos.top}`;
      }
    });
    return pathString;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <DashboardTopNav />
      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="w-8 h-8" />
                Perjalanan Kesehatan Mental
              </h1>
              <p className="text-purple-100 text-sm mt-1">Tingkatkan kesehatan mentalmu dengan pembelajaran terstruktur</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                <p className="text-xs text-purple-100">Level</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                <p className="text-xs text-purple-100">Total XP</p>
                <p className="text-2xl font-bold">{totalXP}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-300" />
                <div>
                  <p className="text-xs text-purple-100">Badges</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Card className="border-2 border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Target className="w-5 h-5" />
                  Progress Minggu Ini
                </CardTitle>
                <CardDescription>Terus lanjutkan perjalananmu!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Level Selesai</span>
                      <span className="font-semibold text-purple-700">{completedLevels}/{levels.length}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Bintang</span>
                      <span className="font-bold text-yellow-600 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        {levels.reduce((sum, l) => sum + l.stars, 0)} / {levels.length * 3}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">XP Earned</span>
                      <span className="font-bold text-purple-600">{totalXP} XP</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {levels.find((l) => l.status === "current") && (
              <Card className="border-2 border-purple-300 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <TrendingUp className="w-5 h-5" />
                    Level Aktif
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    {(() => {
                    const currentLevel = levels.find((l) => l.status === "current")!;
                    const Icon = currentLevel.icon;
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{currentLevel.title}</h3>
                            <p className="text-xs text-gray-600">{currentLevel.description}</p>
                          </div>
                        </div>
                        <Link href="/mentoring/level/2" className="contents" prefetch>
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Mulai Pelajaran</Button>
                        </Link>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            <Card className="border-2 border-yellow-200 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Award className="w-5 h-5" />
                  Pencapaian Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium">Perfect Score x2</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">4 Level Selesai</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Semua Level</h2>
              <p className="text-gray-600">Pilih level untuk memulai atau melanjutkan perjalananmu</p>
            </div>
            <div className="relative min-h-[900px] bg-white/50 backdrop-blur-sm rounded-3xl p-8">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#a855f7", stopOpacity: 0.4 }} />
                    <stop offset="50%" style={{ stopColor: "#ec4899", stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 0.4 }} />
                  </linearGradient>
                </defs>
                <path d={generatePath()} fill="none" stroke="url(#pathGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="relative" style={{ zIndex: 1 }}>
                {levels.map((level, index) => {
                  const Icon = level.icon;
                  const pos = positions[index] ?? { top: 100 + index * 150, left: 50 };
                  return (
                    <motion.div key={level.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1, type: "spring" }} className="absolute -translate-x-1/2" style={{ top: `${pos.top}px`, left: `${pos.left}%` }}>
                      {level.status !== "locked" && level.stars > 0 && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-0.5">
                          {[...Array(level.stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow" />
                          ))}
                        </motion.div>
                      )}
                      <Link href={`/mentoring/level/${level.id}`} className="contents" prefetch aria-label={`Buka level ${level.title}`}>
                        <motion.div className="relative cursor-pointer group" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          {level.status !== "completed" && (
                            <motion.div className="absolute -inset-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} />
                          )}
                          <div className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${level.status !== "completed" ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-gradient-to-br from-purple-400 to-pink-400"}`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {level.status === "completed" && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg border-2 border-white">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                          <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            <div className="bg-white rounded-lg shadow-xl p-3 w-48 border-2 border-purple-200">
                              <h4 className="font-bold text-gray-900 text-sm mb-1">{level.title}</h4>
                              <p className="text-xs text-gray-600 mb-2">{level.description}</p>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  +{level.xpReward} XP
                                </Badge>
                                {level.status !== "completed" && <span className="text-xs font-semibold text-purple-600">Aktif</span>}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLevel && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setSelectedLevel(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto z-50">
              <Card className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                    {selectedLevel.icon && <selectedLevel.icon className="w-10 h-10 text-white" />}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLevel.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedLevel.description}</p>
                  <div className="flex justify-center gap-2 mb-4">
                    {[...Array(selectedLevel.maxStars)].map((_, i) => (
                      <Star key={i} className={`w-8 h-8 ${i < selectedLevel.stars ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                    ))}
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 mb-6">
                    <Sparkles className="w-3 h-3 mr-1" />
                    +{selectedLevel.xpReward} XP
                  </Badge>
                  <div className="space-y-3">
                    {selectedLevel.status !== "locked" && (
                      <Link href={`/mentoring/level/${selectedLevel.id}`} className="contents" prefetch>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">Buka Halaman Level</Button>
                      </Link>
                    )}
                    <Button variant="outline" className="w-full" onClick={() => setSelectedLevel(null)}>Tutup</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAchievement && (
          <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <Card className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white shadow-2xl p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8" />
                <div>
                  <p className="font-bold text-lg">Perfect Score! 🎉</p>
                  <p className="text-sm">Kamu mendapat 3 bintang!</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
