import type { BaseEntity } from '@app/types';
import type { Person } from '@people/types';

export interface Sentence extends BaseEntity {
  createdAt: string;
  message: string;
}

export type AddSentence = {
  personId: Person['id'];
  sentence: Sentence['message'];
};
