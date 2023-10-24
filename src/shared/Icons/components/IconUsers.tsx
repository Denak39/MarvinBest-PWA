import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconUsers component.
 *
 * @return {JSX.Element}
 */
function IconUsers({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon className={clsx('Icon--users', className)} data-testid="IconUsers" {...props}>
      <path d="M20.625 15C22.35 15 23.7375 13.6 23.7375 11.875C23.7375 10.15 22.35 8.75 20.625 8.75C18.9 8.75 17.5 10.15 17.5 11.875C17.5 13.6 18.9 15 20.625 15ZM11.25 13.75C13.325 13.75 14.9875 12.075 14.9875 10C14.9875 7.925 13.325 6.25 11.25 6.25C9.175 6.25 7.5 7.925 7.5 10C7.5 12.075 9.175 13.75 11.25 13.75ZM20.625 17.5C18.3375 17.5 13.75 18.65 13.75 20.9375V22.5C13.75 23.1904 14.3096 23.75 15 23.75H26.25C26.9404 23.75 27.5 23.1904 27.5 22.5V20.9375C27.5 18.65 22.9125 17.5 20.625 17.5ZM11.25 16.25C8.3375 16.25 2.5 17.7125 2.5 20.625V22.5C2.5 23.1904 3.05964 23.75 3.75 23.75H11.25V20.9375C11.25 19.917 11.6305 18.1585 13.92 16.7696C14.0191 16.7094 13.9956 16.556 13.8816 16.5344C12.9135 16.3508 11.991 16.25 11.25 16.25Z" />
    </BaseIcon>
  );
}

export default IconUsers;
