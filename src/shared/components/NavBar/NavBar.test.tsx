import { fireEvent } from '@testing-library/react';

import NavBar from '@components/NavBar/NavBar';
import renderWithRouter from '@tests/index';

test('Navbar applies correct class based on isActive', () => {
  const { container } = renderWithRouter(<NavBar />);

  const homeNavLink = container.querySelector('a[href="/"]');
  const usersNavLink = container.querySelector('a[href="/people"]') as Element;

  expect(homeNavLink).toHaveClass('active');
  expect(usersNavLink).not.toHaveClass('active');

  fireEvent.click(usersNavLink);

  expect(homeNavLink).not.toHaveClass('active');
  expect(usersNavLink).toHaveClass('active');
});
