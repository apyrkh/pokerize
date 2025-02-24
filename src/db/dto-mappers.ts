import { PlayerDto, RoomDto } from "@/api-dtos";
import { Player, Room } from "@prisma/client";

export var roomToDto = (room: Room & { players: Player[] }): RoomDto => ({
  id: room.id,
  name: room.name,
  players: room.players.map(playerToDto),
  votesRevealed: room.votesRevealed,
  createdAt: room.createdAt,
})

export var playerToDto = (player: Player): PlayerDto => ({
  userId: player.userId,
  userName: player.userName,
  role: player.role,
  vote: player.vote,
})
