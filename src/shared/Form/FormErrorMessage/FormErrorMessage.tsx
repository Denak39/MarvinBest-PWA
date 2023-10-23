import { memo } from 'react';
import clsx from 'clsx';

import type { FormErrorMessageProps } from '@shared/Form/FormErrorMessage/FormErrorMessage.types';

/**
 * FormErrorMessage component.
 *
 * @param {FormErrorMessageProps} props Props
 * @return {JSX.Element|null}
 */
function FormErrorMessage({
  children,
  className,
  ...props
}: FormErrorMessageProps): JSX.Element | null {
  if (!children) return null;

  return (
    <p className={clsx('FormErrorMessage', className)} data-testid="FormErrorMessage" {...props}>
      {children}
    </p>
  );
}

export default memo(FormErrorMessage);
