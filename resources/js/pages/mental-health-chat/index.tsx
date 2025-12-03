import { Button } from '@/components/ui/button';
import DashboardTopNav from '@/components/dashboard-top-nav';
import { cn } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Bot, RefreshCw, Send, User, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
};

type ChatSession = {
    id: string;
    title: string;
    updated_at: string;
};

type SharedProps = {
    auth: {
        user: { id: number; name: string; email: string } | null;
    };
};

export default function MentalHealthChatPage() {
    const { auth } = usePage<SharedProps>().props;
    const name = auth?.user?.name ?? 'Teman';

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: `Halo ${name} 🌿, senang bisa berbicara denganmu. Aku di sini untuk mendengarkan dan menemanimu. Bagaimana kabar hatimu hari ini?`,
            role: 'assistant',
            timestamp: new Date(),
        },
    ]);

    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [sessionCache, setSessionCache] = useState<Record<string, Message[]>>({});
    const SESSIONS_KEY = 'mh_sessions';
    const CACHE_KEY = 'mh_session_cache';

    const bgClass = 'min-h-screen relative bg-gradient-to-br from-purple-50 via-violet-50 to-white';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${Math.min(160, inputRef.current.scrollHeight)}px`;
    }, [inputMessage]);

    useEffect(() => {
        const loadSessions = async () => {
            const userId = auth?.user?.id;
            const isSupabaseConfigured = Boolean(
                (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) &&
                (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)
            );
            if (!userId || !isSupabaseConfigured) {
                const rawSessions = localStorage.getItem(SESSIONS_KEY);
                const rawCache = localStorage.getItem(CACHE_KEY);
                const storedActive = localStorage.getItem('mh_active_session_id');
                const lsSessions: ChatSession[] = rawSessions ? JSON.parse(rawSessions) : [];
                const lsCache: Record<string, Message[]> = rawCache ? JSON.parse(rawCache) : {};
                setSessions(lsSessions);
                setSessionCache(lsCache);
                if (lsSessions.length > 0) {
                    const exists = storedActive && lsSessions.some((s) => s.id === storedActive);
                    setActiveSessionId(exists ? String(storedActive) : lsSessions[0].id);
                }
                return;
            }
            try {
                const { data } = await supabase
                    .from('mh_chat_sessions')
                    .select('id,title,updated_at')
                    .eq('user_id', userId)
                    .order('updated_at', { ascending: false })
                    .limit(50);
                if (Array.isArray(data)) {
                    const list = data.map((s: any) => ({ id: String(s.id), title: String(s.title), updated_at: String(s.updated_at) }));
                    setSessions(list);
                    if (list.length > 0) {
                        const stored = localStorage.getItem('mh_active_session_id');
                        const exists = stored && list.some((s) => s.id === stored);
                        setActiveSessionId(exists ? String(stored) : list[0].id);
                    } else {
                        const rawSessions = localStorage.getItem(SESSIONS_KEY);
                        const rawCache = localStorage.getItem(CACHE_KEY);
                        const storedActive = localStorage.getItem('mh_active_session_id');
                        const lsSessions: ChatSession[] = rawSessions ? JSON.parse(rawSessions) : [];
                        const lsCache: Record<string, Message[]> = rawCache ? JSON.parse(rawCache) : {};
                        setSessions(lsSessions);
                        setSessionCache(lsCache);
                        if (lsSessions.length > 0) {
                            const exists = storedActive && lsSessions.some((s) => s.id === storedActive);
                            setActiveSessionId(exists ? String(storedActive) : lsSessions[0].id);
                        }
                    }
                }
            } catch {}
        };
        loadSessions();
    }, [auth?.user?.id]);

    useEffect(() => {
        const loadMessagesForSession = async () => {
            const userId = auth?.user?.id;
            const isSupabaseConfigured = Boolean(
                (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) &&
                (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)
            );
            if (!activeSessionId || !isSupabaseConfigured) return;

            const cached = sessionCache[activeSessionId];
            if (cached && cached.length > 0) {
                setMessages(cached);
                return;
            }
            try {
                const { data } = await supabase
                    .from('mh_messages')
                    .select('role,content,created_at')
                    .eq('session_id', activeSessionId)
                    .order('created_at', { ascending: true })
                    .limit(200);
                if (Array.isArray(data)) {
                    const mapped: Message[] = data.map((r: any, idx: number) => ({
                        id: String(idx + 1),
                        content: String(r.content),
                        role: (r.role as 'user' | 'assistant') ?? 'assistant',
                        timestamp: new Date(String(r.created_at)),
                    }));
                    if (mapped.length > 0) {
                        setMessages(mapped);
                        setSessionCache((prev) => ({ ...prev, [activeSessionId]: mapped }));
                    } else {
                        if (sessions.length === 0) {
                            setMessages([
                                {
                                    id: 'welcome',
                                    content: `Halo ${name} 🌿, senang bisa berbicara denganmu. Aku di sini untuk mendengarkan dan menemanimu. Bagaimana kabar hatimu hari ini?`,
                                    role: 'assistant',
                                    timestamp: new Date(),
                                },
                            ]);
                        } else {
                            setMessages([]);
                        }
                    }
                }
            } catch {}
        };
        loadMessagesForSession();
    }, [activeSessionId, sessions]);

    const createNewChat = async () => {
        const userId = auth?.user?.id;
        const isSupabaseConfigured = Boolean(
            (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) &&
            (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)
        );
        // Finalize current session title in UI first (regardless of DB)
        if (activeSessionId) {
            const lastUser = [...messages].reverse().find((m) => m.role === 'user');
            const snippet = lastUser ? lastUser.content.replace(/\s+/g, ' ').slice(0, 60) : 'New Chat';
            setSessions((prev) => prev.map((s) => (s.id === activeSessionId ? { ...s, title: snippet, updated_at: new Date().toISOString() } : s)));
            // Try to persist to Supabase if available (best-effort)
            if (userId && isSupabaseConfigured) {
                try {
                    await supabase
                        .from('mh_chat_sessions')
                        .update({ title: snippet, updated_at: new Date().toISOString() })
                        .eq('id', activeSessionId);
                } catch {}
            }
        }

        // Create a brand-new session
        if (!userId || !isSupabaseConfigured) {
            const localId = `local-${Date.now()}`;
            const session: ChatSession = { id: localId, title: 'New Chat', updated_at: new Date().toISOString() };
            setSessions((prev) => [session, ...prev]);
            setActiveSessionId(localId);
            setMessages([]);
            setSessionCache((prev) => ({ ...prev, [localId]: [] }));
            return;
        }
        try {
            const { data } = await supabase
                .from('mh_chat_sessions')
                .insert([{ user_id: userId, title: 'New Chat' }])
                .select('id,title,updated_at')
                .single();
            if (data) {
                const session: ChatSession = { id: String(data.id), title: String(data.title), updated_at: String(data.updated_at) };
                setSessions((prev) => [session, ...prev]);
                setActiveSessionId(session.id);
                localStorage.setItem('mh_active_session_id', session.id);
                setMessages([]);
                setSessionCache((prev) => ({ ...prev, [session.id]: [] }));
                return;
            }
            // Fallback if insertion returned no data
            const localFallbackId = `local-${Date.now()}`;
            const fallbackSession: ChatSession = { id: localFallbackId, title: 'New Chat', updated_at: new Date().toISOString() };
            setSessions((prev) => [fallbackSession, ...prev]);
            setActiveSessionId(localFallbackId);
            localStorage.setItem('mh_active_session_id', localFallbackId);
            setMessages([]);
            setSessionCache((prev) => ({ ...prev, [localFallbackId]: [] }));
        } catch {
            // Fallback on error
            const localFallbackId = `local-${Date.now()}`;
            const fallbackSession: ChatSession = { id: localFallbackId, title: 'New Chat', updated_at: new Date().toISOString() };
            setSessions((prev) => [fallbackSession, ...prev]);
            setActiveSessionId(localFallbackId);
            localStorage.setItem('mh_active_session_id', localFallbackId);
            setMessages([]);
            setSessionCache((prev) => ({ ...prev, [localFallbackId]: [] }));
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Tambahkan pesan user ke chat
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            if (!activeSessionId) {
                await createNewChat();
            }

            // Kirim ke backend
            const response = await axios.post('/api/mental-health-chat', {
                message: userMessage.content,
                history: messages.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            });

            // Tambahkan balasan AI
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content:
                    response?.data?.response ??
                    'Terima kasih sudah bercerita. Aku sedang berusaha memahami situasimu dan akan menanggapi dengan sebaik mungkin.',
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setSessionCache((prev) => {
                const sid = activeSessionId ?? '';
                if (!sid) return prev;
                const prevMsgs = prev[sid] ?? [];
                return { ...prev, [sid]: [...prevMsgs, userMessage, aiMessage] };
            });

            // Simpan ke database bila tersedia
            const userId = auth?.user?.id;
            const isSupabaseConfigured = Boolean(
                (import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) &&
                (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY)
            );
            if (userId && isSupabaseConfigured && activeSessionId) {
                const now = new Date().toISOString();
                try {
                    await supabase.from('mh_messages').insert([
                        { session_id: activeSessionId, user_id: userId, role: 'user', content: userMessage.content, created_at: now },
                        { session_id: activeSessionId, user_id: userId, role: 'assistant', content: aiMessage.content, created_at: now },
                    ]);
                    await supabase
                        .from('mh_chat_sessions')
                        .update({ updated_at: new Date().toISOString() })
                        .eq('id', activeSessionId);
                    const current = sessions.find((s) => s.id === activeSessionId);
                    if (current && current.title === 'New Chat') {
                        const snippet = userMessage.content.replace(/\s+/g, ' ').slice(0, 60);
                        await supabase
                            .from('mh_chat_sessions')
                            .update({ title: snippet, updated_at: new Date().toISOString() })
                            .eq('id', activeSessionId);
                        setSessions((prev) => prev.map((s) => (s.id === activeSessionId ? { ...s, title: snippet, updated_at: new Date().toISOString() } : s)));
                    } else {
                        setSessions((prev) => prev.map((s) => (s.id === activeSessionId ? { ...s, updated_at: new Date().toISOString() } : s)));
                    }
                } catch {}
            }
        } catch (error) {
            // Tampilkan pesan error yang empatik
            const errorMessage: Message = {
                id: (Date.now() + 2).toString(),
                content:
                    'Maaf, sepertinya ada kendala teknis. Mohon coba lagi sebentar lagi ya. Terima kasih sudah bersabar 💛',
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (activeSessionId) {
            localStorage.setItem('mh_active_session_id', activeSessionId);
        }
    }, [activeSessionId]);

    useEffect(() => {
        try {
            localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
        } catch {}
    }, [sessions]);

    useEffect(() => {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(sessionCache));
        } catch {}
    }, [sessionCache]);

    return (
        <div className={bgClass}>
            <Head title="Ruang Konseling — Asisten Kesehatan Mental" />
            <DashboardTopNav />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-12 left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20 blur-3xl" />
              <div className="absolute bottom-16 right-24 w-56 h-56 bg-violet-300 rounded-full opacity-20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl" />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 min-h-[calc(100vh-14rem)]">
                <div aria-label="Informasi layanan" className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-200 text-purple-600">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold tracking-tight">Chatbot AI</h2>
                      <p className="text-sm text-muted-foreground">Berbicara dengan AI yang memahami dan siap membantu kapan saja</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <Button onClick={createNewChat} className="w-full bg-purple-600 hover:bg-purple-700 text-white">New Chat</Button>
                    <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur p-2">
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Your Chats</div>
                      <div className="space-y-1">
                        {sessions.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => { setActiveSessionId(s.id); const cached = sessionCache[s.id]; setMessages(cached ?? []); localStorage.setItem('mh_active_session_id', s.id); }}
                            className={cn(
                              'w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted/60',
                              activeSessionId === s.id && 'bg-muted/60'
                            )}
                          >
                            <div className="truncate">{s.title}</div>
                            <div className="text-[11px] text-muted-foreground">{new Date(s.updated_at).toLocaleString()}</div>
                          </button>
                        ))}
                        {sessions.length === 0 && (
                          <div className="px-3 py-2 text-xs text-muted-foreground">Belum ada chat</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat container */}
                <div
                    className="flex-1 overflow-y-auto rounded-3xl border border-white/60 bg-white/80 backdrop-blur p-4 sm:p-6 shadow-xl"
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions"
                >
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    'flex items-start gap-3 rounded-lg p-3',
                                    message.role === 'assistant'
                                        ? 'bg-muted/50 max-w-md'
                                        : 'ml-auto bg-muted/50 max-w-md flex-row-reverse',
                                )}
                            >
                                <div
                                    className={cn(
                                        'flex h-8 w-8 items-center justify-center rounded-md',
                                        message.role === 'assistant'
                                            ? 'border border-blue-400/40 bg-blue-400/10'
                                            : 'border border-green-400/40 bg-green-400/10',
                                    )}
                                    aria-hidden="true"
                                >
                                    {message.role === 'assistant' ? (
                                        <Bot className="size-4 text-blue-300" />
                                    ) : (
                                        <User className="size-4 text-green-300" />
                                    )}
                                </div>

                                <div className={cn(
                                    'flex-1',
                                    message.role === 'user' && 'text-right'
                                )}>
                                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                        {message.content}
                                    </div>

                                    {/* Tampilkan waktu kecil; bisa di-hide jika mau */}
                                    <div className="mt-1 text-xs text-muted-foreground">
                                        {new Date(
                                            message.timestamp,
                                        ).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="inline-flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-gray-400 animate-bounce" />
                                    <span className="size-2 rounded-full bg-gray-400 animate-bounce [animation-delay:120ms]" />
                                    <span className="size-2 rounded-full bg-gray-400 animate-bounce [animation-delay:240ms]" />
                                </span>
                                <span>Menyiapkan tanggapan dengan penuh perhatian...</span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  MindPath AI is an assistive tool and not a substitute for professional mental health care.
                </div>

                <div className="space-y-2">
                  <div className="relative flex items-center rounded-full border border-white/60 bg-white/80 shadow-xl backdrop-blur">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Share your thoughts..."
                      className="w-full resize-none rounded-full bg-transparent px-4 py-3 pr-14 text-sm focus:outline-none"
                      rows={2}
                      disabled={isLoading}
                      aria-label="Ketik perasaan atau pikiran Anda"
                      ref={inputRef}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="absolute right-2 h-9 w-9 rounded-full p-0 bg-purple-600 hover:bg-purple-700 text-white"
                      aria-label="Kirim pesan"
                    >
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
            </div>
            </main>
        </div>
    );
}
