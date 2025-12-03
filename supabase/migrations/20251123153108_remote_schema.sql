DO $$
BEGIN
  CREATE TYPE invite_status AS ENUM ('pending', 'sent', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL;
END;
$$;

CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id integer PRIMARY KEY,
  level integer DEFAULT 1 NOT NULL,
  total_points integer DEFAULT 0 NOT NULL,
  badges_count integer DEFAULT 0 NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.invites (
  id bigserial PRIMARY KEY,
  inviter_user_id integer NOT NULL,
  email text NOT NULL,
  status invite_status DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE OR REPLACE VIEW public.xp_events AS
SELECT id, user_id, points, type, created_at
FROM public.user_xp_events;

CREATE UNIQUE INDEX IF NOT EXISTS mood_logs_user_date_unique ON public.mood_logs (user_id, date);
CREATE INDEX IF NOT EXISTS user_xp_events_user_created_idx ON public.user_xp_events (user_id, created_at);
CREATE INDEX IF NOT EXISTS invites_inviter_created_idx ON public.invites (inviter_user_id, created_at);
CREATE INDEX IF NOT EXISTS invites_email_idx ON public.invites (email);
CREATE OR REPLACE VIEW public.dashboard_user_stats AS
SELECT
  u.id AS user_id,
  COALESCE(SUM(ux.amount), 0)                AS total_points,
  FLOOR(COALESCE(SUM(ux.amount),0) / 50) + 1 AS level,
  COALESCE((
    SELECT COUNT(*) FROM public.user_achievements ua
    WHERE ua.user_id = u.id
      AND (ua.status = 'unlocked' OR ua.unlocked_at IS NOT NULL)
  ), 0) AS badges_count
FROM public.users u
LEFT JOIN public.user_xp_events ux ON ux.user_id = u.id
GROUP BY u.id;

CREATE INDEX IF NOT EXISTS user_achievements_user_idx
  ON public.user_achievements (user_id, status, unlocked_at);
