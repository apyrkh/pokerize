import { db } from '@/backend';
import { PlayerRole, playerToDto, UserDto } from '@/model';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ roomId: string }> }) {
  try {
    var { roomId } = await params;
    var user: UserDto = await req.json();

    var player = await db.upsertPlayer({
      roomId,
      userId: user.id,
      userName: user.name,
      role: PlayerRole.USER,
    });
    if (!player) {
      throw new Error('Failed to join room');
    }

    var res = NextResponse.json(playerToDto(player), { status: 201 });
    res.cookies.set('uName', user.name, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return res;
  } catch (error) {
    console.error('Failed to join room', error);

    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
  }
}
