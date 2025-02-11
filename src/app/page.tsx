import { Footer } from "@/components/footer";
import { cn, getText } from "@/utils";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={cn(styles.header, 'content')}>
        <div className={styles.headerContent}>
          {getText('app.name')} <sup>beta</sup>
        </div>
      </header>

      <main className="content">
        <div className={styles.mainContent}>
          <section className={styles.slogan}>
            <h1>
              {getText('app.slogan')}
            </h1>
          </section>

          <div className={styles.action}>
            <button type="button" className={styles.btn}>
              {getText('b.get_started')}
            </button>
          </div>

          <section className={styles.features}>
            <h2>
              {getText('app.features')}
            </h2>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
