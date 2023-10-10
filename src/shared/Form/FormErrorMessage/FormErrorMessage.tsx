import { memo } from 'react';
import clsx from 'clsx';
import { useField } from 'formik';

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
  name,
  ...props
}: FormErrorMessageProps): JSX.Element | null {
  const [, meta] = useField(name);

  if (!meta.touched || !meta.error) return null;

  return (
    <p className={clsx('FormErrorMessage', className)} data-testid="FormErrorMessage" {...props}>
      {meta.error}
    </p>
  );
}

export default memo(FormErrorMessage);
