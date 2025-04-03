import { db } from '@/backend';
import { type InsertPlayerDto, playerToDto } from '@/model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  var player: InsertPlayerDto = await req.json();

  var { data, error } = await db.insertPlayer({
    roomId: player.roomId,
    userId: player.userId,
    userName: player.userName,
    role: player.role,
  });
  if (error) {
    console.error('Failed to join room', error);
  }

  return data
    ? NextResponse.json(playerToDto(data), { status: 201 })
    : NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
}
