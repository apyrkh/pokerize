export type UserDto = {
  id: string;
}

export type DateString = string;

export type RoomDto = {
  id: string;
  name: string | null;
  players: PlayerDto[];
  votesRevealed: boolean;
  createdAt: DateString;
}

export type PlayerDto = {
  roomId: string;
  userId: string;
  userName: string | null;
  role: PlayerRoleDto;
  voted: boolean;
}

export type PlayerRoleDto = (typeof PlayerRole)[keyof typeof PlayerRole];

export var PlayerRole = {
  USER: 'USER',
  VIEWER: 'VIEWER',
} as const;

export type UpdatePlayerDto = {
  userName?: string;
  role?: PlayerRoleDto;
}
