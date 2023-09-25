import type { ButtonHTMLAttributes, ElementType } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  component?: ElementType;
  size?: 'medium' | 'large';
}
