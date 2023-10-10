import { memo } from 'react';
import clsx from 'clsx';

import type { AvatarProps } from '@shared/Avatar/Avatar.types';

/**
 * Avatar component.
 *
 * @param {AvatarProps} props Props
 * @return {JSX.Element}
 */
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
