import { createSupabaseClient, db } from '@/backend';
import { roomToDto, UserDto } from '@/model';
import { getText } from '@/utils';
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

  var supabase = await createSupabaseClient();
  var { data, error } = await supabase.auth.getUser();
  var userId = data.user?.id;
  if (error || !userId) {
    return unauthorized();
  }

  var currentUser: UserDto = { id: userId, name: '' };

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
