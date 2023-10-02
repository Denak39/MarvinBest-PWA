// import { useEffect } from 'react';

import { useState } from 'react';

import IconButton from '@components/IconButton/IconButton';
import Modal from '@components/Modal/Modal';

// import { useAppDispatch, useAppSelector } from '@app/hooks';
// import { loadSentencesFromLocalStorage } from '@app/sentence/sentenceSlice';
// import type { RootState } from '@app/types';
// import SentenceForm from '@sentences/components/SentenceForm';

function HomePage(): JSX.Element {
  // const dispatch = useAppDispatch();
  // const sentences = useAppSelector(
  //   (state: RootState) => state.sentences.sentences
  // );

  // useEffect(() => {
  //   dispatch(loadSentencesFromLocalStorage());
  // }, [dispatch]);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <h1>marvin.best</h1>
      <div>
        <h2>Sentences:</h2>
        <ul>
          {/* {sentences.map((sentence) => (
            <li key={sentence.id}>
              <strong>{sentence.user.name}: </strong>
              {sentence.sentence}
            </li>
          ))} */}
        </ul>
      </div>

      <IconButton onClick={() => setIsVisible(true)}>Ouvrir</IconButton>

      <Modal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        Content
      </Modal>
    </>
  );
}

export default HomePage;
