"use client";

import { RoomDto, UserDto } from '@/api-dtos';
import { PlayerEntryGate } from './player-entry-gate';
import { PlayerSlot } from './player-slot';

import styles from './room.module.css';
import { useEffect } from 'react';

type RoomProps = {
  room: RoomDto;
  user: UserDto;
}

export var Room = ({ room, user }: RoomProps) => {
  var players = room.players;

  var isJoint = players.some((it) => it.userId === user.id);

  useEffect(() => {
    var eventSource = new EventSource(`/api/room/${room.id}/subscribe`);

    eventSource.onopen = () => {
      console.log('SSE connection opened');

    };

    eventSource.onmessage = (event: MessageEvent) => {
      console.log('SSE message received:', JSON.parse(event.data));
    }

    eventSource.onerror = (err) => {
      if (eventSource.readyState === EventSource.CLOSED) {
        console.log('SSE connection closed by server');
      } else {
        console.error('SSE error:', err);
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
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

      {!isJoint &&
        <PlayerEntryGate roomId={room.id} user={user} />
      }
    </div>
  )
}
