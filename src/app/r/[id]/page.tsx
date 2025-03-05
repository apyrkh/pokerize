import { UserDto } from '@/api-dtos';
import { db, roomToDto } from '@/db';
import { getText } from '@/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, unauthorized } from 'next/navigation';
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
    return unauthorized();
  }
  var uNameCookie = cookieStore.get('uName');
  var userName = uNameCookie?.value ?? '';
  var currentUser: UserDto = { id: userId, name: userName };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.link}>
            {getText('app.name')} <sup>alpha</sup>
          </Link>
        </div>
      </header>

      <Room room={roomToDto(room)} user={currentUser} />
    </div>
  )
}
