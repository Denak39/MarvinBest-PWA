import clsx from 'clsx';

import type { IconButtonProps } from '@components/IconButton/IconButton.types';

import '@components/IconButton/IconButton.scss';

function IconButton({
  children,
  className,
  component = 'button',
  size = 'medium',
  ...props
}: IconButtonProps): JSX.Element {
  const Component = component;

  return (
    <Component
      className={clsx('IconButton', `IconButton--size-${size}`, className)}
      data-testid="IconButton"
      {...props}
    >
      {children}
    </Component>
  );
}

export default IconButton;
