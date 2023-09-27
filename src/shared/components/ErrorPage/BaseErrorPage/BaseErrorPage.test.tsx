import { Route, Routes } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import BaseErrorPage from '@components/ErrorPage/BaseErrorPage/BaseErrorPage';
import type { BaseErrorPageProps } from '@components/ErrorPage/BaseErrorPage/BaseErrorPage.types';
import renderWithRouter from '@tests/index';

const PATHS = ['/', '/error'];

const props: BaseErrorPageProps = {
  children: 'An error has occurred',
  className: 'custom-class',
  title: 'Ooooops...',
};

describe('shared/components/BaseErrorPage', () => {
  it('should renders the expected component', () => {
    renderWithRouter(
      <Routes>
        <Route path={PATHS[0]} element={<p>Home</p>} />
        <Route path={PATHS[1]} element={<BaseErrorPage {...props} />} />
      </Routes>,
      { initialEntries: PATHS }
    );

    const baseErrorPage = screen.getByTestId('BaseErrorPage');
    const header = screen.getByTestId('Header');
    const image = screen.getByAltText('Mascotte marvin.best triste');
    const text = baseErrorPage.querySelector('.BaseErrorPage__text');
    const link = baseErrorPage.querySelector('.BaseErrorPage__link') as Element;

    expect(baseErrorPage).toHaveClass('BaseErrorPage custom-class');
    expect(baseErrorPage).toContainElement(header);
    expect(baseErrorPage).toContainElement(image);
    expect(text).toHaveTextContent(props.children as string);

    fireEvent.click(link);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
