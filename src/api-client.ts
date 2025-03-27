import { createBrowserClient } from '@supabase/ssr';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import type { PlayerDto, RoomDto, Tables, UpdatePlayerDto } from './model';

var supabase = createBrowserClient(
  // biome-ignore lint/style/noNonNullAssertion: it is required env
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // biome-ignore lint/style/noNonNullAssertion: it is required env
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export var api = {
  // REST app api
  createRoom: async (): Promise<RoomDto> => {
    var res = await fetch('/api/room', {
      method: 'POST',
    });
    if (!res.ok) {
      throw new Error('Failed to create room');
    }

    return res.json();
  },
  updatePlayer: async (
    roomId: string,
    userId: string,
    player: UpdatePlayerDto,
  ): Promise<PlayerDto> => {
    var res = await fetch(`/api/player/${roomId}_${userId}`, {
      method: 'POST',
      body: JSON.stringify(player),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error('Failed to update player');
    }

    return res.json();
  },

  // supabase api
  subscribePlayers: (
    roomId: string,
    callback: (payload: RealtimePostgresChangesPayload<Tables<'player'>>) => void,
  ) => {
    return supabase
      .channel(`players_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'player',
          filter: `room_id=eq.${roomId}`,
        },
        callback,
      )
      .subscribe();
  },
};
