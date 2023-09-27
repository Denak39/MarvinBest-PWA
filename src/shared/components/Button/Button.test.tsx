import { render, screen } from '@testing-library/react';

import Button from '@components/Button/Button';
import type { ButtonProps } from '@components/Button/Button.types';

const props: ButtonProps = {
  className: 'custom-class',
};

describe('shared/components/Button', () => {
  it('should render the expected component', () => {
    render(<Button {...props} />);

    const buttonElement = screen.getByTestId('Button');
    expect(buttonElement).toBeInTheDocument();
  });
  it('should render the expected component with disabled', () => {
    render(<Button disabled {...props} />);

    const buttonElement = screen.getByTestId('Button');

    expect(buttonElement).toHaveClass('Button custom-class');
    expect(buttonElement).toBeDisabled();
  });
});
