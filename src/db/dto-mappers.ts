import { PlayerDto, RoomDto } from "@/api-dtos";
import { Tables } from "./db-types";

export var roomToDto = (room: Tables<'room'> & { player: Tables<'player'>[] }): RoomDto => ({
  id: room.id,
  name: room.name,
  players: room.player.map(playerToDto),
  votesRevealed: room.votes_revealed,
  createdAt: room.created_at,
})

export var playerToDto = (player: Tables<'player'>): PlayerDto => ({
  userId: player.user_id,
  userName: player.user_name,
  role: player.role,
  vote: player.vote,
})
