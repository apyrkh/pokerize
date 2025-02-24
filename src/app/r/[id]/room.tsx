import { RoomDto } from '@/api-dtos';
import { cn } from '@/utils';

import styles from './room.module.css';

type RoomProps = {
  room: RoomDto;
}

export var Room = ({ room }: RoomProps) => {
  return (
    <div className={styles.room} >
      <div className={styles.title}>{room.name ?? room.id}</div>

      <div className={styles.stage}>
        <div />
        <div className={styles.player}></div>
        <div className={cn(styles.player, styles.active)}>
          Aliaks
        </div>
        <div className={styles.player}></div>
        <div className={styles.player}></div>
        <div />

        <div className={styles.player}></div>
        <div className={styles.board}></div>
        <div className={styles.player}></div>

        <div />
        <div className={styles.player}></div>
        <div className={styles.player}></div>
        <div className={styles.player}></div>
        <div className={styles.player}></div>
        <div />
      </div>
    </div>
  )
}
