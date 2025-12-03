import { Head, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { supabase } from '@/lib/supabaseClient';
import {
  Heart,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Clock,
  Flame,
  Trophy,
  Star,
  Zap,
  Wind,
  Sun,
  Moon,
  CloudRain,
  Coffee,
  Book,
  Music,
  Gem,
} from 'lucide-react';
import DashboardTopNav from '@/components/dashboard-top-nav';

type SharedProps = {
  auth: {
    user: { id: number; name: string; email: string } | null;
  };
};

type Entry = { rank: number; name: string; statusIcon: string; wellnessPoints: number; trend: number };
// Adapt existing dummy entries to new schema (keep visual identical to reference)
type LBRow = { user_id: string; name: string; totalExp: number; status?: string; lastRank?: number };

const statusIcons = {
  flame: <Flame className="w-5 h-5 text-orange-500" />,
  star: <Star className="w-5 h-5 text-yellow-500" />,
  gem: <Gem className="w-5 h-5 text-blue-500" />,
  zap: <Zap className="w-5 h-5 text-purple-500" />,
  wind: <Wind className="w-5 h-5 text-teal-500" />,
  sun: <Sun className="w-5 h-5 text-amber-500" />,
  moon: <Moon className="w-5 h-5 text-indigo-500" />,
  cloud: <CloudRain className="w-5 h-5 text-sky-500" />,
  coffee: <Coffee className="w-5 h-5 text-brown-500" />,
  book: <Book className="w-5 h-5 text-violet-500" />,
  music: <Music className="w-5 h-5 text-pink-500" />,
  '🙂': <span className="text-xl">🙂</span>,
  '😎': <span className="text-xl">😎</span>,
  '🧠': <span className="text-xl">🧠</span>,
  '🛡️': <span className="text-xl">🛡️</span>,
  '⚡': <span className="text-xl">⚡</span>,
  '🔥': <span className="text-xl">🔥</span>,
  '💤': <span className="text-xl">💤</span>,
  '🎯': <span className="text-xl">🎯</span>,
  '🎮': <span className="text-xl">🎮</span>,
  '👾': <span className="text-xl">👾</span>,
  '⭐': <span className="text-xl">⭐</span>,
  '💎': <span className="text-xl">💎</span>,
} as const;

export default function Leaderboard() {
  const { auth } = usePage<SharedProps>().props;
  const { updateAppearance } = useAppearance();
  const [rows, setRows] = useState<LBRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [myStats, setMyStats] = useState({ streak: 0, badges: 0, points: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const userId = auth?.user?.id;
      if (!userId) return;
      
      // Streak
      try {
        const { data: moods } = await supabase.from("mood_logs").select("date").eq("user_id", userId);
        const dates = new Set((moods ?? []).map(m => m.date));
        let s = 0;
        let d = new Date();
        while (true) {
          const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
          if (dates.has(k)) { s++; d.setDate(d.getDate()-1); }
          else break;
        }
        setMyStats(prev => ({ ...prev, streak: s }));
      } catch {}

      // Stats
      try {
        const { data: agg } = await supabase.from("dashboard_user_stats").select("total_points,badges_count").eq("user_id", userId).maybeSingle();
        if (agg) {
          setMyStats(prev => ({ ...prev, points: agg.total_points ?? 0, badges: agg.badges_count ?? 0 }));
        }
      } catch {}
    };
    loadStats();
  }, [auth?.user?.id]);

  const daysLeft = useMemo(() => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  }, []);

  useEffect(() => {
    // Force light theme to replicate reference visuals exactly
    updateAppearance('light');
  }, [updateAppearance]);

  useEffect(() => {
    const fetchLB = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/leaderboard?period=lifetime', { headers: { 'Accept': 'application/json' } });
        const json = await res.json();
        const data: LBRow[] = (json?.data ?? []).map((r: any) => ({
          user_id: String(r.user_id),
          name: String(r.name ?? String(r.user_id).slice(0, 6)),
          totalExp: Number(r.totalExp ?? 0),
          status: r.status ?? undefined,
        }));
        const now = new Date();
        const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2,'0')}-01`;
        const { data: snapshots } = await supabase
          .from('leaderboard_rank_snapshot')
          .select('user_id, last_rank, month')
          .eq('month', monthStr);
        const snapshotMap = new Map<string, number>((snapshots ?? []).map(s => [String(s.user_id), Number(s.last_rank)]));
        const merged = data.map(r => ({ ...r, lastRank: snapshotMap.get(r.user_id) ?? undefined }));
        const ids = merged.map(r => r.user_id);
        const { data: statusRows } = await supabase
          .from('leaderboard_status')
          .select('user_id,status')
          .in('user_id', ids.map(id => Number(id)));
        const statusMapClient = new Map<string, string>((statusRows ?? []).map(s => [String(s.user_id), String(s.status)]));
        const mergedWithStatus = merged.map(r => ({ ...r, status: r.status ?? statusMapClient.get(r.user_id) ?? undefined }));
        setRows(mergedWithStatus);
        const upserts = mergedWithStatus.map((r, i) => ({ user_id: r.user_id, month: monthStr, last_rank: i + 1, updated_at: new Date().toISOString() }));
        if (upserts.length) supabase.from('leaderboard_rank_snapshot').upsert(upserts, { onConflict: 'user_id,month' });
      } catch (e) {
        console.error('Leaderboard API failed', e);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLB();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Head title="Leaderboard" />
      <DashboardTopNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Main Leaderboard */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-2 rounded-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Serenity League</h1>
                  </div>
                  <p className="text-sm text-muted-foreground">Top 15 will advance to the Harmony League</p>
                </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{daysLeft} days left</span>
              </div>
              </div>

              {/* Activity Filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                  { icon: <Heart className="w-4 h-4" />, label: 'Gratitude' },
                  { icon: <Flame className="w-4 h-4" />, label: 'Streak' },
                  { icon: <Star className="w-4 h-4" />, label: 'Badges' },
                  { icon: <Zap className="w-4 h-4" />, label: 'Breathing' },
                  { icon: <Sun className="w-4 h-4" />, label: 'Mindfulness' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors whitespace-nowrap"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Leaderboard Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">#</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Wellness Points</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">Loading leaderboard…</td></tr>
                    )}
                    {!loading && rows.length === 0 && (
                      <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">Belum ada data EXP</td></tr>
                    )}
                    {!loading && rows.map((entry, idx) => (
                      <tr key={entry.user_id} className="border-b border-border">
                        <td className="py-4 px-4">
                          <span className="font-medium text-muted-foreground">{idx + 1}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-sm font-semibold">
                              {entry.name.charAt(0)}
                            </div>
                            <span className="font-medium">{entry.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-center">
                            {entry.status ? statusIcons[entry.status as keyof typeof statusIcons] : <Sparkles className="w-5 h-5 text-muted-foreground" />}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-semibold">{entry.totalExp.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-1">WP</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            {entry.lastRank !== undefined && entry.lastRank > idx + 1 ? (
                              <>
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span className="text-emerald-500 text-sm font-medium">+{entry.lastRank - (idx + 1)}</span>
                              </>
                            ) : entry.lastRank !== undefined && entry.lastRank < idx + 1 ? (
                              <>
                                <TrendingDown className="w-4 h-4 text-red-500" />
                                <span className="text-red-500 text-sm font-medium">-{(idx + 1) - entry.lastRank}</span>
                              </>
                            ) : <span className="text-muted-foreground text-sm">—</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Selector */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-3">Set Your Status</h2>
              <div className="grid grid-cols-6 gap-2">
                {[
                  { emoji: '🙂', color: 'bg-amber-50' },
                  { emoji: '😎', color: 'bg-sky-50' },
                  { emoji: '🧠', color: 'bg-violet-50' },
                  { emoji: '🛡️', color: 'bg-teal-50' },
                  { emoji: '⚡', color: 'bg-purple-50' },
                  { emoji: '🔥', color: 'bg-red-50' },
                  { emoji: '💤', color: 'bg-indigo-50' },
                  { emoji: '🎯', color: 'bg-green-50' },
                  { emoji: '🎮', color: 'bg-cyan-50' },
                  { emoji: '👾', color: 'bg-fuchsia-50' },
                  { emoji: '⭐', color: 'bg-yellow-50' },
                  { emoji: '💎', color: 'bg-blue-50' },
                ].map((mood, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      'aspect-square rounded-xl border-2 border-border flex items-center justify-center text-2xl transition-all hover:scale-110 hover:border-primary',
                      mood.color,
                    )}
                    title={mood.emoji}
                    onClick={async () => {
          console.log('Emoji button clicked!');
          const me = auth.user?.id;
          const meName = auth.user?.name;
          if (!me) return;
                      const statusKey = mood.emoji;
                      const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
                      const resp = await fetch('/api/leaderboard/status', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRF-TOKEN': csrf },
                        body: JSON.stringify({ status: statusKey }),
          });
          console.log('Fetch response:', resp);
          if (resp.ok) {
             // Trigger a refresh or optimistic update
          }
          let updated = false;
                      const newRows = rows.map(r => {
                        if (r.user_id === String(me)) {
                          updated = true;
                          return { ...r, status: statusKey, name: meName ?? r.name };
                        }
                        return r;
                      });
                      const finalRows = updated
                        ? newRows
                        : [
                            ...newRows,
                            { user_id: String(me), name: String(meName ?? String(me).slice(0,6)), totalExp: 0, status: statusKey },
                          ].sort((a,b) => (b.totalExp ?? 0) - (a.totalExp ?? 0));
                      setRows(finalRows);
                    }}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>
            </Card>

            {/* Wellness Badges */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Wellness Badges</h2>
              <div className="grid grid-cols-4 gap-3">
                <button className="aspect-square rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-500" />
                </button>
                <button className="aspect-square rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </button>
                <button className="aspect-square rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-500" />
                </button>
                <button className="aspect-square rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all flex items-center justify-center">
                  <Moon className="w-6 h-6 text-indigo-500" />
                </button>
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">Your Progress</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Daily Streak</span>
                  <Badge variant="secondary" className="font-semibold">
                    <Flame className="w-3 h-3 mr-1" />
                    {myStats.streak} days
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Badges</span>
                  <Badge variant="secondary" className="font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    {myStats.badges}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Wellness Points</span>
                  <Badge variant="secondary" className="font-semibold">
                    <Trophy className="w-3 h-3 mr-1" />
                    {myStats.points.toLocaleString()} WP
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
