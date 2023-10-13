import type { DialogHTMLAttributes, ElementType } from 'react';

export interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  icon: ElementType;
  isVisible: boolean;
  title: string;
  onClose: () => void;
}
