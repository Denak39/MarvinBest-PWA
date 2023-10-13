import { lazy, Suspense, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { IndexedDBStores, PATHS } from '@constants/index';
import useIndexedDB from '@hooks/useIndexedDB';
import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery, useGetPeopleQuery } from '@people/slice';
import { useAddSentenceMutation, useGetLastSentenceQuery } from '@sentences/slice';
import type { AddSentenceStorage } from '@sentences/types';
import Layout from '@shared/Layout/Layout';

const HomePage = lazy(() => import('@home/components/HomePage'));
const PeoplePage = lazy(() => import('@people/components/PeoplePage'));
const PersonPage = lazy(() => import('@people/components/PersonPage'));
const SentenceFormPage = lazy(() => import('@sentences/components/SentenceFormPage'));
const NotFoundPage = lazy(() => import('@shared/ErrorPage/NotFoundPage'));

function App() {
  const [addSentence] = useAddSentenceMutation();
  const {
    saveData: saveSentenceToStorage,
    data: sentencesFromStorage,
    removeData,
    clearData,
  } = useIndexedDB<AddSentenceStorage>({
    name: IndexedDBStores.SENTENCES,
  });

  const isOnline = useOnlineStatus();

  useGetPeopleOptionsQuery();
  useGetPeopleQuery({ page: 1 });
  useGetLastSentenceQuery();

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
            path={PATHS.SENTENCE_ADD}
            element={<SentenceFormPage saveSentenceToStorage={saveSentenceToStorage} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
