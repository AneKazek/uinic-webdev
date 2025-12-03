import { createClient } from '@supabase/supabase-js';

const url = (import.meta.env.VITE_SUPABASE_URL as string) || (import.meta.env.SUPABASE_URL as string);
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || (import.meta.env.SUPABASE_ANON_KEY as string);

function qb() {
  const api: any = {
    select: async () => ({ data: null, error: new Error('not_configured') }),
    insert: async () => ({ data: null, error: new Error('not_configured') }),
    update: async () => ({ data: null, error: new Error('not_configured') }),
    eq: () => api,
    order: () => api,
    limit: () => api,
    gte: () => api,
  };
  return api;
}

export const supabase: any = url && key ? createClient(url, key) : { from: () => qb() };
