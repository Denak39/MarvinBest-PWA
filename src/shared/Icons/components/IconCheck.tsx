import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconCheck component.
 *
 * @return {JSX.Element}
 */
function IconCheck({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon className={clsx('Icon--check', className)} data-testid="IconCheck" {...props}>
      <path
        clipRule="evenodd"
        d="M22.1954 8.38287C22.6836 7.8952 23.4747 7.89544 23.9626 8.38339L24.3113 8.7321C24.7995 9.22025 24.7995 10.0117 24.3113 10.4999L12.3417 22.4695L5.88699 16.0149C5.39762 15.5255 5.39902 14.7316 5.89012 14.244L6.24591 13.8907C6.73456 13.4055 7.52361 13.4069 8.01055 13.8938L12.3418 18.225L22.1954 8.38287Z"
        fillRule="evenodd"
      />
    </BaseIcon>
  );
}

export default IconCheck;
