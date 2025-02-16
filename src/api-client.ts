const createRoom = async () => {
  const res = await fetch("/api/room", {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to create room");

  return res.json();
}

export const api = {
  createRoom,
}
