import type { ButtonHTMLAttributes, ElementType } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ElementType;
}
