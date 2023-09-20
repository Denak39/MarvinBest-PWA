import { memo } from 'react';
import clsx from 'clsx';

import type { AvatarProps } from '@components/Avatar/Avatar.types';

import '@components/Avatar/Avatar.scss';

function Avatar({ className, name, ...props }: AvatarProps): JSX.Element {
  return (
    <div className={clsx('Avatar', className)} data-testid="Avatar" title={name} {...props}>
      <p>
        {name
          .split(' ')
          .map((item) => item.charAt(0))
          .join('')}
      </p>
    </div>
  );
}

export default memo(Avatar);
