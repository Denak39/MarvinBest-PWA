import type { HTMLAttributes } from 'react';

import type { AvatarProps } from '@shared/Avatar/Avatar.types';

export interface MessageProps extends HTMLAttributes<HTMLDivElement>, Pick<AvatarProps, 'name'> {
  date?: string | Date;
  isWaiting?: boolean;
}
