/* eslint-disable no-console */
import { useAppDispatch } from '@hooks/useAppDispatch';
import useOnlineStatus from '@hooks/useOnlineStatus';
import type { Media } from '@people/Test/imageSlice';
import { addMedia } from '@people/Test/imageSlice';
import { addMediaToDB } from '@people/Test/indexedDB';

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

export default function MediaUpload() {
  const dispatch = useAppDispatch();
  const isOnline = useOnlineStatus();

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
          if (isOnline) {
            // If online, directly add to Redux store
            console.log('online so redux');
            dispatch(addMedia(media));
          } else {
            console.log('offline so indexedDB');
            // If offline, add to both IndexedDB
            addMediaToDB(media);
          }
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
