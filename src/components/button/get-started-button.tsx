"use client";

import { api } from "@/api-client";
import { getText } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";

export const GetStartedButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true);
    try {
      const room = await api.createRoom();
      router.push(`/r/${room.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="button" onClick={handleGetStarted} disabled={loading}>
      {getText('b.get_started')}
    </Button>
  )
}
