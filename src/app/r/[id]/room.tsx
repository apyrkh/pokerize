"use client";

import { RoomDto } from '@/api-dtos';
import { PlayerSlot } from './player-slot';

import styles from './room.module.css';

type RoomProps = {
  room: RoomDto;
}

export var Room = ({ room }: RoomProps) => {
  var players = room.players;

  return (
    <div className={styles.room} >
      <div className={styles.title}>{room.name ?? room.id}</div>

      <div className={styles.stage}>
        <div />
        <PlayerSlot player={players[4]}/>
        <PlayerSlot player={players[0]} />
        <PlayerSlot player={players[1]}/>
        <PlayerSlot player={players[5]}/>
        <div />

        <PlayerSlot player={players[8]}/>
        <div className={styles.board}></div>
        <PlayerSlot player={players[9]}/>

        <div />
        <PlayerSlot player={players[7]}/>
        <PlayerSlot player={players[3]} />
        <PlayerSlot player={players[2]}/>
        <PlayerSlot player={players[6]}/>
        <div />
      </div>
    </div>
  )
}
