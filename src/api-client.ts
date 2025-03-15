import { PlayerDto, RoomDto, UserDto } from './backend';

export var api = {
  createRoom: async (): Promise<RoomDto> => {
    var res = await fetch('/api/room', {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to create room');

    return res.json();
  },
  joinRoom: async (roomId: string, user: UserDto): Promise<PlayerDto> => {
    var res = await fetch(`/api/room/${roomId}/join`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to join room');

    return res.json();
  }
}
