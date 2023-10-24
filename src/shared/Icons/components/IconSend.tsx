import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconSend component.
 *
 * @return {JSX.Element}
 */
function IconSend({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon className={clsx('Icon--send', className)} data-testid="IconSend" {...props}>
      <path d="M6.00882 23.4769C6.00983 24.1965 6.74779 24.6795 7.4077 24.3925L26.8919 15.917C27.6934 15.5684 27.6934 14.4317 26.8919 14.083L7.4077 5.60759C6.74779 5.32054 6.00983 5.80355 6.00882 6.52318L6.00122 11.9166C6.00052 12.4116 6.36208 12.8326 6.85151 12.9067L20.6762 15L6.85151 17.0933C6.36208 17.1674 6.00052 17.5884 6.00122 18.0835L6.00882 23.4769Z" />
    </BaseIcon>
  );
}

export default IconSend;
