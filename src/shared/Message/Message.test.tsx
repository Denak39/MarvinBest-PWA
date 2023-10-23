import { screen } from '@testing-library/react';

import DateHelpers from '@helpers/DateHelpers';
import Message from '@shared/Message/Message';
import type { MessageProps } from '@shared/Message/Message.types';
import { defaultRender } from '@tests/index';

const dateTime = new DateHelpers('2023-06-24 09:15:57');

const props: MessageProps = {
  children: 'Lorem iposum dolor sit amet.',
  className: 'custom-class',
  name: 'John Doe',
};

describe('shared/components/Message', () => {
  it('should renders the expected component', () => {
    defaultRender(<Message {...props} />);

    const message = screen.getByTestId('Message');
    const avatar = screen.getByTestId('Avatar');
    const text = message.querySelector('.Message__text');
    const date = message.querySelector('.Message__date');

    expect(message).toHaveClass(`Message ${props.className}`);
    expect(avatar).toBeInTheDocument();
    expect(text).toHaveTextContent(props.children as string);
    expect(date).not.toBeInTheDocument();
  });

  it('should renders the component with a date', () => {
    const localProps: MessageProps = {
      ...props,
      date: dateTime,
    };

    defaultRender(<Message {...localProps} />);

    const message = screen.getByTestId('Message');
    const avatar = screen.getByTestId('Avatar');
    const text = message.querySelector('.Message__text');
    const date = message.querySelector('.Message__date');

    expect(message).toHaveClass(`Message ${props.className}`);
    expect(avatar).toBeInTheDocument();
    expect(text).toHaveTextContent(localProps.children as string);
    expect(date).toHaveTextContent(dateTime.getShortdate());
    expect(date).toHaveAccessibleDescription(dateTime.getFulldate());
    expect(date).toHaveAttribute('datetime', dateTime.getLocaleString());
  });

  it('should renders the component waiting', () => {
    const localProps: MessageProps = {
      ...props,
      date: dateTime,
      isWaiting: true,
    };

    defaultRender(<Message {...localProps} />);

    const date = screen.queryByText(dateTime.getShortdate());
    const waiting = screen.getByTitle(
      'Le message sera envoyé lorsque que la connexion sera revenue.'
    );

    expect(date).not.toBeInTheDocument();
    expect(waiting).toHaveTextContent('En attente');
  });
});
