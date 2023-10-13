import type { BaseEntity } from '@app/types';
import type { UseIndexedDBReturn } from '@hooks/types';
import type { Person } from '@people/types';

export interface Sentence extends BaseEntity {
  createdAt: string;
  message: string;
}

export interface SentenceWithSpeaker extends Sentence {
  speaker: Pick<Person, 'name'>;
}

// Form
export type AddSentenceForm = {
  personId: Person['id'] | null;
  sentence: Sentence['message'];
};

export interface AddSentence extends Pick<AddSentenceForm, 'sentence'> {
  personId: Person['id'];
}

export type AddSentenceStorage = AddSentence & BaseEntity;

// Page
export type SentenceFormPageProps = {
  saveSentenceToStorage: UseIndexedDBReturn<AddSentenceStorage>['saveData'];
};
