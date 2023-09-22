import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { loadSentencesFromLocalStorage } from '@app/sentence/sentenceSlice';
import type { RootState } from '@app/types';
import SentenceForm from '@sentences/components/SentenceForm';

function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const sentences = useAppSelector((state: RootState) => state.sentences.sentences);

  useEffect(() => {
    dispatch(loadSentencesFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      <h1>marvin.best</h1>
      <SentenceForm />
      <div>
        <h2>Sentences:</h2>
        <ul>
          {sentences.map((sentence) => (
            <li key={sentence.id}>
              <strong>{sentence.user.name}: </strong>
              {sentence.sentence}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HomePage;
