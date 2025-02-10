import { getText } from "@/utils";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/class-name";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={cn(styles.header, styles.container)}>
        <div className={styles.headerContent}>
          {getText('app.name')} <sup>beta</sup>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.main}>
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

      <footer className={cn(styles.footer, styles.container)}>
        <div className={styles.footerContent}>
          <span>
            {getText('app.coppyright')}
          </span>

          <Link href="https://github.com/apyrkh/pokerize" target="_blank" rel="noopener noreferrer">
            <Image src="/img/github-mark-white.png" alt="GitHub" width="20" height="20" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
