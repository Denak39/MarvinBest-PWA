/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import { addImage, selectImages } from '@people/imageSlice';

import '@people/styles/PeoplePage.scss';

function FileUpload() {
  const dispatch = useDispatch();

  const handleFileUpload = async (event: any) => {
    const { files } = event.target;

    const openDB = indexedDB.open('myDatabase', 2);

    openDB.onupgradeneeded = function (event) {
      const db = openDB.result;
      const objectStore = db.createObjectStore('images', { keyPath: 'id' });
      objectStore.createIndex('name', 'name', { unique: false });
    };

    openDB.onsuccess = function () {
      const db = openDB.result;
      const transaction = db.transaction(['images'], 'readwrite');
      const objectStore = transaction.objectStore('images');

      Array.from(files).forEach(async (file: any) => {
        const imageUrl = URL.createObjectURL(file);
        const image = { id: file.name, name: file.name, url: imageUrl };
        dispatch(addImage(image));

        // Store image URL in IndexedDB
        const request = objectStore.add(image);

        request.onsuccess = function () {
          console.log('Image added to IndexDB successfully');
        };

        request.onerror = function (error) {
          console.error('Error adding image to IndexDB:', error);
        };
      });
    };
  };

  return <input type="file" multiple onChange={handleFileUpload} />;
}

function TestPage(): JSX.Element {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  console.log('images', images);

  useEffect(() => {
    const openDB = indexedDB.open('myDatabase', 2); // Increment the version number

    openDB.onupgradeneeded = function (event) {
      const db = openDB.result;
      const objectStore = db.createObjectStore('images', { keyPath: 'id' });
      objectStore.createIndex('name', 'name', { unique: false });
    };

    openDB.onsuccess = function handleOpenDBSuccess() {
      const db = openDB.result;
      const transaction = db.transaction(['images'], 'readonly');
      const objectStore = transaction.objectStore('images');

      const getAllImagesRequest = objectStore.getAll();

      getAllImagesRequest.onsuccess = function handleGetAllImagesSuccess() {
        const storedImages = getAllImagesRequest.result;

        const uniqueImages = new Map();

        // Use Map to ensure unique images based on the 'id' property
        storedImages.forEach((image) => {
          uniqueImages.set(image.id, image);
        });

        // Convert Map back to an array
        const uniqueImagesArray = Array.from(uniqueImages.values());
        console.log('unique', uniqueImagesArray);

        uniqueImagesArray.forEach((image) => {
          dispatch(addImage(image));
        });
      };

      getAllImagesRequest.onerror = function handleGetAllImagesError(error) {
        console.error('Error retrieving images from IndexedDB:', error);
      };
    };
  }, []);

  function clearAllImages() {
    const openDB = indexedDB.open('myDatabase', 2); // Increment the version number

    openDB.onupgradeneeded = function (event) {
      const db = openDB.result;
      const objectStore = db.createObjectStore('images', { keyPath: 'id' });
      objectStore.createIndex('name', 'name', { unique: false });
    };

    openDB.onsuccess = function () {
      const db = openDB.result;
      const transaction = db.transaction(['images'], 'readwrite');
      const objectStore = transaction.objectStore('images');

      const clearRequest = objectStore.clear();

      clearRequest.onsuccess = function () {
        console.log('All images cleared from IndexedDB successfully');
      };

      clearRequest.onerror = function (error) {
        console.error('Error clearing images from IndexedDB:', error);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  const handleClearImagesClick = () => {
    clearAllImages();
  };

  return (
    <div className="PeoplePage">
      <Header title="Test" />
      <Button onClick={handleClearImagesClick}>Clear All Images</Button>

      <FileUpload />
      <div>
        <h2>Uploaded Images:</h2>
        <ul>
          {images.map((image) => (
            <li key={image.id}>
              <img
                src={image.url}
                alt={image.name}
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
              <p>{image.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TestPage;
