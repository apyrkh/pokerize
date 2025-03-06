import { getText } from "@/utils";
import Link from "next/link";
import Image from "next/image";

import styles from "./footer.module.css";

export var Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>
          {getText('app.coppyright')}
        </span>

        <Link href="https://github.com/apyrkh/pokerize" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/img/github-mark-white.png" 
            alt="GitHub" 
            width="20" 
            height="20"
            priority={true} 
            placeholder="empty" 
          />
        </Link>
      </div>
    </footer>
  )
}
