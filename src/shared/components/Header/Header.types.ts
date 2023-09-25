import type { HTMLAttributes } from 'react';

export interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  title: string;
  goBack?: boolean;
}
