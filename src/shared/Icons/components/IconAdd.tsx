import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconAdd component.
 *
 * @return {JSX.Element}
 */
function IconAdd({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon className={clsx('Icon--add', className)} data-testid="IconAdd" {...props}>
      <path d="M23.75 15.25C23.75 15.8023 23.3023 16.25 22.75 16.25H16.25V22.75C16.25 23.3023 15.8023 23.75 15.25 23.75H14.75C14.1977 23.75 13.75 23.3023 13.75 22.75V16.25H7.25C6.69772 16.25 6.25 15.8023 6.25 15.25V14.75C6.25 14.1977 6.69772 13.75 7.25 13.75H13.75V7.25C13.75 6.69772 14.1977 6.25 14.75 6.25H15.25C15.8023 6.25 16.25 6.69772 16.25 7.25V13.75H22.75C23.3023 13.75 23.75 14.1977 23.75 14.75V15.25Z" />
    </BaseIcon>
  );
}

export default IconAdd;
