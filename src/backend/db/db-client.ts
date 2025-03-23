import { createClient } from '@supabase/supabase-js';
import { Database } from '@/model';

var supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export var db = {
  countRooms: async () => {
    var { count, error } = await supabase.from('room').select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count ?? 0;
  },

  getRoom: async (id: string) => {
    return await supabase.from('room').select('*, player(*)').eq('id', id).single();
  },

  createRoom: async () => {
    var { data, error } = await supabase.from('room').insert({}).select('*, player(*)').single();
    if (error) throw error;
    return data;
  },

  insertPlayer: async ({ roomId, userId, userName, role }: { roomId: string; userId: string; userName?: string; role: 'USER' | 'VIEWER' }) => {
    return await supabase
      .from('player')
      .insert([{ room_id: roomId, user_id: userId, user_name: userName, role }])
      .select()
      .single();
  },

  updatePlayer: async (roomId: string, userId: string, { userName, role }: { userName?: string; role?: 'USER' | 'VIEWER' }) => {
    return await supabase
      .from('player')
      .update({ user_name: userName, role: role })
      .match({ room_id: roomId, user_id: userId })
      .select()
      .single();
  },
};
