import { cn } from '@/utils';
import type { InputHTMLAttributes } from 'react';

import css from './input.module.css';

export var Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={cn(css.input, className)} {...props} />;
};
