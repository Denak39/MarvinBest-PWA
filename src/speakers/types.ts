import type { BaseEntity } from '@app/types';

export interface Speaker extends BaseEntity {
  countSentences: number;
  name: string;
}
