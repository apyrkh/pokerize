import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import type { PlayerDto, RoomDto, Tables, UserDto } from './model';

var supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

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
  },

  subscribePlayers: (roomId: string, callback: (payload: RealtimePostgresChangesPayload<Tables<'player'>>) => void) => {
    return supabase
      .channel(`players_${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'player', filter: `room_id=eq.${roomId}` },
        callback,
      )
      .subscribe()
  }
}
