import { fireEvent, screen, waitFor } from '@testing-library/react';

import { PATHS } from '@constants/index';
import PeoplePage from '@people/components/PeoplePage';
import apiPeopleFirstPageMock from '@people/mocks/apiPeopleFirstPageMock';
import apiPeopleSecondPageMock from '@people/mocks/apiPeopleSecondPageMock';
import { render } from '@tests/index';

describe('people/components/PeoplePage', () => {
  it('should renders the expected component', async () => {
    render(<PeoplePage />);

    const page = screen.getByTestId('PeoplePage');

    expect(page).toHaveClass('PeoplePage');

    // Header
    const header = screen.getByTestId('Header');
    const buttonGoBack = header.querySelector('.IconButton');

    expect(header).toHaveTextContent('Personnes');
    expect(buttonGoBack).not.toBeVisible();

    // List
    const skeletons = screen.getAllByLabelText("Chargement d'une personne");

    expect(skeletons).toHaveLength(10);
    expect(screen.queryAllByTestId('Card')).toHaveLength(0);
    skeletons.forEach((skeleton, index) => {
      expect(skeleton).toHaveStyle({ 'animation-delay': `${index * 0.2}s` });
    });

    await waitFor(() => {
      const items = screen.getAllByTestId('Card');

      // List
      expect(items).toHaveLength(apiPeopleFirstPageMock['hydra:member'].length);
      items.forEach((item, index) => {
        const person = apiPeopleFirstPageMock['hydra:member'][index];
        const name = item.querySelector('.Card__name');
        const count = item.querySelector('.Card__count-sentences');

        expect(item).toHaveAttribute('href', `${PATHS.PEOPLE}/${person.id}`);
        expect(name).toHaveTextContent(person.name);
        expect(count).toHaveTextContent(
          `${person.countOfBestOfs} phrase${person.countOfBestOfs > 1 ? 's' : ''}`
        );
      });
    });

    // Scroll to bottom
    const height = window.innerHeight * 2;
    vi.spyOn(document.body, 'offsetHeight', 'get').mockImplementation(() => height);
    [window, document].forEach((el) => {
      fireEvent.scroll(el, { target: { scrollY: height } });
    });

    expect(screen.getAllByTestId('Skeleton')).toHaveLength(3);

    await waitFor(() => {
      const items = screen.getAllByTestId('Card');

      // List
      expect(items).toHaveLength(
        apiPeopleFirstPageMock['hydra:member'].length +
          apiPeopleSecondPageMock['hydra:member'].length
      );
    });
  });
});
