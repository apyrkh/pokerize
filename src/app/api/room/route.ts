import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // @TODO: MVP restriction
    const roomCount = await prisma.room.count();
    if (roomCount >= 10_000) {
      return NextResponse.json({ error: 'Room limit reached' }, { status: 400 });
    }
    // @TODO: MVP restriction

    const room = await prisma.room.create({ data: {} });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Failed to create room', error);

    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
