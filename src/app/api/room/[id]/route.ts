import { db } from '@/backend';
import { roomToDto } from '@/model';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  var { id } = await params;
  var { data, error } = await db.getRoom(id);
  if (error) {
    console.error('Failed to get room', error);
  }

  return data
    ? NextResponse.json(roomToDto(data), { status: 200 })
    : NextResponse.json({ error: 'Failed to get room' }, { status: 500 });
}
