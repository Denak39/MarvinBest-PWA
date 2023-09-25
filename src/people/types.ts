import type { BaseEntity } from '@app/types';
import type { Sentence } from '@sentences/types';

export interface Person extends BaseEntity {
  countSentences: number;
  name: string;
  sentences: Sentence[];
}

export type People = Person[];
