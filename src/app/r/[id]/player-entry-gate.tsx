"use client";
import { api } from '@/api-client';
import { UserDto } from '@/backend';
import { useState } from 'react';

import styles from './player-entry-gate.module.css'

type PlayerEntryGateProps = {
  roomId: string;
  user: UserDto;
}

export var PlayerEntryGate = ({ roomId, user }: PlayerEntryGateProps) => {
  var [isLoading, setIsLoading] = useState(false);
  var [userName, setUserName] = useState(user.name ?? '');

  var handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await api.joinRoom(roomId, { ...user, name: userName });
      await new Promise((res) => setTimeout(res, 2000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p>Please enter your name to join the room</p>

      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        Join
      </button>
    </form>
  );
};
