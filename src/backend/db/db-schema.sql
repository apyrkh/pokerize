-- Cleanup DB
DROP TABLE IF EXISTS public.vote;
DROP TABLE IF EXISTS public.player;
DROP TABLE IF EXISTS public.room;
DROP TYPE IF EXISTS public.player_role;

-- Public
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public.room (
  id TEXT PRIMARY KEY DEFAULT encode(gen_random_bytes(4), 'hex'),
  name TEXT,
  votes_revealed BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.room ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow select only with WHERE on id"
  ON public.room
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.room AS t WHERE t.id = public.room.id
  ));

CREATE TYPE public.player_role AS ENUM ('USER', 'VIEWER');

CREATE TABLE public.player (
  room_id TEXT NOT NULL REFERENCES public.room(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name TEXT,
  role public.player_role NOT NULL,
  voted BOOLEAN DEFAULT FALSE NOT NULL,
  PRIMARY KEY (room_id, user_id)
);

CREATE TABLE public.vote (
  id TEXT PRIMARY KEY DEFAULT encode(gen_random_bytes(4), 'hex'),
  room_id TEXT NOT NULL REFERENCES public.room(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  vote TEXT,
  revealed BOOLEAN DEFAULT FALSE NOT NULL,
  UNIQUE(room_id, user_id), -- 1 vote per player
  FOREIGN KEY (room_id, user_id) REFERENCES public.player(room_id, user_id) ON DELETE CASCADE
);
