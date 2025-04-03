-- ==============================================================================
-- Function: is_user_in_room
-- ==============================================================================
-- Description: Checks if a given user (p_user_id) is registered as a player
--              in a specific room (p_room_id).
-- Parameters:
--   p_room_id: TEXT - The ID of the room to check.
--   p_user_id: UUID - The ID of the user (typically from auth.uid()).
-- Returns: BOOLEAN - whether the user is in the room
-- Properties:
--   STABLE: Indicates the function doesn't modify the database and returns
--           consistent results for the same arguments within a single transaction.
--   SECURITY INVOKER: (default) the function runs with the permissions of the user
--                     who invoked the policy. This is more secure.
--   SECURITY DEFINER: Executes the function with the privileges of the user who
--                     defined the function (the owner).
-- WARNING: SECURITY DEFINER bypasses Row Level Security checks for operations
--          *inside* this function. This is necessary here to prevent infinite
--          recursion but requires caution. Ensure the function owner has
--          appropriate (but not excessive) privileges and the function logic
--          is secure against potential misuse.
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.is_user_in_room(p_room_id TEXT, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.player
    WHERE player.user_id = p_user_id AND player.room_id = p_room_id
  );
$$;
-- Grant execution permission on this function to the 'authenticated' role
GRANT EXECUTE ON FUNCTION public.is_user_in_room(TEXT, UUID) TO authenticated;


ALTER TABLE public.room ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow select only with WHERE on id" ON public.room;
CREATE POLICY "Allow select only with WHERE on id"
  ON public.room
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.room AS t WHERE t.id = public.room.id
  ));

ALTER TABLE public.player ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Players in the same room" ON public.player;
CREATE POLICY "Players in the same room"
  ON public.player
  FOR SELECT
  USING (
    public.is_user_in_room(player.room_id, auth.uid())
  );
