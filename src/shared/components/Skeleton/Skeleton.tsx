import { memo } from 'react';
import clsx from 'clsx';

import type { SkeletonProps } from '@components/Skeleton/Skeleton.types';

import '@components/Skeleton/Skeleton.scss';

function Skeleton({ className, delay, height, style, width, ...attr }: SkeletonProps): JSX.Element {
  return (
    <span
      className={clsx('Skeleton', className)}
      style={{ ...style, animationDelay: delay, height, width }}
      {...attr}
    />
  );
}

export default memo(Skeleton);
