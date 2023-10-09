import type { CSSProperties, HTMLAttributes } from 'react';

export interface SkeletonProps
  extends HTMLAttributes<HTMLSpanElement>,
    Pick<CSSProperties, 'height' | 'width'> {
  delay?: CSSProperties['animationDelay'];
}
