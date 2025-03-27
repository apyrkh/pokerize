import { db } from '@/backend';
import { roomToDto } from '@/model';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // @TODO: MVP restriction
    var roomCount = await db.countRooms();
    if (roomCount >= 10_000) {
      return NextResponse.json({ error: 'Room limit reached' }, { status: 400 });
    }
    // @TODO: MVP restriction

    var room = await db.createRoom();
    if (!room) {
      throw new Error('Failed to create room');
    }

    return NextResponse.json(roomToDto(room), { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
