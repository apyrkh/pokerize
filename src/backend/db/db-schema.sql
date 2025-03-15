-- cleanup DB
drop table if exists "player";
drop table if exists "room";
drop type if exists "player_role";

-- init DB
create extension if not exists "pgcrypto";

create table "room" (
  id text primary key default encode(gen_random_bytes(4), 'hex'),
  name text,
  votes_revealed boolean default false not null,
  created_at timestamptz default now() not null
);

create type player_role as enum ('USER', 'VIEWER');

create table "player" (
  id text primary key default encode(gen_random_bytes(4), 'hex'),
  room_id text not null references "room"(id) on delete cascade,
  user_id text not null,
  user_name text,
  role player_role not null,
  vote text,
  unique(room_id, user_id)
);
