import { cn } from '@/utils';
import type { ButtonHTMLAttributes } from 'react';

import css from './button.module.css';

type ButtonProps = {
  kind?: 'primary' | 'secondary' | 'tertiary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export var Button = ({ kind = 'primary', className, children, ...props }: ButtonProps) => {
  return (
    <button className={cn(className, css.btn, css[kind])} {...props}>
      {children}
    </button>
  );
};
