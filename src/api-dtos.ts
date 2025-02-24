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

export const PlayerRole = {
  USER: 'USER',
  VIEWER: 'VIEWER',
};
