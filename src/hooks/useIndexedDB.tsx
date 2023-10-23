import { useEffect, useState } from 'react';

import type { BaseEntity } from '@app/types';
import { DB_NAME } from '@constants/index';
import type { UseIndexedDBProps, UseIndexedDBReturn } from '@hooks/types';

/**
 * Hook useIndexedDB.
 *
 * @template TData
 * @param {UseIndexedDBProps} props Props
 * @return {UseIndexedDBReturn<TData>}
 */
function useIndexedDB<TData>({ name }: UseIndexedDBProps): UseIndexedDBReturn<TData> {
  const [data, setData] = useState<TData[]>([]);

  /**
   * Database initialization.
   *
   * @return {Promise<IDBDatabase>}
   */
  const openDb = async (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME);

      req.onsuccess = () => resolve(req.result);
      req.onerror = (event: Event) => reject(event);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (db.objectStoreNames.contains(name)) return;

        db.createObjectStore(name, { keyPath: 'id' });
      };
    });

  /**
   * Get data in the database.
   *
   * @return {Promise<TData[]>}
   */
  const getData = async (): Promise<TData[]> =>
    new Promise((resolve, reject) => {
      openDb().then((db) => {
        const tx = db.transaction(name, 'readonly');
        const store = tx.objectStore(name);
        const res = store.getAll();

        res.onsuccess = () => resolve(res.result as TData[]);
        res.onerror = (event: Event) => reject(event);
      });
    });

  /**
   * Refresh data.
   *
   * @return {Promise<void>}
   */
  const refreshData = async (): Promise<void> => getData().then(setData);

  /**
   * Save data in the database.
   *
   * @param {TData} value Value to save
   * @return {Promise<TData>}
   */
  const saveData = async (value: TData): Promise<TData> =>
    new Promise((resolve, reject) => {
      openDb().then((db) => {
        const tx = db.transaction(name, 'readwrite');
        const store = tx.objectStore(name);
        const res = store.add(value);

        res.onsuccess = () => {
          refreshData().finally(() => resolve(value));
        };
        res.onerror = (event: Event) => {
          refreshData().finally(() => reject(event));
        };
      });
    });

  /**
   * Delete data in the database by id.
   *
   * @param {BaseEntity['id']} id Id to find the item to delete
   * @return {Promise<boolean>}
   */
  const removeData = async (id: BaseEntity['id']): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      openDb().then((db) => {
        const tx = db.transaction(name, 'readwrite');
        const store = tx.objectStore(name);
        const res = store.delete(id);

        res.onsuccess = () => {
          refreshData().finally(() => resolve(true));
        };
        res.onerror = (event: Event) => {
          refreshData().finally(() => reject(event));
        };
      });
    });
  };

  /**
   * Clear all data in the database.
   *
   * @return {Promise<boolean>}
   */
  const clearData = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      openDb().then((db) => {
        const tx = db.transaction(name, 'readwrite');
        const store = tx.objectStore(name);
        const res = store.clear();

        res.onsuccess = () => {
          refreshData().finally(() => resolve(true));
        };
        res.onerror = (event: Event) => {
          refreshData().finally(() => reject(event));
        };
      });
    });
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { saveData, clearData, removeData, data };
}

export default useIndexedDB;
