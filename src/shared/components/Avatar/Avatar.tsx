import { memo } from 'react';
import clsx from 'clsx';

import type { AvatarProps } from '@components/Avatar/Avatar.types';

import '@components/Avatar/Avatar.scss';

function Avatar({ initial, className, ...props }: AvatarProps): JSX.Element {
  return (
    <div className={clsx('Avatar', className)} data-testid="Avatar" {...props}>
      <p>{initial}</p>
    </div>
  );
}

export default memo(Avatar);
