import { screen } from '@testing-library/react';

import NotFoundPage from '@shared/ErrorPage/NotFoundPage/NotFoundPage';
import { render } from '@tests/index';

describe('shared/components/NotFoundPage', () => {
  it('should renders the expected component', () => {
    render(<NotFoundPage />);

    const header = screen.getByTestId('Header');
    const text = screen.getByText('La page que vous souhaitez afficher n’existe pas ou plus...');

    expect(header).toHaveTextContent('Erreur 404');
    expect(text).toBeInTheDocument();
  });
});
