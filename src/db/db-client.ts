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
    return prisma.room.create({ data: {} });
  },

  getPlayerByRoomIdAndUserId: (roomId: string, userId: string) => {
    return prisma.player.findUnique({
      where: {
        roomId_userId: {
          roomId,
          userId,
        },
      },
    });
  },
  createPlayer: ({ roomId, userId, userName, role }: { roomId: string, userId: string, userName: string, role?: Role }) => {
    return prisma.player.create({ data: { roomId, userId, userName, role: role ?? Role.VIEWER } })
  }
}
