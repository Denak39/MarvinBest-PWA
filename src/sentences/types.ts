import type { BaseEntity } from '@app/types';

export interface Sentence extends BaseEntity {
  createdAt: string;
  message: string;
}

export type AddSentence = {
  sentence: Sentence['message'];
  speaker: string;
};
