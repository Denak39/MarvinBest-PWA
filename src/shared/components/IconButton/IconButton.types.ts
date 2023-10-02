import type { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}
