import { createSupabaseClient, db } from '@/backend';
import { roomToDto, userToDto } from '@/model';
import { getText } from '@/utils';
import Link from 'next/link';
import { notFound, unauthorized } from 'next/navigation';
import { Room } from './room';

import styles from './page.module.css';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  var { id } = await params;
  var supabase = await createSupabaseClient();

  var {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return unauthorized();
  }

  var { data: room, error: roomError } = await db.getRoom(id);
  if (roomError || !room) {
    return notFound();
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

      <Room room={roomToDto(room)} user={userToDto(user)} />
    </div>
  );
}
