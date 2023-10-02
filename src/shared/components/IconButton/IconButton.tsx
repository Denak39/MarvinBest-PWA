import clsx from 'clsx';

import type { IconButtonProps } from '@components/IconButton/IconButton.types';

function IconButton({
  children,
  className,
  size = 'medium',
  variant = 'primary',
  ...props
}: IconButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        'IconButton',
        `IconButton--variant-${variant}`,
        `IconButton--size-${size}`,
        className
      )}
      data-testid="IconButton"
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
