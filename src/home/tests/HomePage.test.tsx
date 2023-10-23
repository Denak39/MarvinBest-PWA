import { screen, waitFor } from '@testing-library/react';

import DateHelpers from '@helpers/DateHelpers';
import HomePage from '@home/components/HomePage';
import apiSentenceMock from '@sentences/mocks/apiSentenceMock';
import { render } from '@src/tests';

describe('home/components/HomePage', () => {
  it('should renders the expected component', async () => {
    render(<HomePage />);

    const page = screen.getByTestId('HomePage');
    const title = page.querySelector('.HomePage__logo');
    const image = screen.getByAltText('Logo marvin.best');

    expect(page).toHaveClass('HomePage');
    expect(title).toContainElement(image);

    await waitFor(() => {
      const subTitle = page.querySelector('.HomePage__title');
      const message = screen.getByTestId('Message');
      const avatar = screen.getByTestId('Avatar');

      expect(subTitle).toHaveTextContent('Dernière phrase ajoutée');

      // Message
      expect(message.querySelector('.Message__text')).toHaveTextContent(apiSentenceMock.sentence);
      expect(message.querySelector('.Message__date')).toHaveTextContent(
        new DateHelpers(apiSentenceMock.createdAt).getShortdate()
      );
      expect(avatar).toHaveAccessibleDescription(apiSentenceMock.speaker.name);
    });
  });
});
