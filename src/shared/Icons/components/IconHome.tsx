import clsx from 'clsx';

import BaseIcon from '@shared/Icons/components/BaseIcon';
import type { BaseIconProps } from '@shared/Icons/types';

/**
 * IconHome component.
 *
 * @return {JSX.Element}
 */
function IconHome({ className, ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon className={clsx('Icon--home', className)} data-testid="IconHome" {...props}>
      <path d="M12.0364 6.11951C13.769 4.62683 16.231 4.62683 17.9636 6.11951C17.9751 6.12941 17.9864 6.13945 17.9977 6.14964L23.4994 11.1422C24.475 11.99 25 13.2385 25 14.4729V20.4847C25 20.5153 24.9992 20.5459 24.9976 20.5765C24.872 22.9887 23.0421 25 20.5176 25H9.48235C7.00478 25 5 22.9374 5 20.4847V14.4729C5 13.2163 5.54085 11.9971 6.49158 11.1504L12.0023 6.14964C12.0136 6.13945 12.0249 6.12941 12.0364 6.11951Z" />
    </BaseIcon>
  );
}

export default IconHome;
