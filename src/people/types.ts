import type { BaseEntity } from '@app/types';
import type { ShortSentence } from '@sentences/types';

export interface Person extends BaseEntity {
  countSentences: number;
  name: string;
  sentences: ShortSentence[];
}
export type ShortPerson = Pick<Person, 'name' | 'id'>;

export type People = Person[];

export type PeopleOptions = ShortPerson[];
