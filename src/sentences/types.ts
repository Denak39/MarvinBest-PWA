import type { BaseEntity } from '@app/types';
import type { Person } from '@people/types';
import type { ModalProps } from '@shared/Modal/Modal.types';

export interface Sentence extends BaseEntity {
  createdAt: string;
  message: string;
}

export interface SentenceWithSpeaker extends Sentence {
  speaker: Pick<Person, 'name'>;
}

// Form
export type AddSentence = {
  personId: string;
  sentence: Sentence['message'];
};

export type AddSentenceStorage = AddSentence & BaseEntity;

// Modal
export type ModalAddSentenceErrorProps = Pick<ModalProps, 'isVisible' | 'onClose'>;
