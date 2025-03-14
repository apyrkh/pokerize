import { createClient } from '@supabase/supabase-js';
import { Database } from './db-types';

const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export const db = {
  countRooms: async () => {
    const { count, error } = await supabase.from('room').select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count ?? 0;
  },

  getRoom: async (id: string) => {
    const { data, error } = await supabase.from('room').select('*, player(*)').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  createRoom: async () => {
    const { data, error } = await supabase.from('room').insert({}).select('*, player(*)').single();
    if (error) throw error;
    return data;
  },

  getPlayer: async (roomId: string, userId: string) => {
    const { data, error } = await supabase
      .from('player')
      .select('*')
      .eq('room_id', roomId)
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  upsertPlayer: async ({ roomId, userId, userName, role = 'USER' }: { roomId: string; userId: string; userName: string; role?: 'USER' | 'VIEWER' }) => {
    const { data, error } = await supabase
      .from('player')
      .upsert([{ room_id: roomId, user_id: userId, user_name: userName, role }], { onConflict: 'room_id, user_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
