import { render, screen } from '@testing-library/react';

import Button from '@shared/Button/Button';
import type { ButtonProps } from '@shared/Button/Button.types';
import IconHome from '@shared/Icons/IconHome';

const props: ButtonProps = {
  children: 'Button',
  className: 'custom-class',
  title: 'Title',
};

describe('shared/components/Button', () => {
  it('should render the expected component', () => {
    render(<Button {...props} />);

    const button = screen.getByTestId('Button');

    expect(button).toHaveClass(`Button ${props.className}`);
    expect(button).toHaveTextContent(props.children as string);
    expect(button).toHaveAccessibleDescription(props.title);
  });
  it('should render the expected component with icon', () => {
    const localProps: ButtonProps = {
      ...props,
      icon: IconHome,
    };

    render(<Button {...localProps} />);

    const button = screen.getByTestId('Button');
    const icon = button.querySelector('.Icon');

    expect(icon).toBeInTheDocument();
  });
});
