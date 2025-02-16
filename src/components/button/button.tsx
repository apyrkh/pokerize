import { cn } from "@/utils";

import styles from "./button.module.css";

export const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button className={cn(styles.btn, className)} {...props}>{children}</button>;
};
