import clsx from 'clsx';

import type { BaseIconProps } from '@shared/Icons/types';

/**
 * BaseIcon component.
 *
 * @param {BaseIconProps} props Props
 * @return {JSX.Element}
 */
function BaseIcon({ children, className, ...props }: BaseIconProps): JSX.Element {
  return (
    <span aria-hidden className={clsx('Icon', className)} data-testid="BaseIcon" {...props}>
      <svg
        aria-hidden
        fill="currentColor"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
      >
        {children}
      </svg>
    </span>
  );
}

export default BaseIcon;
