/* eslint-disable no-console */
import type React from 'react';
import { useEffect, useState } from 'react';

import Button from '@components/Button/Button';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import type { Media } from '@people/imageSlice';
import { addMedia, clearMediaFromDB, selectMediaData } from '@people/imageSlice';

import { addMediaToDB, openDB } from '../indexedDB';

import '../styles/TestPage.scss';

const createVideoURL = async (data: string | ArrayBuffer): Promise<string> => {
  if (typeof data === 'string') {
    return data;
  }

  const blob = new Blob([data], { type: 'video/mp4' });
  const reader = new FileReader();

  return new Promise<string>((resolve) => {
    reader.onload = () => {
      const dataURL = reader.result as string;
      resolve(dataURL);
    };

    reader.readAsDataURL(blob);
  });
};

function MediaUpload() {
  const dispatch = useAppDispatch();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      Array.from(files).forEach(async (file: File) => {
        const reader = new FileReader();

        reader.onload = async () => {
          const media: Media = {
            id: file.name,
            name: file.name,
            type: file.type.startsWith('image') ? 'image' : 'video',
            url: file.type.startsWith('video')
              ? await createVideoURL(reader.result as ArrayBuffer)
              : (reader.result as string),
          };

          dispatch(addMedia(media));
          addMediaToDB(media);
        };

        if (file.type.startsWith('image')) {
          reader.readAsDataURL(file);
        } else if (file.type.startsWith('video')) {
          reader.readAsArrayBuffer(file);
        }
      });
    }
  };

  return <input type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} />;
}

function MediaList() {
  const mediaList = useAppSelector(selectMediaData);

  const renderMediaElement = (media: Media) => {
    if (media.type === 'image') {
      return (
        <img src={media.url} alt={media.name} style={{ maxWidth: '300px', maxHeight: '300px' }} />
      );
    }

    if (media.type === 'video') {
      return (
        <video width="320" height="240" controls>
          <source src={media.url} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return null;
  };

  return (
    <div>
      <h2>Uploaded Media:</h2>
      <ul>
        {mediaList.map((media) => (
          <li key={media.id}>
            {renderMediaElement(media)}
            <p>{media.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TestPage() {
  const dispatch = useAppDispatch();
  const media = useAppSelector(selectMediaData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMediaFromIndexedDB = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction(['media'], 'readonly');
        const objectStore = transaction.objectStore('media');

        const getAllImagesRequest = objectStore.getAll();

        getAllImagesRequest.onsuccess = function handleGetAllImagesSuccess() {
          const storedImages = getAllImagesRequest.result;

          if (isMounted) {
            if (media.length === 0) {
              storedImages.forEach((image) => {
                dispatch(addMedia(image));
              });
            }
            setIsLoading(false);
          }
        };

        getAllImagesRequest.onerror = function handleGetAllImagesError(error) {
          console.error('Error retrieving images from IndexedDB:', error);
        };
      } catch (error) {
        console.error('Error opening IndexedDB:', error);
      }
    };

    fetchMediaFromIndexedDB();

    return () => {
      isMounted = false;
    };
  }, [dispatch, media]);

  const handleClearImages = () => {
    dispatch(clearMediaFromDB());
  };

  return (
    <div className="TestPage">
      <h1>Image Uploader</h1>
      <MediaUpload />
      {isLoading ? (
        <p>Loading media from IndexedDB...</p>
      ) : (
        <>
          <MediaList />
          <Button onClick={handleClearImages}>Clear Images</Button>
        </>
      )}
    </div>
  );
}

export default TestPage;
