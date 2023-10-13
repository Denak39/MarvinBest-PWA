import clsx from 'clsx';

import type { TextFieldProps } from '@shared/Form/TextField/TextField.types';

/**
 * TextField component.
 *
 * @param {TextFieldProps} props Props
 * @return {JSX.Element}
 */
function TextField({ className, ...props }: TextFieldProps): JSX.Element {
  return <input className={clsx('TextField', className)} data-testid="TextField" {...props} />;
}

export default TextField;
