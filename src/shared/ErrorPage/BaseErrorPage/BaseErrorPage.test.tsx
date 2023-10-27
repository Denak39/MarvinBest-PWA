import { Route, Routes } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import { PATHS } from '@constants/index';
import BaseErrorPage from '@shared/ErrorPage/BaseErrorPage/BaseErrorPage';
import type { BaseErrorPageProps } from '@shared/ErrorPage/BaseErrorPage/BaseErrorPage.types';
import { render } from '@tests/index';

const props: BaseErrorPageProps = {
  children: 'An error has occurred',
  className: 'custom-class',
  title: 'Oops...',
};

describe('shared/components/BaseErrorPage', () => {
  it('should renders the expected component', () => {
    render(
      <Routes>
        <Route path={PATHS.HOME} element={<p>Home</p>} />
        <Route path="*" element={<BaseErrorPage {...props} />} />
      </Routes>,
      { initialEntries: ['/route-not-found'] }
    );

    const baseErrorPage = screen.getByTestId('BaseErrorPage');
    const header = screen.getByTestId('Header');
    const image = screen.getByAltText('Mascotte Quiproquotes');
    const text = baseErrorPage.querySelector('.BaseErrorPage__text');
    const link = baseErrorPage.querySelector('.BaseErrorPage__link') as Element;

    expect(header).toHaveTextContent(props.title as string);
    expect(baseErrorPage).toHaveClass(`BaseErrorPage ${props.className}`);
    expect(baseErrorPage).toContainElement(header);
    expect(baseErrorPage).toContainElement(image);
    expect(text).toHaveTextContent(props.children as string);

    fireEvent.click(link);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
