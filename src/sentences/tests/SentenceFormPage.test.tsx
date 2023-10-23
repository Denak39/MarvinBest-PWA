import { fireEvent, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import apiPeopleOptionsMock from '@people/mocks/apiPeopleOptionsMock';
import SentenceFormPage from '@sentences/components/SentenceFormPage';
import type { AddSentence } from '@sentences/types';
import { navigatorOnLineMock } from '@src/tests/helpers';
import { API_PATHS } from '@tests/constants';
import { render } from '@tests/index';
import { server } from '@tests/server';

const data: AddSentence = {
  personId: String(apiPeopleOptionsMock['hydra:member'][0].id),
  sentence: 'A funny sentence.',
};

describe('sentences/components/SentenceFormPage', () => {
  it('should renders the expected component', async () => {
    render(<SentenceFormPage />);

    const page = screen.getByTestId('SentenceFormPage');
    const form = page.querySelector('.SentenceFormPage__form') as HTMLFormElement;

    expect(page).toHaveClass('SentenceFormPage');

    // Header
    const header = screen.getByTestId('Header');
    const buttonGoBack = header.querySelector('.IconButton');

    expect(header).toHaveTextContent('Ajouter une phrase');
    expect(buttonGoBack).toBeVisible();

    // Select
    const labelSelect = screen.getByText('Personne');
    const skeletonSelect = screen.getByLabelText(
      "Chargement du champ de formulaire pour la sélection d'une personne"
    );
    const messageErrorSelect = form.querySelector('.FormErrorMessage--personId');

    expect(labelSelect).toBeInTheDocument();
    expect(skeletonSelect).toBeInTheDocument();
    expect(screen.queryByTestId('FieldSelect')).not.toBeInTheDocument();
    expect(messageErrorSelect).not.toBeInTheDocument();

    // Textarea
    const labelTextarea = screen.getByText('Phrase');
    const textarea = screen.getByPlaceholderText('Saisis la phrase...');
    const messageErrorTextarea = form.querySelector('.FormErrorMessage--sentence');

    expect(labelTextarea).toBeInTheDocument();
    expect(textarea).toBeRequired();
    expect(textarea).toHaveValue('');
    expect(textarea).toHaveAttribute('id', 'sentence');
    expect(textarea).toHaveAttribute('name', 'sentence');
    expect(textarea).not.toHaveAccessibleErrorMessage();
    expect(messageErrorTextarea).not.toBeInTheDocument();

    // Button
    const button = screen.getByLabelText('Ajouter la phrase');
    const icon = button.querySelector('.Icon--add');

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Ajouter');
    expect(icon).toBeInTheDocument();

    // Modal
    const modalSuccess = screen.getByTestId('ModalAddSentenceSuccess');
    const modalError = screen.getByTestId('ModalAddSentenceError');

    expect(modalSuccess).not.toHaveClass('Modal--is-visible');
    expect(modalError).not.toHaveClass('Modal--is-visible');

    await waitFor(() => {
      const select = screen.getByTestId('FieldSelect');
      const optionPlaceholder = select.querySelector('option:first-child');
      const option1 = select.querySelector('option:nth-child(2)');
      const option2 = select.querySelector('option:nth-child(3)');
      const option3 = select.querySelector('option:nth-child(4)');
      const option4 = select.querySelector('option:nth-child(5)');

      // Select
      expect(select).toBeRequired();
      expect(select).toHaveValue('');
      expect(select).not.toHaveAccessibleErrorMessage();
      expect(select).toHaveAttribute('id', 'personId');
      expect(select).toHaveAttribute('name', 'personId');

      // Options
      expect(optionPlaceholder).toHaveTextContent('Sélectionner une personne...');
      expect(option1).toHaveTextContent(apiPeopleOptionsMock['hydra:member'][0].name);
      expect(option1).toHaveValue(String(apiPeopleOptionsMock['hydra:member'][0].id));
      expect(option2).toHaveTextContent(apiPeopleOptionsMock['hydra:member'][1].name);
      expect(option2).toHaveValue(String(apiPeopleOptionsMock['hydra:member'][1].id));
      expect(option3).toHaveTextContent(apiPeopleOptionsMock['hydra:member'][2].name);
      expect(option3).toHaveValue(String(apiPeopleOptionsMock['hydra:member'][2].id));
      expect(option4).toHaveTextContent(apiPeopleOptionsMock['hydra:member'][3].name);
      expect(option4).toHaveValue(String(apiPeopleOptionsMock['hydra:member'][3].id));
    });
  });

  it('should receive a success response after submitting the form', async () => {
    render(<SentenceFormPage />);

    await screen.findByTestId('FieldSelect');

    const select = screen.getByTestId('FieldSelect');
    const textarea = screen.getByPlaceholderText('Saisis la phrase...');
    const button = screen.getByText('Ajouter');

    expect(button).toBeDisabled();

    fireEvent.change(select, { target: { value: data.personId } });
    fireEvent.change(textarea, { target: { value: data.sentence } });

    expect(button).not.toBeDisabled();
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button.querySelector('.Icon--spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      const modal = screen.getByTestId('ModalAddSentenceSuccess');
      const modalCloseButton = modal.querySelector('.Modal__button') as Element;
      const icon = modal.querySelector('.Icon--cross');
      const title = modal.querySelector('.Modal__title');

      expect(select).toHaveValue(data.personId);
      expect(textarea).toHaveValue('');

      expect(modal).toHaveClass('Modal--is-visible');
      expect(icon).toBeInTheDocument();
      expect(title).toHaveTextContent('Phrase ajoutée');
      expect(modal).toHaveTextContent('La phrase a bien été ajoutée !');

      fireEvent.click(modalCloseButton);

      expect(modal).not.toHaveClass('Modal--is-visible');
    });
  });

  it('should receive a failed response after submitting the form', async () => {
    server.use(rest.post(API_PATHS.SENTENCES, (_req, res, ctx) => res(ctx.status(400))));

    render(<SentenceFormPage />);

    await screen.findByTestId('FieldSelect');

    const select = screen.getByTestId('FieldSelect');
    const textarea = screen.getByTestId('Textarea');
    const button = screen.getByText('Ajouter');

    fireEvent.change(select, { target: { value: data.personId } });
    fireEvent.change(textarea, { target: { value: data.sentence } });

    expect(button).not.toBeDisabled();
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button.querySelector('.Icon--spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      const modal = screen.getByTestId('ModalAddSentenceError');
      const modalCloseButton = modal.querySelector('.Modal__button') as Element;

      expect(select).toHaveValue(data.personId);
      expect(textarea).toHaveValue(data.sentence);
      expect(modal).toHaveClass('Modal--is-visible');

      fireEvent.click(modalCloseButton);
      expect(modal).not.toHaveClass('Modal--is-visible');
    });
  });

  it('should renders the component with invalid form', async () => {
    const { container } = render(<SentenceFormPage />);

    await screen.findByTestId('FieldSelect');

    const form = container.querySelector('.SentenceFormPage__form') as HTMLFormElement;
    const select = screen.getByTestId('FieldSelect');
    const textarea = screen.getByTestId('Textarea');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(select).toHaveAccessibleErrorMessage('Sélectionne une personne !');
      expect(textarea).toHaveAccessibleErrorMessage("N'oublies pas la phrase !");
    });

    // Too short.
    fireEvent.change(textarea, { target: { value: 'x' } });

    await waitFor(() => {
      expect(textarea).toHaveAccessibleErrorMessage('Eh ! Pas trop court la phrase !');
    });

    // Too long.
    fireEvent.change(textarea, { target: { value: 'x'.repeat(256) } });

    await waitFor(() => {
      expect(textarea).toHaveAccessibleErrorMessage(
        'Heuu, ça fait beaucoup de caractères quand même...'
      );
    });
  });

  it('should save in browser storage waiting to be sent', async () => {
    navigatorOnLineMock(false);

    render(<SentenceFormPage />);

    await screen.findByTestId('FieldSelect');

    const select = screen.getByTestId('FieldSelect');
    const textarea = screen.getByTestId('Textarea');
    const button = screen.getByText('Ajouter');

    fireEvent.change(select, { target: { value: data.personId } });
    fireEvent.change(textarea, { target: { value: data.sentence } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button.querySelector('.Icon--spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      const modal = screen.getByTestId('ModalAddSentenceSuccess');

      expect(select).toHaveValue(data.personId);
      expect(textarea).toHaveValue('');

      expect(modal).toHaveClass('Modal--is-visible');
    });
  });
});
