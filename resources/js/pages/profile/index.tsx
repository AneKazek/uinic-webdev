import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { mentoring, leaderboard as leaderboardRoute, missions as missionsRoute, shop, profile as profileRoute } from '@/routes';
import { route } from 'ziggy-js';
import { Pencil, Flame, Zap, Shield, Trophy, Target, ShoppingCart, User, MoreHorizontal, Star, Award } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import { useAppearance } from '@/hooks/use-appearance';
import { Progress } from "@/components/ui/progress";
import DashboardTopNav from '@/components/dashboard-top-nav';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';

type StatItem = { label: string; value: number | string; icon: React.ReactNode };

function NavTab({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
        active
          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

type AchievementItem = { title: string; description?: string; progress: number; total: number; gradient?: string; status?: string };
type FriendRequestItem = { id: number; requester: { id: number; name: string; email: string; avatar?: string | null } };
type SharedProps = {
    auth: {
        user: { id: number; name: string; email: string; avatar?: string } | null;
    };
    achievements?: AchievementItem[];
    friendRequests?: FriendRequestItem[];
};

interface MoodLog {
  created_at: string;
  mood: string;
}

const moodToScore: Record<string, number> = {
    "😡": 1,
    "😟": 2,
    "😐": 3,
    "🙂": 4,
    "😄": 5,
};

export default function ProfilePage() {
    const page = usePage<SharedProps>();
    const { auth, achievements = [], friendRequests = [] } = page.props;
    const { updateAppearance } = useAppearance();

    const name = auth?.user?.name ?? 'Player One';
    const email = auth?.user?.email ?? 'user@example.com';
    const handle = `@${(email.split('@')[0] || 'player').replace(/[^a-zA-Z0-9_]/g, '')}`;

    const [streak, setStreak] = useState<number>(0);
    const [totalXp, setTotalXp] = useState<number>(0);
    const [league, setLeague] = useState<string>('Bronze');
    const [topFinishes, setTopFinishes] = useState<number>(0);
    const [pendingFriends, setPendingFriends] = useState<FriendRequestItem[]>(friendRequests);
    const [friendName, setFriendName] = useState<string>('');

    const stats: StatItem[] = [
        { label: 'Day streak', value: streak, icon: <Flame className="w-5 h-5 text-orange-400" /> },
        { label: 'Total XP', value: totalXp, icon: <Zap className="w-5 h-5 text-yellow-300" /> },
        { label: 'Current league', value: league, icon: <Shield className="w-5 h-5 text-amber-400" /> },
        { label: 'Top 3 finishes', value: topFinishes, icon: <Trophy className="w-5 h-5 text-blue-300" /> },
    ];

    useEffect(() => {
        updateAppearance('light');
    }, [updateAppearance]);

    useEffect(() => {
        let isMounted = true;
        const abort = new AbortController();
        async function loadMood() {
            try {
                const res = await fetch(route('moods.index'), { signal: abort.signal });
                const json = await res.json();
                if (!isMounted) return;
                setStreak(Number(json?.streak ?? 0));
            } catch {}
        }
        async function loadXp() {
            const hasSb = Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY));
            if (!hasSb || !auth?.user?.id) {
                setTotalXp(0);
                setLeague('Bronze');
                return;
            }
            try {
                const { data } = await supabase
                    .from('xp_events')
                    .select('points.sum()')
                    .eq('user_id', auth.user.id);
                const sumField = Array.isArray(data) && data.length ? (data[0] as any).sum ?? (data[0] as any).points_sum : 0;
                const sum = Number(sumField ?? 0) || 0;
                setTotalXp(sum);
                const lg = sum >= 10000 ? 'Diamond' : sum >= 5000 ? 'Emerald' : sum >= 2000 ? 'Gold' : sum >= 500 ? 'Silver' : 'Bronze';
                setLeague(lg);
            } catch {
                try {
                    const { data } = await supabase.from('xp_events').select('points').eq('user_id', auth.user.id).limit(10000);
                    const sum = Array.isArray(data) ? data.reduce((acc: number, r: any) => acc + (Number(r?.points ?? 0) || 0), 0) : 0;
                    setTotalXp(sum);
                    const lg = sum >= 10000 ? 'Diamond' : sum >= 5000 ? 'Emerald' : sum >= 2000 ? 'Gold' : sum >= 500 ? 'Silver' : 'Bronze';
                    setLeague(lg);
                } catch {
                    setTotalXp(0);
                    setLeague('Bronze');
                }
            }
        }
        loadMood();
        loadXp();
        return () => {
            isMounted = false;
            abort.abort();
        };
    }, [auth?.user?.id]);

    async function sendFriendRequest() {
        if (!friendName.trim()) return;
        const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
        try {
            const res = await fetch(route('friends.store'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
                body: JSON.stringify({ recipient_name: friendName.trim() }),
            });
            setFriendName('');
        } catch {}
    }

    async function acceptFriend(id: number) {
        const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
        try {
            await fetch(route('friends.accept', { id }), { method: 'PATCH', headers: { 'X-CSRF-Token': token } });
            setPendingFriends((prev) => prev.filter((p) => p.id !== id));
        } catch {}
    }

    async function rejectFriend(id: number) {
        const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
        try {
            await fetch(route('friends.reject', { id }), { method: 'PATCH', headers: { 'X-CSRF-Token': token } });
            setPendingFriends((prev) => prev.filter((p) => p.id !== id));
        } catch {}
    }

    const joinedLabel = new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    return (
      <div className="missions-ref-theme antialiased min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Head title="Profil" />
        <DashboardTopNav />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex items-start gap-8">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 overflow-hidden rounded-full ring-4 ring-purple-200">
                  <AvatarImage src={auth?.user?.avatar} alt={name} />
                  <AvatarFallback className="rounded-full bg-purple-600 text-white">
                    {name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-600">{handle}</p>
                  <p className="text-xs text-gray-500">Joined {joinedLabel}</p>
                  <p className="text-xs text-gray-500">0 following • 0 followers</p>
                </div>
                <div className="ml-auto">
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Link href={route('profile.edit')} className="inline-flex items-center gap-2"><Pencil className="w-4 h-4" /> Edit Profil</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Statistics</h3>
                <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                  {stats.map((s) => (
                    <div key={s.label} className="group h-full min-h-[72px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 transition-transform group-hover:scale-105">
                          {s.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-black text-gray-900 leading-tight">{s.value}</div>
                          <div className="text-xs font-semibold text-gray-600">{s.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
                  <button className="text-xs font-bold text-purple-600">VIEW ALL</button>
                </div>
                <div className="space-y-3">
                  {achievements.map((a, idx) => {
                    const pct = a.total > 0 ? Math.min(100, Math.round((a.progress / a.total) * 100)) : 0;
                    const lvl = `LEVEL ${Math.max(1, Math.floor((pct / 10) || 1))}`;
                    return (
                      <Card key={idx} className="bg-white border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.gradient ?? 'from-purple-400 to-fuchsia-500'} flex items-center justify-center text-xs font-black text-white`}>{lvl}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="font-bold text-gray-900">{a.title}</div>
                                <div className="text-sm text-gray-600">{a.progress}/{a.total}</div>
                              </div>
                              {a.description && <div className="mt-1 text-xs text-gray-600">{a.description}</div>}
                              <div className="mt-3">
                                <Progress value={pct} className="h-2 bg-gray-200 [&>div]:bg-purple-600" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 space-y-4">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="text-sm font-bold text-gray-900">Friends</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input value={friendName} onChange={(e) => setFriendName(e.target.value)} placeholder="Search name" />
                      <Button onClick={sendFriendRequest} className="shrink-0">Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {pendingFriends.length > 0 && (
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="text-sm font-bold text-gray-900">Permintaan Masuk</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {pendingFriends.map((req) => (
                        <div key={req.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 overflow-hidden rounded-full">
                              <AvatarImage src={req.requester.avatar || undefined} alt={req.requester.name} />
                              <AvatarFallback className="rounded-full bg-neutral-200 text-black">{req.requester.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-xs font-medium">{req.requester.name}</div>
                              <div className="text-[10px] text-gray-500">{req.requester.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="default" onClick={() => acceptFriend(req.id)}>Acc</Button>
                            <Button size="sm" variant="secondary" onClick={() => rejectFriend(req.id)}>Tolak</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}
