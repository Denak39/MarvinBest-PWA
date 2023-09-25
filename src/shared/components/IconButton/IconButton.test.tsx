import { fireEvent, render, screen } from '@testing-library/react';

import IconButton from '@components/IconButton/IconButton';
import type { IconButtonProps } from '@components/IconButton/IconButton.types';
import IconHome from '@components/Icons/IconHome';

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

    expect(iconButton).toHaveClass('IconButton IconButton--size-medium custom-class');
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

    expect(iconButton).toHaveClass('IconButton IconButton--size-large custom-class');
  });
});
