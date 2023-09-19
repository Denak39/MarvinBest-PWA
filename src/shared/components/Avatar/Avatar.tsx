import { memo } from 'react';

import type { AvatarProps } from '@components/Avatar/Avatar.types';

import '@components/Avatar/Avatar.scss';

function Avatar({ initial, ...props }: AvatarProps): JSX.Element {
  return (
    <div className="Avatar" {...props}>
      <p>{initial}</p>
    </div>
  );
}

export default memo(Avatar);
