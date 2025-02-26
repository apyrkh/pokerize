import { db, roomToDto } from '@/db';
import { cn, getText } from '@/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Room } from './room';

import styles from './page.module.css';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  var { id } = await params;

  var room = await db.getRoom(id);
  if (!room) {
    return notFound();
  }

  var cookieStore = await cookies();
  var uuidCookie = cookieStore.get('uuid');
  var userId = uuidCookie?.value;
  if (!userId) {
    return notFound();
  }

  var player = room.players.find((it) => it.userId === userId);
  if (!player) {
    var uNameCookie = cookieStore.get('uName');
    var userName = uNameCookie?.value;

    player = await db.createPlayer({
      roomId: room.id,
      userId,
      userName: userName ?? 'Unnamed',
    })
    // room = await db.getRoom(id);
  }


  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.link}>
            {getText('app.name')} <sup>alpha</sup>
          </Link>
        </div>
      </header>

        <Room room={roomToDto(room)} />
    </div>
  )
}
