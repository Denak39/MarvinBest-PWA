import { screen, waitFor } from '@testing-library/react';

import { PATHS } from '@constants/index';
import App from '@src/App';
import { render } from '@tests/index';

describe('src/App', () => {
  it('should renders the home page', async () => {
    render(<App />);

    await waitFor(() => {
      const layout = screen.getByTestId('Layout');
      const page = screen.getByTestId('HomePage');

      expect(layout).toContainElement(page);
    });
  });

  it('should renders the people page', async () => {
    render(<App />, { initialEntries: [PATHS.PEOPLE] });

    await waitFor(() => {
      const layout = screen.getByTestId('Layout');
      const page = screen.getByTestId('PeoplePage');

      expect(layout).toContainElement(page);
    });
  });

  it('should renders the person page', async () => {
    render(<App />, { initialEntries: [PATHS.PERSON.replace(':id', '1')] });

    await waitFor(() => {
      const layout = screen.getByTestId('Layout');
      const page = screen.getByTestId('PersonPage');

      expect(layout).toContainElement(page);
    });
  });

  it('should renders the sentence add form page', async () => {
    render(<App />, { initialEntries: [PATHS.SENTENCE_ADD] });

    await waitFor(() => {
      const layout = screen.getByTestId('Layout');
      const page = screen.getByTestId('SentenceFormPage');

      expect(layout).toContainElement(page);
    });
  });

  it('should renders the not found page', async () => {
    render(<App />, { initialEntries: ['/not-found-page'] });

    await waitFor(() => {
      const layout = screen.getByTestId('Layout');
      const page = screen.getByTestId('NotFoundPage');

      expect(layout).toContainElement(page);
    });
  });

  // it('should send the sentences from the storages when the connection is regained', async () => {
  //   navigatorOnLineMock(false);

  //   render(<App />, { initialEntries: [PATHS.PERSON.replace(':id', String(apiPersonMock.id))] });

  //   await screen.findByTestId('TextField');

  //   const textField = screen.getByTestId('TextField');
  //   const button = screen.getByLabelText('Ajouter la phrase');

  //   fireEvent.change(textField, { target: { value: 'A new sentence' } });
  //   fireEvent.click(button);
  // });
});
