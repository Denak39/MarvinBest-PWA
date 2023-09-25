import type { BaseEntity } from '@app/types';

export interface Sentence extends BaseEntity {
  createdAt: string;
  message: string;
}

export interface AddSentence extends Pick<Sentence, 'message'> {
  speaker: string;
}
