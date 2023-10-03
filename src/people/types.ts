import type { BaseEntity } from '@app/types';
import type { UseIndexedDBReturn } from '@hooks/types';
import type { AddSentenceIndexedDB, Sentence } from '@sentences/types';

export interface Person extends BaseEntity {
  countSentences: number;
  name: string;
  sentences: Sentence[];
}

export type People = Person[];

export type PeopleOptions = Pick<Person, 'name' | 'id'>[];

export type PersonPageProps = {
  saveSentenceToStorage: UseIndexedDBReturn<AddSentenceIndexedDB>['saveData'];
  sentencesFromStorage: UseIndexedDBReturn<AddSentenceIndexedDB>['data'];
};

export type PeoplePageProps = {
  sentencesFromStorage: UseIndexedDBReturn<AddSentenceIndexedDB>['data'];
};
