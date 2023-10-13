import type { HTMLAttributes } from 'react';

import type { HeaderProps } from '@shared/Header/Header.types';

export interface BaseErrorPageProps extends HTMLAttributes<HTMLDivElement> {
  title: HeaderProps['title'];
}
