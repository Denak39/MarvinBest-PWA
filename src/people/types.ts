import type { BaseEntity } from '@app/types';
import type { UseIndexedDBReturn } from '@hooks/types';
import type { AddSentenceStorage, Sentence } from '@sentences/types';

export interface Person extends BaseEntity {
  countSentences: number;
  name: string;
  sentences: Sentence[];
}

export type People = Person[];

export type PeopleOptions = Pick<Person, 'name' | 'id'>[];

// Page
export type PersonPageProps = {
  saveSentenceToStorage: UseIndexedDBReturn<AddSentenceStorage>['saveData'];
  sentencesFromStorage: UseIndexedDBReturn<AddSentenceStorage>['data'];
};

export type PeoplePageProps = {
  sentencesFromStorage: UseIndexedDBReturn<AddSentenceStorage>['data'];
};
