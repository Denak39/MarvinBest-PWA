import type { PropsWithChildren } from 'react';
import { createContext } from 'react';

import { IndexedDBStores } from '@constants/index';
import type { UseIndexedDBReturn } from '@hooks/types';
import useIndexedDB from '@hooks/useIndexedDB';
import type { AddSentenceStorage } from '@sentences/types';

export const SentenceIndexedDBContext = createContext({} as UseIndexedDBReturn<AddSentenceStorage>);

export function SentenceIndexedDBContextProvider({ children }: PropsWithChildren) {
  const value = useIndexedDB<AddSentenceStorage>({
    name: IndexedDBStores.SENTENCES,
  });

  return (
    <SentenceIndexedDBContext.Provider value={value}>{children}</SentenceIndexedDBContext.Provider>
  );
}
