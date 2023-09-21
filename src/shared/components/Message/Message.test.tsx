import { render, screen } from '@testing-library/react';

import Message from '@components/Message/Message';
import type { MessageProps } from '@components/Message/Message.types';

const props: MessageProps = {
  children: 'Lorem iposum dolor sit amet.',
  className: 'custom-class',
  initial: 'MQ',
};

describe('shared/components/Message', () => {
  it('should renders the expected component', () => {
    render(<Message {...props} />);

    const message = screen.getByTestId('Message');
    const avatar = screen.getByTestId('Avatar');
    const text = message.querySelector('.Message__text');
    const date = message.querySelector('.Message__date');

    expect(message).toHaveClass('Message custom-class');
    expect(avatar).toBeInTheDocument();
    expect(text).toHaveTextContent(props.children as string);
    expect(date).not.toBeInTheDocument();
  });

  it('should renders the expected component with a date', () => {
    const localProps: MessageProps = {
      ...props,
      date: '2023-06-24 09:15:57',
    };

    render(<Message {...localProps} />);

    const message = screen.getByTestId('Message');
    const avatar = screen.getByTestId('Avatar');
    const text = message.querySelector('.Message__text');
    const date = message.querySelector('.Message__date');

    expect(message).toHaveClass('Message custom-class');
    expect(avatar).toBeInTheDocument();
    expect(text).toHaveTextContent(localProps.children as string);
    expect(date).toHaveTextContent('24/06/2023 09:15');
    expect(date).toHaveAccessibleDescription('samedi 24 juin 2023 à 09:15');
    expect(date).toHaveAttribute('dateTime', '2023-06-24 09:15:57');
  });
});
