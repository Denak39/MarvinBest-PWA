import { screen } from '@testing-library/react';

import Header from '@components/Header/Header';
import type { HeaderProps } from '@components/Header/Header.types';
import renderWithRouter from '@src/tests';

const props: HeaderProps = {
  className: 'custom-class',
  title: 'Title',
};

describe('shared/components/Header', () => {
  it('should renders the expected component', () => {
    renderWithRouter(<Header {...props} />);

    const header = screen.getByTestId('Header');
    const title = header.querySelector('.Header__title') as Element;

    expect(header).toHaveClass('Header custom-class');
    expect(header.tagName.toLowerCase()).toBe('header');
    expect(title).toHaveTextContent(props.title);
    expect(title.tagName.toLowerCase()).toBe('h1');
  });
});
