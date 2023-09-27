import { memo } from 'react';
import clsx from 'clsx';

import type { AlertProps } from '@components/Alert/Alert.types';

import '@components/Alert/Alert.scss';

function Alert({ children, className, isVisible, ...props }: AlertProps): JSX.Element {
  return (
    <div
      className={clsx('Alert', { 'Alert--is-visible': isVisible }, className)}
      data-testid="Alert"
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(Alert);
