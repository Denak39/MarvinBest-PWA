import { Route, Routes } from 'react-router-dom';
import type { RenderResult } from '@testing-library/react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { PATHS } from '@constants/index';
import PersonPage from '@people/components/PersonPage';
import apiPersonMock from '@people/mocks/apiPersonMock';
import { navigatorOnLineMock } from '@src/tests/helpers';
import { API_PATHS } from '@tests/constants';
import { render } from '@tests/index';
import { server } from '@tests/server';

const renderUi = (): RenderResult => {
  return render(
    <Routes>
      <Route path={PATHS.PERSON} element={<PersonPage />} />
    </Routes>,
    {
      initialEntries: [PATHS.PERSON.replace(':id', String(apiPersonMock.id))],
    }
  );
};

const data = 'A funny sentence';

describe('people/components/PersonPage', () => {
  it('should renders the expected component', async () => {
    renderUi();

    const page = screen.getByTestId('PersonPage');

    expect(page).toHaveClass('PersonPage');

    // Header
    const header = screen.getByTestId('Header');
    const buttonGoBack = header.querySelector('.IconButton');
    const skeletonName = screen.getByLabelText('Chargement du nom de la personne');

    expect(header).toContainElement(skeletonName);
    expect(buttonGoBack).toBeVisible();
    expect(skeletonName).toHaveClass('Skeleton--name');

    // Messages
    const messageLoading = screen.getByText('Chargement des messages...');
    const iconSpinner = messageLoading.querySelector('.Icon--spinner');
    const messageError = screen.queryByText('Impossible de récupérer les anciens messages');

    expect(messageLoading).toHaveTextContent('Chargement des messages...');
    expect(messageError).not.toBeInTheDocument();
    expect(iconSpinner).toBeInTheDocument();
    expect(screen.queryAllByTestId('Message')).toHaveLength(0);

    // Form
    const skeletonForm = screen.getByLabelText('Chargement du formulaire');
    expect(skeletonForm).toBeInTheDocument();

    // Modal
    const modalError = screen.getByTestId('ModalAddSentenceError');
    expect(modalError).not.toHaveClass('Modal--is-visible');

    await waitFor(() => {
      // Messages
      const name = screen.queryByText(apiPersonMock.name);
      const messages = screen.getAllByTestId('Message');

      expect(messageLoading).not.toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(messages).toHaveLength(apiPersonMock.countOfBestOfs);
      messages.forEach((message, index) => {
        expect(message).toHaveTextContent(apiPersonMock.bestOfs[index].sentence);
        expect(message.querySelector('.Message__date')).toHaveAttribute(
          'dateTime',
          apiPersonMock.bestOfs[index].createdAt
        );
      });

      // Form
      const textField = screen.getByTestId('TextField');
      const button = screen.getByLabelText('Ajouter la phrase');
      const iconSend = button.querySelector('.Icon--send');

      expect(textField).toBeRequired();
      expect(textField).toHaveValue('');
      expect(textField).toHaveAttribute('name', 'sentence');
      expect(textField).toHaveAttribute(
        'placeholder',
        `Écrire une phrase de ${apiPersonMock.name}...`
      );
      expect(button).toHaveClass('PersonPage__form-button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('type', 'submit');
      expect(iconSend).toBeInTheDocument();
    });
  });

  it('should receive a success response after submitting the form', async () => {
    renderUi();

    await screen.findByTestId('TextField');

    const textField = screen.getByTestId('TextField');
    const button = screen.getByLabelText('Ajouter la phrase');

    fireEvent.change(textField, { target: { value: data } });

    expect(button).not.toBeDisabled();
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button.querySelector('.Icon--spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(textField).toHaveValue('');
    });
  });

  it('should receive a failed response after submitting the form', async () => {
    server.use(rest.post(API_PATHS.SENTENCES, (_req, res, ctx) => res(ctx.status(400))));

    renderUi();

    await screen.findByTestId('TextField');

    const textField = screen.getByTestId('TextField');
    const button = screen.getByLabelText('Ajouter la phrase');

    fireEvent.change(textField, { target: { value: data } });

    expect(button).not.toBeDisabled();
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button.querySelector('.Icon--spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      const modal = screen.getByTestId('ModalAddSentenceError');
      const modalCloseButton = modal.querySelector('.Modal__button') as Element;

      expect(textField).toHaveValue(data);
      expect(modal).toHaveClass('Modal--is-visible');

      fireEvent.click(modalCloseButton);
      expect(modal).not.toHaveClass('Modal--is-visible');
    });
  });

  it('should renders the component with invalid form', async () => {
    const { container } = renderUi();

    await screen.findByTestId('TextField');

    const form = container.querySelector('.PersonPage__form') as HTMLFormElement;
    const textField = screen.getByTestId('TextField');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(textField).toBeInvalid();
    });

    // Too short.
    fireEvent.change(textField, { target: { value: 'x' } });

    await waitFor(() => {
      expect(textField).toBeInvalid();
    });

    // Too long.
    fireEvent.change(textField, { target: { value: 'x'.repeat(256) } });

    await waitFor(() => {
      expect(textField).toBeInvalid();
    });
  });

  it('should renders the component with an error because the getPerson request failed', async () => {
    server.use(rest.get(API_PATHS.PERSON, (_req, res, ctx) => res(ctx.status(400))));

    renderUi();

    await screen.findByTestId('TextField');

    expect(screen.getByText('Impossible de récupérer les anciens messages')).toBeInTheDocument();
  });

  it('should renders the component with ErrorPage component because the requests failed', async () => {
    server.use(rest.get(/.*/, (_req, res, ctx) => res(ctx.status(400))));

    renderUi();

    expect(await screen.findByTestId('ErrorPage')).toBeInTheDocument();
  });

  it('should save in browser storage waiting to be sent', async () => {
    navigatorOnLineMock(false);

    renderUi();

    await screen.findByTestId('TextField');

    const textField = screen.getByTestId('TextField');
    const button = screen.getByLabelText('Ajouter la phrase');

    fireEvent.change(textField, { target: { value: data } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button.querySelector('.Icon--spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      const messages = screen.getAllByTestId('Message');

      expect(textField).toHaveValue('');
      expect(messages).toHaveLength(apiPersonMock.countOfBestOfs + 1);
      expect(messages[1]).toHaveTextContent('En attente');
    });
  });
});
