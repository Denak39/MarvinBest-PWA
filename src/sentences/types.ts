import type { BaseEntity } from '@app/types';
import type { ShortPerson } from '@people/types';
import type { ModalProps } from '@shared/Modal/Modal.types';

export interface Sentence extends BaseEntity {
  createdAt: string;
  message: string;
  person: ShortPerson;
}
export interface ShortSentence extends Omit<Sentence, 'person'> {}

// Form
export type AddSentence = {
  personId: string;
  sentence: Sentence['message'];
};

export type AddSentenceStorage = AddSentence & BaseEntity;

// Modal
export type ModalAddSentenceErrorProps = Pick<ModalProps, 'isVisible' | 'onClose'>;
