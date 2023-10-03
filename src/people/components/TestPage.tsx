/* eslint-disable no-console */
import type React from 'react';
import { useEffect } from 'react';

import Button from '@components/Button/Button';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { addImage, clearImagesFromDB, selectImages } from '@people/imageSlice';

import { addImageToDB, openDB } from '../indexedDB';

import '../styles/TestPage.scss';

function ImageUpload() {
  const dispatch = useAppDispatch();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      Array.from(files).forEach(async (file: File) => {
        console.log(file);
        const reader = new FileReader();

        reader.onload = () => {
          const image = { id: file.name, name: file.name, url: reader.result as string };
          dispatch(addImage(image));
          addImageToDB(image);
        };

        reader.readAsDataURL(file);
      });
    }
  };

  return <input type="file" multiple onChange={handleFileUpload} />;
}

function TestPage() {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages);

  useEffect(() => {
    let isMounted = true;

    const fetchImagesFromIndexedDB = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction(['images'], 'readonly');
        const objectStore = transaction.objectStore('images');

        const getAllImagesRequest = objectStore.getAll();

        getAllImagesRequest.onsuccess = function handleGetAllImagesSuccess() {
          const storedImages = getAllImagesRequest.result;

          if (isMounted) {
            if (images.length === 0) {
              storedImages.forEach((image) => {
                dispatch(addImage(image));
              });
            }
          }
        };

        getAllImagesRequest.onerror = function handleGetAllImagesError(error) {
          console.error('Error retrieving images from IndexedDB:', error);
        };
      } catch (error) {
        console.error('Error opening IndexedDB:', error);
      }
    };

    fetchImagesFromIndexedDB();

    return () => {
      isMounted = false;
    };
  }, [dispatch, images]);

  const handleClearImages = () => {
    dispatch(clearImagesFromDB());
  };

  return (
    <div className="TestPage">
      <h1>Image Uploader</h1>
      <ImageUpload />
      <Button onClick={handleClearImages}>Clear Images</Button>
      <div>
        <h2>Uploaded Images:</h2>
        <ul>
          {images.map((image) => (
            <li key={image.id}>
              <img
                src={image.url}
                alt={image.name}
                style={{ maxWidth: '300px', maxHeight: '300px' }}
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
