import clsx from 'clsx';

import type { ButtonProps } from '@shared/Button/Button.types';

/**
 * Button component.
 *
 * @param {ButtonProps} props Props
 * @return {JSX.Element}
 */
function Button({ className, children, icon: Icon, ...props }: ButtonProps): JSX.Element {
  return (
    <button className={clsx('Button', className)} data-testid="Button" {...props}>
      {children}

      {!!Icon && <Icon />}
    </button>
  );
}

export default Button;
