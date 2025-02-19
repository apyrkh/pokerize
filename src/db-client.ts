import { PrismaClient } from '@prisma/client'

var prisma = new PrismaClient();

var countRooms = () => {
  return prisma.room.count();
}

var getRoom = (id: string) => {
  return prisma.room.findUnique({
    where: {
      id,
    }
  });
}

var createRoom = () => {
  return prisma.room.create({ data: {} });
}

export var db = {
  countRooms,
  getRoom,
  createRoom,
}
