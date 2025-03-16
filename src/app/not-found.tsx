import { getText } from '@/utils';

import styles from './not-found.module.css';

export default async function NotFound() {
  return (
    <main className={styles.main}>
      <b className={styles.code}>404</b>
      {getText('t.not_found')}
    </main>
  )
}
