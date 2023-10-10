import { useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';

import IconButton from '@shared/IconButton/IconButton';
import IconClose from '@shared/Icons/IconClose';
import type { ModalProps } from '@shared/Modal/Modal.types';

/**
 * Modal component.
 *
 * @param {ModalProps} props Props
 * @return {JSX.Element}
 */
function Modal({ children, className, isVisible, onClose, ...props }: ModalProps): JSX.Element {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClose = useCallback(() => ref.current?.close(), [ref]);
  const handleShow = useCallback(() => ref.current?.showModal(), [ref]);

  useEffect(() => {
    if (isVisible) handleShow();
    else handleClose();
  }, [handleClose, handleShow, isVisible]);

  return (
    <dialog className={clsx('Modal', className)} data-testid="Modal" ref={ref} {...props}>
      <IconButton
        aria-label="Fermer la fenêtre"
        className="Modal__button"
        onClick={onClose}
        variant="secondary"
      >
        <IconClose />
      </IconButton>

      <div className="Modal__content">{children}</div>
    </dialog>
  );
}

export default Modal;
