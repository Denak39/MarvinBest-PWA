import { screen } from '@testing-library/react';

import Button from '@shared/Button/Button';
import type { ButtonProps } from '@shared/Button/Button.types';
import IconHome from '@shared/Icons/components/IconHome';
import { defaultRender } from '@tests/index';

const props: ButtonProps = {
  children: 'Button',
  className: 'custom-class',
  title: 'Title',
};

describe('shared/components/Button', () => {
  it('should render the expected component', () => {
    defaultRender(<Button {...props} />);

    const button = screen.getByTestId('Button');

    expect(button).toHaveClass(`Button ${props.className}`);
    expect(button).toHaveTextContent(props.children as string);
    expect(button).toHaveAccessibleDescription(props.title);
  });

  it('should render the component with a right icon', () => {
    const localProps: ButtonProps = {
      ...props,
      iconRight: IconHome,
    };

    defaultRender(<Button {...localProps} />);

    const button = screen.getByTestId('Button');
    const iconHome = screen.getByTestId('IconHome');

    expect(button).toContainElement(iconHome);
    expect(iconHome).toHaveClass('Button__icon--right');
  });

  it('should render the component with a left icon', () => {
    const localProps: ButtonProps = {
      ...props,
      iconRight: IconHome,
    };

    defaultRender(<Button {...localProps} />);

    const button = screen.getByTestId('Button');
    const iconHome = screen.getByTestId('IconHome');

    expect(button).toContainElement(iconHome);
    expect(iconHome).toHaveClass('Button__icon--left');
  });
});
