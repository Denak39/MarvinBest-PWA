import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconArrowBack component.
 *
 * @return {JSX.Element}
 */
function IconArrowBack({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon
      className={clsx('Icon--arrow-back', className)}
      data-testid="IconArrowBack"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.2276 5.35108C12.812 4.76676 13.7588 4.76509 14.3452 5.34734L14.701 5.70063C15.2903 6.2858 15.292 7.23844 14.7047 7.82569L9.28041 13.25H25.2858C26.1142 13.25 26.7858 13.9216 26.7858 14.75V15.25C26.7858 16.0785 26.1142 16.75 25.2858 16.75H9.27888L14.6963 22.1772C15.2812 22.7631 15.2808 23.7121 14.6954 24.2975L14.3465 24.6465C13.7607 25.2323 12.8109 25.2323 12.2251 24.6465L3.63935 16.0607C3.05357 15.4749 3.05356 14.5252 3.63935 13.9394L12.2276 5.35108Z"
        fillRule="evenodd"
      />
    </BaseIcon>
  );
}

export default IconArrowBack;
