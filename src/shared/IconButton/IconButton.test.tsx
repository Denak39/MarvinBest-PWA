import { fireEvent, screen } from '@testing-library/react';

import IconButton from '@shared/IconButton/IconButton';
import type { IconButtonProps } from '@shared/IconButton/IconButton.types';
import IconHome from '@shared/Icons/components/IconHome';
import { defaultRender } from '@tests/index';

const props: IconButtonProps = {
  className: 'custom-class',
  children: <IconHome />,
  onClick: vi.fn(),
};

describe('shared/components/IconButton', () => {
  it('should renders the expected component', () => {
    defaultRender(<IconButton {...props} />);

    const iconButton = screen.getByTestId('IconButton');
    const iconHome = screen.getByTestId('IconHome');

    expect(iconButton).toHaveClass(
      `IconButton IconButton--size-medium IconButton--variant-primary ${props.className}`
    );
    expect(iconButton).toContainElement(iconHome);

    fireEvent.click(iconButton);
    expect(props.onClick).toBeCalledTimes(1);
  });

  it('should renders the component with large size', () => {
    const localProps: IconButtonProps = {
      ...props,
      size: 'large',
    };

    defaultRender(<IconButton {...localProps} />);

    const iconButton = screen.getByTestId('IconButton');
    expect(iconButton).toHaveClass(`IconButton IconButton--size-large ${props.className}`);
  });

  it('should renders the component with secondary variant', () => {
    const localProps: IconButtonProps = {
      ...props,
      variant: 'secondary',
    };

    defaultRender(<IconButton {...localProps} />);

    const iconButton = screen.getByTestId('IconButton');
    expect(iconButton).toHaveClass(
      `IconButton IconButton--size-medium IconButton--variant-secondary ${props.className}`
    );
  });
});
