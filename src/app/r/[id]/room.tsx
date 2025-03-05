"use client";

import { RoomDto, UserDto } from '@/api-dtos';
import { PlayerEntryGate } from './player-entry-gate';
import { PlayerSlot } from './player-slot';

import styles from './room.module.css';

type RoomProps = {
  room: RoomDto;
  user: UserDto;
}

export var Room = ({ room, user }: RoomProps) => {
  var players = room.players;

  var hasPlayer = players.some((it) => it.userId === user.id);

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

      {!hasPlayer &&
        <PlayerEntryGate roomId={room.id} user={user} />
      }
    </div>
  )
}
