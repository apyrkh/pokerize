export type RoomDto = {
  id: string;
  name: string | null;
  players: PlayerDto[];
  votesRevealed: boolean;
  createdAt: Date;
}

export type PlayerDto = {
  userId: string;
  userName: string | null;
  role: PlayerRoleDto;
  vote: string | null;
}

export type PlayerRoleDto = (typeof PlayerRole)[keyof typeof PlayerRole];

export var PlayerRole = {
  USER: 'USER',
  VIEWER: 'VIEWER',
} as const;

export type UserDto = {
  id: string;
  name: string;
}
