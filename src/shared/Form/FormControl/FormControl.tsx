import { memo } from 'react';
import clsx from 'clsx';

import type { FormControlProps } from '@shared/Form/FormControl/FormControl.types';

/**
 * FormControl component.
 *
 * @param {FormControlProps} props Props
 * @return {JSX.Element}
 */
function FormControl({ children, className, ...props }: FormControlProps): JSX.Element {
  return (
    <div className={clsx('FormControl', className)} data-testid="FormControl" {...props}>
      {children}
    </div>
  );
}

export default memo(FormControl);
