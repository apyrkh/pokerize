import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        Pokerize header
      </header>
      <main className={styles.main}>
        Pokerize main
      </main>
      <footer className={styles.footer}>
        Pokerize footer
      </footer>
    </div>
  );
}
