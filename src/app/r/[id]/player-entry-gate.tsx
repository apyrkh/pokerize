import { api } from '@/api-client';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import {
  type PlayerDto,
  PlayerRole,
  type PlayerRoleDto,
  type RoomDto,
  type UserDto,
} from '@/model';
import { getText } from '@/utils';
import { type FormEventHandler, type MouseEventHandler, useState } from 'react';

import css from './player-entry-gate.module.css';

type PlayerEntryGateProps = {
  room: RoomDto;
  user: UserDto;
  onJoin: (player: PlayerDto) => unknown;
};

export var PlayerEntryGate = ({ room, user, onJoin }: PlayerEntryGateProps) => {
  var { 0: isLoading, 1: setIsLoading } = useState(false);
  var { 0: userName, 1: setUserName } = useState('');

  var doJoin = async (role: PlayerRoleDto) => {
    if (!userName) {
      return;
    }

    setIsLoading(true);
    try {
      var player = await api.joinRoom({ roomId: room.id, userId: user.id, userName, role });
      onJoin(player);

      // @TODO: === CLEAN UP DEBUG CODE ===
      await new Promise((res) => setTimeout(res, 2000));
      // @TODO: === CLEAN UP DEBUG CODE ===
    } finally {
      setIsLoading(false);
    }
  };

  var handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    doJoin(PlayerRole.USER);
  };

  var handleSpectate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    doJoin(PlayerRole.VIEWER);
  };

  return (
    <div className={css.backdrop}>
      <form onSubmit={handleSubmit} className={css.form}>
        <fieldset className={css.fieldset}>
          <Input
            placeholder={getText('p.your_name')}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={isLoading}
            className={css.input}
          />
          <Button type="submit" disabled={isLoading}>
            {getText('b.join')}
          </Button>
        </fieldset>

        <p>or</p>

        <Button kind="tertiary" type="button" onClick={handleSpectate} disabled={isLoading}>
          {getText('b.spectate')}
        </Button>
      </form>
    </div>
  );
};
