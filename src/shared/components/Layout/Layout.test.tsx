import { Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';

import Layout from '@components/Layout/Layout';
import renderWithRouter from '@src/tests';

describe('shared/components/Layout', () => {
  it('should renders the expected component', () => {
    renderWithRouter(
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<p>Home</p>} />
        </Route>
      </Routes>
    );

    const layout = screen.getByTestId('Layout');

    expect(layout).toHaveClass('Layout');
    expect(layout).toHaveTextContent('Home');
  });
});
