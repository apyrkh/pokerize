import { PrismaClient, Role } from '@prisma/client'

var prisma = new PrismaClient();

export var db = {
  countRooms: () => {
    return prisma.room.count();
  },
  getRoom: (id: string) => {
    return prisma.room.findUnique({
      where: { id },
      include: { players: true },
    });
  },
  createRoom: () => {
    return prisma.room.create({ data: {}, include: { players: true } });
  },

  getPlayer: (roomId: string, userId: string) => {
    return prisma.player.findUnique({
      where: {
        roomId_userId: {
          roomId,
          userId,
        },
      },
    });
  },
  upsertPlayer: ({ roomId, userId, userName, role }: { roomId: string, userId: string, userName: string, role?: Role }) => {
    return prisma.player.upsert({
      where: { roomId_userId: { roomId, userId } },
      create: { roomId, userId, userName, role: role ?? Role.USER },
      update: { userName, role: role ?? Role.USER },
    });
  }
}
