import { fireEvent, render, screen } from '@testing-library/react';

import IconAdd from '@shared/Icons/IconAdd';
import Modal from '@shared/Modal/Modal';
import type { ModalProps } from '@shared/Modal/Modal.types';

const props: ModalProps = {
  children: 'Content',
  className: 'custom-class',
  icon: IconAdd,
  isVisible: true,
  onClose: vi.fn(),
  title: 'Title',
};

describe('shared/components/Modal', () => {
  it('should renders the expected component', () => {
    render(<Modal {...props} />);

    const modal = screen.getByTestId('Modal');
    const button = screen.getByTestId('IconButton');
    const icon = modal.querySelector('.Icon--add');
    const title = modal.querySelector('.Modal__title');

    expect(modal).toHaveClass(`Modal ${props.className}`);
    expect(modal).toHaveTextContent(props.children as string);
    expect(icon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(button).toHaveAccessibleName('Fermer la fenêtre');
    expect(button).toHaveClass('Modal__button IconButton--variant-secondary');

    fireEvent.click(button);
    expect(modal).not.toBeVisible();
  });
});
