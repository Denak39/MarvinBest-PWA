import clsx from 'clsx';

import type { TextFieldProps } from '@components/Fields/TextField/TextField.types';

import '@components/Fields/TextField/TextField.scss';

function TextField({ className, ...props }: TextFieldProps): JSX.Element {
  return <input className={clsx('TextField', className)} data-testid="TextField" {...props} />;
}

export default TextField;
