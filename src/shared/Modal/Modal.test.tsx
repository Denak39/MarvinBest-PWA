import { fireEvent, screen } from '@testing-library/react';

import IconAdd from '@shared/Icons/IconAdd';
import Modal from '@shared/Modal/Modal';
import type { ModalProps } from '@shared/Modal/Modal.types';
import { defaultRender } from '@tests/index';

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
    defaultRender(<Modal {...props} />);

    const modal = screen.getByTestId('Modal');
    const button = screen.getByTestId('IconButton');
    const icon = modal.querySelector('.Icon--add');
    const title = modal.querySelector('.Modal__title');

    expect(modal).toHaveClass(`Modal Modal--is-visible ${props.className}`);
    expect(modal).toHaveTextContent(props.children as string);
    expect(icon).toBeInTheDocument();
    expect(title).toHaveTextContent(props.title);
    expect(button).toHaveAccessibleName('Fermer la fenêtre');
    expect(button).toHaveClass('Modal__button IconButton--variant-secondary');

    fireEvent.click(button);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
