import { RoomDto } from "./api-dtos";

export const api = {
  createRoom: async (): Promise<RoomDto> => {
    const res = await fetch("/api/room", {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to create room");

    return res.json();
  },
}
