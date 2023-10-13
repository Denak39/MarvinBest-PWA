import { memo } from 'react';
import clsx from 'clsx';

import type { SkeletonProps } from '@shared/Skeleton/Skeleton.types';

/**
 * Skeleton component.
 *
 * @param {SkeletonProps} props Props
 * @return {JSX.Element}
 */
function Skeleton({ className, delay, style, ...attr }: SkeletonProps): JSX.Element {
  return (
    <span
      className={clsx('Skeleton', className)}
      style={{ ...style, animationDelay: delay }}
      data-testid="Skeleton"
      {...attr}
    />
  );
}

export default memo(Skeleton);
