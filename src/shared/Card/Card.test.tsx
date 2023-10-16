import { screen } from '@testing-library/react';

import Card from '@shared/Card/Card';
import type { CardProps } from '@shared/Card/Card.types';
import { render } from '@tests/index';

const props: CardProps = {
  className: 'custom-class',
  countSentences: 2,
  name: 'John Doe',
  to: '/',
};

describe('shared/components/Card', () => {
  it('should renders the expected component', () => {
    render(<Card {...props} />);

    const card = screen.getByTestId('Card');
    const avatar = screen.getByTestId('Avatar');
    const name = card.querySelector('.Card__name');
    const count = card.querySelector('.Card__count-sentences');

    expect(card).toHaveClass(`Card ${props.className}`);
    expect(card).toHaveAttribute('href', '/');
    expect(avatar).toBeInTheDocument();
    expect(name).toHaveTextContent('John Doe');
    expect(count).toHaveTextContent('2 phrases');
  });

  it('should renders the expected component with only one sentence', () => {
    const localProps: CardProps = {
      ...props,
      countSentences: 1,
    };

    const { container } = render(<Card {...localProps} />);

    expect(container.querySelector('.Card__count-sentences')).toHaveTextContent('1 phrase');
  });
});
