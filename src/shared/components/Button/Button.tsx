import clsx from 'clsx';

import type { ButtonProps } from '@components/Button/Button.types';

import '@components/Button/Button.scss';

function Button({ className, children, ...props }: ButtonProps): JSX.Element {
  return (
    <button data-testid="Button" className={clsx('Button', className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
