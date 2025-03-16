import { PlayerDto } from '@/model';
import { cn } from '@/utils';

import styles from './player-slot.module.css';

type PlayerSlotProps = {
  player?: PlayerDto;
}

export var PlayerSlot = ({ player }: PlayerSlotProps) => {
  return (
    <div className={cn(styles.player, player && styles.active)}>
      {player?.userName}
    </div>
  )
}
