import { db } from '@/db-client';
import { cn, getText } from '@/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  var { id } = await params;
  var room = await db.getRoom(id);

  (room === null && notFound());

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.link}>
            {getText('app.name')} <sup>beta</sup>
          </Link>
        </div>
      </header>

      <main className={styles.main} >
        <div className={styles.title}>{room?.id}</div>

        <div className={styles.board}>
          <div />
          <div className={styles.player}></div>
          <div className={cn(styles.player, styles.active)}>
            Aliaks
          </div>
          <div className={styles.player}></div>
          <div className={styles.player}></div>
          <div />

          <div className={styles.player}></div>
          <div className={styles.center}></div>
          <div className={styles.player}></div>

          <div />
          <div className={styles.player}></div>
          <div className={styles.player}></div>
          <div className={styles.player}></div>
          <div className={styles.player}></div>
          <div />
        </div>
      </main>
    </div>
  )
}
