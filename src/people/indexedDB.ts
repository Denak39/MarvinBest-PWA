/* eslint-disable no-console */
import type { Media } from './imageSlice';

const DB_NAME = 'imageUploaderDB';
const OBJECT_STORE_NAME = 'media';

export const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };
  });
};

export const addMediaToDB = (media: Media) => {
  const onSuccess = () => {
    console.log('Media added to IndexedDB successfully');
  };

  const onError = (event: Event) => {
    const error = event.target as unknown as DOMException;
    if (error instanceof DOMException) {
      console.error('Error adding media to IndexedDB:', error);
    } else {
      console.error('Unexpected error type:', error);
    }
  };

  const onTransactionComplete = (db: IDBDatabase) => {
    db.close();
  };
  console.log(media);
  openDB()
    .then((db) => {
      const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      const serializableMedia = {
        id: media.id,
        name: media.name,
        url: media.url,
        type: media.type,
      };

      const request = objectStore.add(serializableMedia);
      request.onsuccess = onSuccess;
      request.onerror = onError;
      transaction.oncomplete = () => onTransactionComplete(db);
    })
    .catch((error) => {
      console.error('Error opening IndexedDB:', error);
    });
};

export const clearIndexedDB = () => {
  return new Promise<void>((resolve, reject) => {
    openDB()
      .then((db) => {
        const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

        const clearRequest = objectStore.clear();

        clearRequest.onsuccess = () => {
          console.log('All media cleared from IndexedDB successfully');
          resolve();
        };

        clearRequest.onerror = (error) => {
          console.error('Error clearing media from IndexedDB:', error);
          reject(new Error('Error clearing media from IndexedDB'));
        };

        transaction.oncomplete = () => {
          db.close();
        };
      })
      .catch((error) => {
        console.error('Error opening IndexedDB:', error);
        reject(new Error('Error opening IndexedDB'));
      });
  });
};
