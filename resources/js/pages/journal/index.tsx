"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/components/ui/textarea";
import { ScrollArea } from "@/components/components/ui/scroll-area";
import { Smile, Meh, Frown, CloudRain, Sun, Moon, Calendar, Trash2, PenLine, Sparkles } from "lucide-react";
import DashboardTopNav from "@/components/dashboard-top-nav";
import { supabase } from "@/lib/supabaseClient";
import { usePage } from "@inertiajs/react";

type Mood = "happy" | "neutral" | "sad" | "calm" | "energetic" | "anxious";

interface JournalEntry {
  id: string;
  content: string;
  mood: Mood;
  timestamp: number;
}

const moodIcons: Record<Mood, React.ReactNode> = {
  happy: <Smile className="w-6 h-6" />,
  neutral: <Meh className="w-6 h-6" />,
  sad: <Frown className="w-6 h-6" />,
  calm: <Moon className="w-6 h-6" />,
  energetic: <Sun className="w-6 h-6" />,
  anxious: <CloudRain className="w-6 h-6" />,
};

const moodColors: Record<Mood, string> = {
  happy: "bg-yellow-100 text-yellow-600 border-yellow-200",
  neutral: "bg-gray-100 text-gray-600 border-gray-200",
  sad: "bg-blue-100 text-blue-600 border-blue-200",
  calm: "bg-indigo-100 text-indigo-600 border-indigo-200",
  energetic: "bg-orange-100 text-orange-600 border-orange-200",
  anxious: "bg-slate-100 text-slate-600 border-slate-200",
};

const moodLabels: Record<Mood, string> = {
  happy: "Senang",
  neutral: "Biasa",
  sad: "Sedih",
  calm: "Tenang",
  energetic: "Berenergi",
  anxious: "Cemas",
};

export default function JournalingPage() {
  const page = usePage<any>();
  const userId: number | undefined = page?.props?.auth?.user?.id;
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood>("calm");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const isSupabaseConfigured = Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY));
    if (userId && isSupabaseConfigured) {
      supabase
        .from("journal_entries")
        .select("id, content, mood, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50)
        .then(({ data }) => {
          if (Array.isArray(data)) {
            setEntries(
              data.map((r: any) => ({ id: r.id as string, content: r.content as string, mood: r.mood as Mood, timestamp: new Date(r.created_at as string).getTime() }))
            );
          }
          setIsLoaded(true);
        });
    } else {
      const savedEntries = localStorage.getItem("mindpath_journal_entries");
      if (savedEntries) {
        try {
          setEntries(JSON.parse(savedEntries));
        } catch {}
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mindpath_journal_entries", JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const handleSave = () => {
    if (!currentEntry.trim()) return;
    const isSupabaseConfigured = Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY));
    if (userId && isSupabaseConfigured) {
      supabase
        .from("journal_entries")
        .insert({ user_id: userId, content: currentEntry.trim(), mood: selectedMood })
        .select("id, content, mood, created_at")
        .single()
        .then(({ data }) => {
          if (data) {
            setEntries((prev) => [
              { id: data.id as string, content: data.content as string, mood: data.mood as Mood, timestamp: new Date(data.created_at as string).getTime() },
              ...prev,
            ]);
          }
          setCurrentEntry("");
        });
    } else {
      const newEntry: JournalEntry = {
        id: crypto.randomUUID(),
        content: currentEntry,
        mood: selectedMood,
        timestamp: Date.now(),
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry("");
    }
  };

  const handleDelete = (id: string) => {
    const isSupabaseConfigured = Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY));
    if (userId && isSupabaseConfigured) {
      supabase
        .from("journal_entries")
        .delete()
        .eq("id", id)
        .eq("user_id", userId)
        .then(() => setEntries((prev) => prev.filter((e) => e.id !== id)));
    } else {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp));
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } };
  const itemVariants: any = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 transition-colors duration-500">
      <DashboardTopNav />
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-4xl mx-auto space-y-6 px-4 md:px-8 py-4 md:py-8 mt-4">

        <div className="grid md:grid-cols-5 gap-5 md:gap-6">
          <div className="md:col-span-3 space-y-6">
            <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                  <PenLine className="w-5 h-5" />
                  Jurnal Hari Ini
                </CardTitle>
                <CardDescription>Bagaimana perasaanmu saat ini? Ceritakan harimu.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Mood Saya</label>
                  <div className="flex flex-wrap gap-2.5">
                    {(Object.keys(moodIcons) as Mood[]).map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`${selectedMood === mood ? `${moodColors[mood]} ring-2 ring-offset-1 ring-offset-white dark:ring-offset-slate-900 shadow-md scale-105` : "bg-white dark:bg-slate-800 text-muted-foreground border-transparent hover:bg-gray-50 dark:hover:bg-slate-700 hover:scale-105"} flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200 border`}
                        aria-label={`Select mood: ${moodLabels[mood]}`}
                      >
                        {moodIcons[mood]}
                        <span className="text-xs font-medium">{moodLabels[mood]}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2.5">
                  <Textarea placeholder="Tulis apa yang ada di pikiranmu..." className="min-h-[200px] resize-none border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 focus:ring-purple-400 text-lg leading-relaxed" value={currentEntry} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentEntry(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 pb-6">
                <Button onClick={handleSave} disabled={!currentEntry.trim()} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md transition-all hover:shadow-lg rounded-full px-8">Simpan Jurnal</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500" />Riwayat</h2>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">{entries.length} Catatan</span>
              </div>
              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                <div className="space-y-4 pb-4">
                  <AnimatePresence mode="popLayout">
                    {entries.length === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-muted-foreground bg-white/40 dark:bg-white/5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p>Belum ada catatan jurnal.</p>
                        <p className="text-sm mt-1">Mulai menulis cerita pertamamu!</p>
                      </motion.div>
                    ) : (
                      entries.map((entry) => (
                        <motion.div key={entry.id} layout variants={itemVariants} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}>
                          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${moodColors[entry.mood]}`}>
                                  {moodIcons[entry.mood]}
                                  {moodLabels[entry.mood]}
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive" onClick={() => handleDelete(entry.id)}>
                                  <Trash2 className="h-3 w-3" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                              <p className="text-sm text-foreground/90 whitespace-pre-wrap line-clamp-4 leading-relaxed">{entry.content}</p>
                              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{formatDate(entry.timestamp)}</div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
