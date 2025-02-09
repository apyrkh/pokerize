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
          <Link href="/">
            <Image src="/img/logo.png" alt="Logo" width="100" height="24" />
          </Link>

          <span>
            {getText('app.name')} <sup>beta</sup>
          </span>
        </div>
      </header>

      <main className={styles.main}>
      </main>

      <footer className={cn(styles.footer, styles.container)}>
        <div className={styles.footerContent}>
          <span>
            {getText('app.coppyright')}
          </span>

          <Link href="https://github.com/apyrkh/pokerize" target="_blank" rel="noopener noreferrer">
            <Image src="/img/github-mark-white.png" alt="GitHub" width="15" height="15" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
