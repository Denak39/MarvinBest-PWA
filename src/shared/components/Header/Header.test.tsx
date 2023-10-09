import { Route, Routes } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import Header from '@components/Header/Header';
import type { HeaderProps } from '@components/Header/Header.types';
import renderWithRouter from '@tests/index';

const PATHS = ['/', '/people'];

const props: HeaderProps = {
  children: 'Title',
  className: 'custom-class',
};

describe('shared/components/Header', () => {
  it('should renders the expected component', () => {
    renderWithRouter(
      <Routes>
        <Route path={PATHS[0]} element={<p>Home</p>} />
        <Route path={PATHS[1]} element={<Header {...props} />} />
      </Routes>,
      { initialEntries: PATHS }
    );

    const header = screen.getByTestId('Header');
    const title = header.querySelector('.Header__title') as Element;
    const button = screen.getByLabelText('Retour en arrière');

    expect(header).toHaveClass('Header custom-class');
    expect(header.tagName.toLowerCase()).toBe('header');
    expect(title).toHaveTextContent(props.children as string);
    expect(title.tagName.toLowerCase()).toBe('h1');

    fireEvent.click(button);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
