import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconSmallArrowDown component.
 *
 * @return {JSX.Element}
 */
function IconSmallArrowDown({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon
      className={clsx('Icon--small-arrow-down', className)}
      data-testid="IconSmallArrowDown"
      {...props}
    >
      <path d="M7.45529 11.5826C7.93407 11.1395 8.67303 11.1391 9.15229 11.5816L14.9971 16.9786L20.8419 11.5816C21.3212 11.1391 22.0602 11.1395 22.5389 11.5826L22.7557 11.7831C23.2904 12.2779 23.2904 13.1233 22.7557 13.618L14.9971 20.7978L7.23853 13.618C6.70386 13.1233 6.70386 12.2779 7.23853 11.7831L7.45529 11.5826Z" />
    </BaseIcon>
  );
}

export default IconSmallArrowDown;
