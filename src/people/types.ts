import type { BaseEntity } from '@app/types';

export interface People extends BaseEntity {
  countSentences: number;
  name: string;
}
