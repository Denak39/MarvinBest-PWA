import type { HTMLAttributes } from 'react';

import type { HeaderProps } from '@components/Header/Header.types';

export interface BaseErrorPageProps extends HTMLAttributes<HTMLDivElement> {
  title: HeaderProps['title'];
}
