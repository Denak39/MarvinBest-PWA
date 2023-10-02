import type { DialogHTMLAttributes } from 'react';

export interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  isVisible: boolean;
  onClose: () => void;
}
