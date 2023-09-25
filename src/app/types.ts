import type { store } from '@app/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type BaseEntity = {
  id: number;
};

export interface ISentencesForm {
  sentence: string;
  speaker: string;
}
