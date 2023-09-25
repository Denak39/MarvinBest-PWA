import clsx from 'clsx';

import type { IconButtonProps } from '@components/IconButton/IconButton.types';

import '@components/IconButton/IconButton.scss';

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
