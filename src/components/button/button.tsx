import { cn } from "@/utils";

import styles from "./button.module.css";

export var Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button className={cn(styles.btn, className)} {...props}>{children}</button>;
};
