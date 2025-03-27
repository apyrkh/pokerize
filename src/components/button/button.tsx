import { cn } from '@/utils';
import type { ButtonHTMLAttributes } from 'react';

import styles from './button.module.css';

export var Button = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={cn(styles.btn, className)} {...props}>
      {children}
    </button>
  );
};
