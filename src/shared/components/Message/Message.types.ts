import type { HTMLAttributes } from 'react';

import type { AvatarProps } from '@components/Avatar/Avatar.types';

export interface MessageProps extends HTMLAttributes<HTMLDivElement>, Pick<AvatarProps, 'name'> {
  date?: string | Date;
}
