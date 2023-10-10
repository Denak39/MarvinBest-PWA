import type { BaseEntity } from '@app/types';
import type { IndexedDBStores } from '@constants/index';

export type UseIndexedDBProps = {
  name: IndexedDBStores;
};

export type UseIndexedDBReturn<TData> = {
  clearData: () => Promise<boolean>;
  data: TData[];
  removeData: (id: BaseEntity['id']) => Promise<boolean>;
  saveData: (data: TData) => Promise<TData>;
};
