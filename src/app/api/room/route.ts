import { db, roomToDto } from '@/db';
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

    return NextResponse.json(roomToDto(room), { status: 201 });
  } catch (error) {
    console.error('Failed to create room', error);

    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
