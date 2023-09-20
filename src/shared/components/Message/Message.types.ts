import type { HTMLAttributes, PropsWithChildren } from 'react';

import type { AvatarProps } from '@components/Avatar/Avatar.types';

export interface MessageProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement> & Pick<AvatarProps, 'name'>> {
  date?: string | Date;
}
