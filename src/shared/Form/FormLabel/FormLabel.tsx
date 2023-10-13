import { memo } from 'react';
import clsx from 'clsx';

import type { FormLabelProps } from '@shared/Form/FormLabel/FormLabel.types';

/**
 * FormLabel component.
 *
 * @param {FormLabelProps} props Props
 * @return {JSX.Element}
 */
function FormLabel({ children, className, ...props }: FormLabelProps): JSX.Element {
  return (
    <label className={clsx('FormLabel', className)} data-testid="FormLabel" {...props}>
      {children}
    </label>
  );
}

export default memo(FormLabel);
