"use client";

import { api } from "@/api-client";
import { getText } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";

export var GetStartedButton = () => {
  var router = useRouter();
  var [loading, setLoading] = useState(false);

  var handleGetStarted = async () => {
    setLoading(true);
    try {
      var room = await api.createRoom();
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
