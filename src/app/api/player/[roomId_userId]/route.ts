import { db } from '@/backend';
import { playerToDto, UpdatePlayerDto } from '@/model';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ roomId_userId: string }> }) {
  var { roomId_userId } = await params;
  var { 0: roomId, 1: userId } = roomId_userId.split('_');
  var player: UpdatePlayerDto = await req.json();

  var { data } = await db.updatePlayer(roomId, userId, {
    userName: player.userName,
    role: player.role,
  });

  return data
    ? NextResponse.json(playerToDto(data), { status: 201 })
    : NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
}
