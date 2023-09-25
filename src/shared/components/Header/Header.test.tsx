import { render, screen } from '@testing-library/react';

import Header from '@components/Header/Header';
import type { HeaderProps } from '@components/Header/Header.types';

const props: HeaderProps = {
  className: 'custom-class',
  title: 'Title',
};

describe('shared/components/Header', () => {
  it('should renders the expected component', () => {
    render(<Header {...props} />);

    const header = screen.getByTestId('Header');
    const title = header.querySelector('.Header__title') as Element;

    expect(header).toHaveClass('Header custom-class');
    expect(header.tagName.toLowerCase()).toBe('header');
    expect(title).toHaveTextContent(props.title);
    expect(title.tagName.toLowerCase()).toBe('h1');
  });
});
