import { DB_NAME, IndexedDBStores } from '@constants/index';

/**
 * Mock navigator on line.
 *
 * @param {boolean} value Value
 * @return {void}
 */
export function navigatorOnLineMock(value: boolean): void {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(value);
}

/**
 * Clear database.
 *
 * @return {Promise<boolean>}
 */
export function clearDatabase(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME);

    req.onsuccess = () => {
      const res = req.result
        .transaction(IndexedDBStores.SENTENCES, 'readwrite')
        .objectStore(IndexedDBStores.SENTENCES)
        .clear();
      res.onsuccess = () => resolve(true);
    };
    req.onupgradeneeded = () => {
      if (req.result.objectStoreNames.contains(IndexedDBStores.SENTENCES)) return;
      req.result.createObjectStore(IndexedDBStores.SENTENCES, { keyPath: 'id' });
    };
    req.onerror = () => reject();
  });
}
