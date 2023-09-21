import type { HTMLAttributes, PropsWithChildren } from 'react';

import type { AvatarProps } from '@components/Avatar/Avatar.types';

export interface MessageProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement> & Pick<AvatarProps, 'initial'>> {
  date?: string | Date;
}
