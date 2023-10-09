/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { useAppSelector } from '@hooks/useAppSelector';
import type { Media } from '@people/Test/imageSlice';
import { selectMediaData } from '@people/Test/imageSlice';
import { fetchMediaFromDB } from '@people/Test/indexedDB';

function MediaList() {
  const [mediaIndexedDB, setMediaIndexedDB] = useState<Media[]>();
  const mediaRedux = useAppSelector(selectMediaData);

  useEffect(() => {
    fetchMediaFromDB()
      .then((mediaFromDB) => {
        console.log('mediafromdb', mediaFromDB);
        setMediaIndexedDB(mediaFromDB);
      })
      .catch((error) => {
        console.error('Error fetching media from IndexedDB:', error);
      });
  }, []);

  const renderMediaElement = (media: Media) => {
    if (media.type === 'image') {
      return (
        <img src={media.url} alt={media.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
      );
    }

    if (media.type === 'video') {
      return (
        <video width="250" height="180" controls>
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
      <h2>Uploaded Media for Redux:</h2>

      <ul>
        {mediaRedux.map((media) => (
          <li key={media.id}>
            {renderMediaElement(media)}
            <p>{media.name}</p>
          </li>
        ))}
      </ul>
      <h2>Uploaded Media from IndexedDB:</h2>
      <ul>
        {mediaIndexedDB &&
          mediaIndexedDB.map((media) => (
            <li key={media.id}>
              {renderMediaElement(media)}
              <p>{media.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MediaList;
