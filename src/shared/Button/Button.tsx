import clsx from 'clsx';

import type { ButtonProps } from '@shared/Button/Button.types';

/**
 * Button component.
 *
 * @param {ButtonProps} props Props
 * @return {JSX.Element}
 */
function Button({
  children,
  className,
  iconLeft: IconLeft,
  iconRight: IconRight,
  variant = 'primary',
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={clsx('Button', `Button--variant-${variant}`, className)}
      data-testid="Button"
      {...props}
    >
      {!!IconLeft && <IconLeft className="Button__icon--left" />}

      <span className="Button__text">{children}</span>

      {!!IconRight && <IconRight className="Button__icon--right" />}
    </button>
  );
}

export default Button;
