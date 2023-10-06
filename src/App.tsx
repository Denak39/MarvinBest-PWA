import { lazy, Suspense, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import { IndexedDBStores, PATHS } from '@constants/index';
import useIndexedDB from '@hooks/useIndexedDB';
import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery, useGetPeopleQuery } from '@people/slice';
import { useAddSentenceMutation } from '@sentences/slice';
import type { AddSentenceIndexedDB } from '@sentences/types';

import '@styles/index.scss';

const HomePage = lazy(() => import('@home/components/HomePage'));
const PeoplePage = lazy(() => import('@people/components/PeoplePage'));
const PersonPage = lazy(() => import('@people/components/PersonPage'));
const SentenceFormPage = lazy(() => import('@sentences/components/SentenceFormPage'));
const NotFoundPage = lazy(() => import('@components/ErrorPage/NotFoundPage'));

function App() {
  const [addSentence] = useAddSentenceMutation();
  const {
    saveData: saveSentenceToStorage,
    data: sentencesFromStorage,
    removeData,
    clearData,
  } = useIndexedDB<AddSentenceIndexedDB>({
    name: IndexedDBStores.SENTENCES,
  });

  const isOnline = useOnlineStatus();

  useGetPeopleOptionsQuery({
    'order[name]': 'asc',
    pagination: false,
  });
  useGetPeopleQuery({
    'order[name]': 'asc',
    page: 1,
  });

  const fetchSentenceFromStorage = useCallback(async (): Promise<void> => {
    const sentence = sentencesFromStorage[0];
    if (!isOnline || !sentence) return;

    await addSentence(sentence)
      .unwrap()
      .finally(() => removeData(sentence.id).catch(() => clearData()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, sentencesFromStorage]);

  useEffect(() => {
    fetchSentenceFromStorage();
  }, [fetchSentenceFromStorage]);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={PATHS.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path={PATHS.PEOPLE}
            element={<PeoplePage sentencesFromStorage={sentencesFromStorage} />}
          />
          <Route
            path={PATHS.PERSON}
            element={
              <PersonPage
                saveSentenceToStorage={saveSentenceToStorage}
                sentencesFromStorage={sentencesFromStorage}
              />
            }
          />
          <Route
            path={PATHS.SENTENCE_FORM}
            element={<SentenceFormPage saveSentenceToStorage={saveSentenceToStorage} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
