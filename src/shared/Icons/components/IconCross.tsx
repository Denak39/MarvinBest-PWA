import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconCross component.
 *
 * @return {JSX.Element}
 */
function IconCross({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon className={clsx('Icon--cross', className)} data-testid="IconCross" {...props}>
      <path d="M21.0104 21.3639C20.6199 21.7545 19.9867 21.7545 19.5962 21.3639L15 16.7677L10.4038 21.3639C10.0133 21.7545 9.38012 21.7545 8.98959 21.3639L8.63604 21.0104C8.24551 20.6199 8.24552 19.9867 8.63604 19.5962L13.2322 15L8.63604 10.4038C8.24551 10.0133 8.24552 9.3801 8.63604 8.98957L8.98959 8.63602C9.38012 8.24549 10.0133 8.24549 10.4038 8.63602L15 13.2322L19.5962 8.63602C19.9867 8.24549 20.6199 8.24549 21.0104 8.63602L21.364 8.98957C21.7545 9.3801 21.7545 10.0133 21.364 10.4038L16.7678 15L21.364 19.5962C21.7545 19.9867 21.7545 20.6199 21.364 21.0104L21.0104 21.3639Z" />
    </BaseIcon>
  );
}

export default IconCross;
