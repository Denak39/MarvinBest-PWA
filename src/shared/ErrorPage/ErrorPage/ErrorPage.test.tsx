import { screen } from '@testing-library/react';

import ErrorPage from '@shared/ErrorPage/ErrorPage/ErrorPage';
import { render } from '@tests/index';

describe('shared/components/ErrorPage', () => {
  it('should renders the expected component', () => {
    render(<ErrorPage />);

    const header = screen.getByTestId('Header');
    const text = screen.getByText(
      'Une erreur est survenue ! Contactez un administrateur pour plus d’informations.'
    );

    expect(header).toHaveTextContent('Oups...');
    expect(text).toBeInTheDocument();
  });
});
