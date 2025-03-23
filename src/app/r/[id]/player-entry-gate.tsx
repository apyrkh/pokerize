'use client';

import { api } from '@/api-client';
import { PlayerDto } from '@/model';
import { useState } from 'react';

import styles from './player-entry-gate.module.css'

type PlayerEntryGateProps = {
  player: PlayerDto;
}

export var PlayerEntryGate = ({ player }: PlayerEntryGateProps) => {
  var { 0: isLoading, 1: setIsLoading } = useState(false);
  var { 0: userName, 1: setUserName } = useState(player.userName ?? '');

  var handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await api.updatePlayer(player.roomId, player.userId, { userName });
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
