'use client';

import { api } from '@/api-client';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { type PlayerDto, PlayerRole, type PlayerRoleDto } from '@/model';
import { type FormEvent, useState } from 'react';

import css from './player-entry-gate.module.css';

type PlayerEntryGateProps = {
  player: PlayerDto;
};

export var PlayerEntryGate = ({ player }: PlayerEntryGateProps) => {
  var { 0: isLoading, 1: setIsLoading } = useState(false);
  var { 0: userName, 1: setUserName } = useState(player.userName ?? '');

  var doJoin = async (role?: PlayerRoleDto) => {
    if (!userName) {
      return;
    }

    setIsLoading(true);
    try {
      await api.updatePlayer(player.roomId, player.userId, { userName, role });
      await new Promise((res) => setTimeout(res, 2000));
    } finally {
      setIsLoading(false);
    }
  };

  var handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    doJoin(PlayerRole.USER);
  };

  var handleSpectate = () => doJoin(PlayerRole.VIEWER);

  return (
    <div className={css.backdrop}>
      <form onSubmit={handleSubmit} className={css.form}>
        <fieldset className={css.fieldset}>
          <Input
            placeholder="...enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={isLoading}
            className={css.input}
          />
          <Button type="submit" disabled={isLoading}>
            Join
          </Button>
        </fieldset>

        <p>or</p>

        <Button kind="tertiary" type="button" onClick={handleSpectate} disabled={isLoading}>
          Spectate
        </Button>
      </form>
    </div>
  );
};
