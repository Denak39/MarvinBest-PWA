import { screen } from '@testing-library/react';

import Card from '@components/Card/Card';
import type { CardProps } from '@components/Card/Card.types';
import renderWithRouter from '@src/tests';

const props: CardProps = {
  className: 'custom-class',
  countSentences: 2,
  name: 'John Doe',
  to: '/',
};

describe('shared/components/Card', () => {
  it('should renders the expected component', () => {
    renderWithRouter(<Card {...props} />);

    const card = screen.getByTestId('Card');
    const avatar = screen.getByTestId('Avatar');
    const name = card.querySelector('.Card__name');
    const count = card.querySelector('.Card__count-sentences');

    expect(card).toHaveClass('Card custom-class');
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

    renderWithRouter(<Card {...localProps} />);

    const card = screen.getByTestId('Card');
    const count = card.querySelector('.Card__count-sentences');

    expect(count).toHaveTextContent('1 phrase');
  });
});
