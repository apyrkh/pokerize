import { StartPlaningButton } from '@/components/button';
import { Footer } from '@/components/footer';
import { getText } from '@/utils';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {getText('app.name')} <sup>alpha</sup>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.slogan}>
          <h1>{getText('app.slogan')}</h1>
        </section>

        <div className={styles.action}>
          <StartPlaningButton />
        </div>

        <section className={styles.features}>
          <h2>{getText('app.features')}</h2>
        </section>
      </main>

      <Footer />
    </div>
  );
}
