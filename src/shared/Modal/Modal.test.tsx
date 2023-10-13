import { fireEvent, render, screen } from '@testing-library/react';

import Modal from '@shared/Modal/Modal';
import type { ModalProps } from '@shared/Modal/Modal.types';

const props: ModalProps = {
  children: 'Content',
  className: 'custom-class',
  isVisible: true,
  onClose: vi.fn(),
};

describe('shared/components/Modal', () => {
  it('should renders the expected component', () => {
    render(<Modal {...props} />);

    const modal = screen.getByTestId('Modal');
    const button = screen.getByTestId('IconButton');

    expect(modal).toHaveClass(`Modal ${props.className}`);
    expect(modal).toHaveTextContent(props.children as string);
    expect(button).toHaveAccessibleName('Fermer la fenêtre');
    expect(button).toHaveClass('Modal__button IconButton--variant-secondary');

    fireEvent.click(button);
    expect(modal).not.toBeVisible();
  });
});