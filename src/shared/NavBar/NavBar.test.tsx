import { screen } from '@testing-library/react';

import { PATHS } from '@constants/index';
import NavBar from '@shared/NavBar/NavBar';
import { render } from '@src/tests';

describe('shared/components/NavBar', () => {
  it('should renders the expected component', () => {
    render(<NavBar />);

    const navBar = screen.getByTestId('NavBar');
    const homeLink = navBar.querySelector(`a[href="${PATHS.HOME}"]`);
    const addSentenceLink = navBar.querySelector(`a[href="${PATHS.SENTENCE_ADD}"]`);
    const peopleLink = navBar.querySelector(`a[href="${PATHS.PEOPLE}"]`);

    expect(navBar).toHaveClass('NavBar');

    expect(homeLink).toHaveClass('active');
    expect(homeLink).toContainElement(screen.getByTestId('IconHome'));
    expect(homeLink).toHaveAttribute('aria-label', "Aller à la page d'accueil");

    expect(addSentenceLink).not.toHaveClass('active');
    expect(addSentenceLink).toContainElement(screen.getByTestId('IconAdd'));
    expect(addSentenceLink).toHaveClass(
      'IconButton IconButton--variant-primary IconButton--size-large'
    );
    expect(addSentenceLink).toHaveAttribute(
      'aria-label',
      'Aller à la page pour ajouter une phrase'
    );

    expect(peopleLink).not.toHaveClass('active');
    expect(peopleLink).toContainElement(screen.getByTestId('IconUsers'));
    expect(peopleLink).toHaveAttribute('aria-label', 'Aller à la page des personnes');
  });
});
