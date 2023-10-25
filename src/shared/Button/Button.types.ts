import type { ButtonHTMLAttributes, ElementType } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconLeft?: ElementType;
  iconRight?: ElementType;
  variant?: 'primary' | 'secondary';
}
