import { Route, Routes } from 'react-router-dom';
import type { RenderResult } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/react';

import { PATHS } from '@constants/index';
import Header from '@shared/Header/Header';
import type { HeaderProps } from '@shared/Header/Header.types';
import { render } from '@tests/index';

const props: HeaderProps = {
  children: 'Title',
  className: 'custom-class',
};

const renderUi = (headerProps: HeaderProps = props): RenderResult => {
  return render(
    <Routes>
      <Route path={PATHS.HOME} element={<p>Home</p>} />
      <Route path={PATHS.PEOPLE} element={<Header {...headerProps} />} />
    </Routes>,
    { initialEntries: [PATHS.HOME, PATHS.PEOPLE] }
  );
};

describe('shared/components/Header', () => {
  it('should renders the expected component', () => {
    renderUi();

    const header = screen.getByTestId('Header');
    const title = header.querySelector('.Header__title') as Element;
    const button = screen.getByLabelText('Retour en arrière');

    expect(header).toHaveClass(`Header ${props.className}`);
    expect(header.tagName.toLowerCase()).toBe('header');
    expect(title).toHaveTextContent(props.children as string);
    expect(title.tagName.toLowerCase()).toBe('h1');
    expect(button).not.toBeVisible();
  });

  it('should renders the component with go back button', () => {
    const localProps: HeaderProps = {
      ...props,
      goBack: true,
    };

    renderUi(localProps);

    const button = screen.getByLabelText('Retour en arrière');

    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
