import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import NavBar from './NavBar';

test('Navbar applies correct class based on isActive', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <NavBar />
    </MemoryRouter>,
  );

  const homeNavLink = container.querySelector('a[href="/"]');

  expect(homeNavLink).toHaveClass('active');

  const usersNavLink = container.querySelector('a[href="/users"]');

  expect(usersNavLink).toHaveClass('not-active');

  if (usersNavLink) {
    fireEvent.click(usersNavLink);

    expect(usersNavLink).toHaveClass('active');

    expect(homeNavLink).toHaveClass('not-active');
  }
});
