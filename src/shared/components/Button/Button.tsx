import clsx from 'clsx';

import type { ButtonProps } from '@components/Button/Button.types';

import '@components/Fields/SelectField/SelectField.scss';

function Button({ className, ...props }: ButtonProps): JSX.Element {
  return <button className={clsx('Button', className)} {...props} />;
}

export default Button;
