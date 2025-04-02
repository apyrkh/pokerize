import type { User } from '@supabase/supabase-js';
import type { Tables } from './__generated__/db-model';
import type { PlayerDto, RoomDto, UserDto } from './api-model';

export var userToDto = (user: User): UserDto => ({
  id: user.id,
});

export var roomToDto = (room: Tables<'room'> & { player: Tables<'player'>[] }): RoomDto => ({
  id: room.id,
  name: room.name,
  players: room.player.map(playerToDto),
  votesRevealed: room.votes_revealed,
  createdAt: room.created_at,
});

export var playerToDto = (player: Tables<'player'>): PlayerDto => ({
  roomId: player.room_id,
  userId: player.user_id,
  userName: player.user_name,
  role: player.role,
  voted: player.voted,
});
