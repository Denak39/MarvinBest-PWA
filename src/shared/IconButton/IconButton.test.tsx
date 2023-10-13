import { fireEvent, render, screen } from '@testing-library/react';

import IconButton from '@shared/IconButton/IconButton';
import type { IconButtonProps } from '@shared/IconButton/IconButton.types';
import IconHome from '@shared/Icons/IconHome';

const props: IconButtonProps = {
  className: 'custom-class',
  children: <IconHome />,
  onClick: vi.fn(),
};

describe('shared/components/IconButton', () => {
  it('should renders the expected component', () => {
    render(<IconButton {...props} />);

    const iconButton = screen.getByTestId('IconButton');
    const children = iconButton.querySelector('.Icon');

    expect(iconButton).toHaveClass(
      `IconButton IconButton--size-medium IconButton--variant-primary ${props.className}`
    );
    expect(children).toBeInTheDocument();

    fireEvent.click(iconButton);
    expect(props.onClick).toBeCalledTimes(1);
  });

  it('should renders the expected component with large size', () => {
    const localProps: IconButtonProps = {
      ...props,
      size: 'large',
    };

    render(<IconButton {...localProps} />);

    const iconButton = screen.getByTestId('IconButton');

    expect(iconButton).toHaveClass(`IconButton IconButton--size-large ${props.className}`);
  });

  it('should renders the expected component with secondary variant', () => {
    const localProps: IconButtonProps = {
      ...props,
      variant: 'secondary',
    };

    render(<IconButton {...localProps} />);

    const iconButton = screen.getByTestId('IconButton');

    expect(iconButton).toHaveClass(
      `IconButton IconButton--size-medium IconButton--variant-secondary ${props.className}`
    );
  });
});
