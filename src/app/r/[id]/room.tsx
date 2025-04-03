'use client';

import { api } from '@/api-client';
import { type PlayerDto, type RoomDto, type UserDto, playerToDto } from '@/model';
import { useEffect, useState } from 'react';
import { PlayerEntryGate } from './player-entry-gate';
import { PlayerSlot } from './player-slot';

import styles from './room.module.css';

type RoomProps = {
  room: RoomDto;
  user: UserDto;
};

export var Room = ({ room: initialRoom, user }: RoomProps) => {
  var { 0: room, 1: setRoom } = useState(() => initialRoom);
  var { 0: players, 1: setPlayers } = useState(() => room.players);
  var { 0: currentPlayer, 1: setCurrentPlayer } = useState(() => {
    return players.find((it) => it.userId === user.id) ?? null;
  });

  var handleJoinRoom = async (player: PlayerDto) => {
    var room = await api.getRoom(player.roomId);
    setRoom(room);
    setPlayers(room.players);
    setCurrentPlayer(player);
  };

  useEffect(() => {
    var subscribtion = api.subscribePlayers(room.id, (payload) => {
      payload.eventType === 'INSERT' &&
        setPlayers((prev) => {
          return prev.concat(playerToDto(payload.new));
        });
      payload.eventType === 'UPDATE' &&
        setPlayers((prev) =>
          prev.map((it) => (it.userId === payload.new.user_id ? playerToDto(payload.new) : it)),
        );
      payload.eventType === 'DELETE' &&
        setPlayers((prev) => prev.filter((it) => it.userId !== payload.old.user_id));
    });

    return () => {
      subscribtion.unsubscribe();
    };
  }, [room.id, setPlayers]);

  return (
    <div className={styles.room}>
      <div className={styles.title}>{room.name ?? room.id}</div>

      <div className={styles.stage}>
        <div />
        <PlayerSlot player={players[4]} />
        <PlayerSlot player={players[0]} />
        <PlayerSlot player={players[1]} />
        <PlayerSlot player={players[5]} />
        <div />

        <PlayerSlot player={players[8]} />
        <div className={styles.board} />
        <PlayerSlot player={players[9]} />

        <div />
        <PlayerSlot player={players[7]} />
        <PlayerSlot player={players[3]} />
        <PlayerSlot player={players[2]} />
        <PlayerSlot player={players[6]} />
        <div />
      </div>

      {!currentPlayer && <PlayerEntryGate room={room} user={user} onJoin={handleJoinRoom} />}
    </div>
  );
};
