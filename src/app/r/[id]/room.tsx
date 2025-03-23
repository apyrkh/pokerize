'use client';

import { api } from '@/api-client';
import { playerToDto, RoomDto, UserDto } from '@/model';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlayerEntryGate } from './player-entry-gate';
import { PlayerSlot } from './player-slot';

import styles from './room.module.css';

type RoomProps = {
  room: RoomDto;
  user: UserDto;
}

export var Room = ({ room, user }: RoomProps) => {
  const router = useRouter();
  var { 0: players, 1: setPlayers } = useState(room.players);
  var player = players.find((it) => it.userId === user.id);

  useEffect(() => {
    if (!player) {
      router.refresh();
    }
  }, [player]);

  useEffect(() => {
    var subscribtion = api.subscribePlayers(room.id, (payload) => {
      (
        (payload.eventType === 'INSERT') &&
        setPlayers((prev) => {
          return prev.concat(playerToDto(payload.new));
        })
      );
      (
        (payload.eventType === 'UPDATE') &&
        setPlayers((prev) => prev.map((it) => (
          it.userId === payload.new.user_id ? playerToDto(payload.new) : it
        )))
      );
      (
        (payload.eventType === 'DELETE') &&
        setPlayers((prev) => prev.filter((it) => (
          it.userId !== payload.old.user_id
        )))
      )
    });

    return () => {
      subscribtion.unsubscribe();
    }
  }, []);

  return (
    <div className={styles.room} >
      <div className={styles.title}>{room.name ?? room.id}</div>

      <div className={styles.stage}>
        <div />
        <PlayerSlot player={players[4]} />
        <PlayerSlot player={players[0]} />
        <PlayerSlot player={players[1]} />
        <PlayerSlot player={players[5]} />
        <div />

        <PlayerSlot player={players[8]} />
        <div className={styles.board}></div>
        <PlayerSlot player={players[9]} />

        <div />
        <PlayerSlot player={players[7]} />
        <PlayerSlot player={players[3]} />
        <PlayerSlot player={players[2]} />
        <PlayerSlot player={players[6]} />
        <div />
      </div>

      {player && !player.userName &&
        <PlayerEntryGate player={player} />
      }
    </div>
  )
}
