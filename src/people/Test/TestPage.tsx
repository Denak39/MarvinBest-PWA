import Button from '@components/Button/Button';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { clearMediaFromDB } from '@people/Test/imageSlice';

import MediaList from './MediaList';
import MediaUpload from './MediaUpload';

import './TestPage.scss';

function TestPage() {
  const dispatch = useAppDispatch();

  const handleClearImages = () => {
    dispatch(clearMediaFromDB());
  };

  return (
    <div className="TestPage">
      <h1>Image Uploader</h1>
      <MediaUpload />

      <MediaList />
      <Button onClick={handleClearImages}>Clear Images</Button>
    </div>
  );
}

export default TestPage;
