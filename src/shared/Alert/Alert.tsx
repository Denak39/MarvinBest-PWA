import { memo } from 'react';
import clsx from 'clsx';

import type { AlertProps } from '@shared/Alert/Alert.types';

/**
 * Alert component.
 *
 * @param {AlertProps} props Props
 * @return {JSX.Element}
 */
function Alert({ children, className, isVisible, ...props }: AlertProps): JSX.Element {
  return (
    <div
      className={clsx('Alert', { 'Alert--is-visible': isVisible }, className)}
      data-testid="Alert"
      hidden={!isVisible}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(Alert);
