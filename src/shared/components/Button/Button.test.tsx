import { render, screen } from '@testing-library/react';

import Button from './Button';
import type { ButtonProps } from './Button.types';

const props: ButtonProps = {
  className: 'custom-class',
  disabled: true,
};

describe('shared/components/Button', () => {
  it('should render the expected component with disabled', () => {
    render(<Button {...props} />);

    const buttonElement = screen.getByTestId('Button');

    expect(buttonElement).toHaveClass('Button custom-class');
    expect(buttonElement).toBeDisabled();
  });
});
