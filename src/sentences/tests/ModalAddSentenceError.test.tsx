import { screen } from '@testing-library/react';

import ModalAddSentenceError from '@sentences/components/ModalAddSentenceError';
import type { ModalAddSentenceErrorProps } from '@sentences/types';
import { defaultRender } from '@tests/index';

const props: ModalAddSentenceErrorProps = {
  isVisible: true,
  onClose: vi.fn(),
};

describe('sentences/components/ModalAddSentenceError', () => {
  it('should renders the expected component', async () => {
    defaultRender(<ModalAddSentenceError {...props} />);

    const modal = screen.getByTestId('ModalAddSentenceError');
    const iconCross = modal.querySelector('.Icon--cross');
    const title = modal.querySelector('.Modal__title');

    expect(iconCross).toBeInTheDocument();
    expect(title).toHaveTextContent('Oups...');
    expect(modal).toHaveTextContent("Une erreur est survenue ! La phrase n'a pas pu être ajoutée.");
  });
});
