import clsx from 'clsx';

import type { IconButtonProps } from '@components/IconButton/IconButton.types';

function IconButton({
  children,
  className,
  size = 'medium',
  ...props
}: IconButtonProps): JSX.Element {
  return (
    <button
      className={clsx('IconButton', `IconButton--size-${size}`, className)}
      data-testid="IconButton"
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
