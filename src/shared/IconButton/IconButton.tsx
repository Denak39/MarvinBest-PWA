import clsx from 'clsx';

import type { IconButtonProps } from '@shared/IconButton/IconButton.types';

/**
 * IconButton component.
 *
 * @param {IconButtonProps} props Props
 * @return {JSX.Element}
 */
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
