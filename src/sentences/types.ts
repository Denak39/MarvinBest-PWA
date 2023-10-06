import type { BaseEntity } from '@app/types';
import type { UseIndexedDBReturn } from '@hooks/types';
import type { Person } from '@people/types';

export interface Sentence extends BaseEntity {
  createdAt: string;
  message: string;
}

export type AddSentence = {
  personId: Person['id'];
  sentence: Sentence['message'];
};

export type AddSentenceIndexedDB = AddSentence & BaseEntity;

export type SentenceFormPageProps = {
  saveSentenceToStorage: UseIndexedDBReturn<AddSentenceIndexedDB>['saveData'];
};
