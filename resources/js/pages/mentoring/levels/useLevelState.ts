import { supabase } from '@/lib/supabaseClient'

function isConfigured() {
  return Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY))
}

export async function getCompletion(userId: number, levelId: number) {
  if (!isConfigured()) return null
  const { data } = await supabase.from('level_completions').select('level_id,stars,completed_at,xp_awarded').eq('user_id', userId).eq('level_id', levelId).limit(1)
  return Array.isArray(data) && data[0] ? data[0] : null
}

export async function getSessionHistory(userId: number, levelId: number) {
  if (!isConfigured()) return []
  const { data } = await supabase.from('level_sessions').select('started_at,ended_at,duration_ms').eq('user_id', userId).eq('level_id', levelId).order('started_at', { ascending: false }).limit(10)
  return Array.isArray(data) ? data : []
}

export async function startSession(userId: number, levelId: number) {
  if (!isConfigured()) return
  const now = new Date().toISOString()
  await supabase.from('level_sessions').insert({ user_id: userId, level_id: levelId, started_at: now })
}

export async function endSession(userId: number, levelId: number, payload: any, durationMs: number) {
  if (!isConfigured()) return
  const now = new Date().toISOString()
  await supabase.from('level_sessions').insert({ user_id: userId, level_id: levelId, ended_at: now, duration_ms: durationMs, payload })
  await supabase.from('xp_events').insert({ user_id: userId, points: Math.max(1, Math.floor(durationMs / 60000)), type: 'level_session', created_at: now })
}

export async function complete(userId: number, levelId: number, stars: number, xp: number) {
  if (!isConfigured()) return
  const now = new Date().toISOString()
  await supabase.from('level_completions').insert({ user_id: userId, level_id: levelId, completed_at: now, stars, xp_awarded: xp })
  await supabase.from('xp_events').insert({ user_id: userId, points: xp, type: 'level_complete', created_at: now })
}