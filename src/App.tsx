import { lazy, Suspense, useCallback, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PATHS } from '@constants/index';
import useOnlineStatus from '@hooks/useOnlineStatus';
import { useGetPeopleOptionsQuery, useGetPeopleQuery } from '@people/slice';
import { SentenceIndexedDBContext } from '@sentences/context';
import { useAddSentenceMutation, useGetLastSentenceQuery } from '@sentences/slice';
import Layout from '@shared/Layout/Layout';

const HomePage = lazy(() => import('@home/components/HomePage'));
const PeoplePage = lazy(() => import('@people/components/PeoplePage'));
const PersonPage = lazy(() => import('@people/components/PersonPage'));
const SentenceFormPage = lazy(() => import('@sentences/components/SentenceFormPage'));
const NotFoundPage = lazy(() => import('@shared/ErrorPage/NotFoundPage/NotFoundPage'));

/**
 * App.
 *
 * @return {JSX.Element}
 */
function App(): JSX.Element {
  const [addSentence] = useAddSentenceMutation();

  const { data, removeData, clearData } = useContext(SentenceIndexedDBContext);

  const isOnline = useOnlineStatus();

  useGetPeopleOptionsQuery();
  useGetPeopleQuery({ page: 1 });
  useGetLastSentenceQuery();

  const fetchSentenceFromStorage = useCallback(async (): Promise<void> => {
    const sentence = data[0];
    if (!isOnline || !sentence) return;

    await addSentence(sentence)
      .unwrap()
      .finally(() => removeData(sentence.id).catch(() => clearData()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isOnline]);

  useEffect(() => {
    fetchSentenceFromStorage();
  }, [fetchSentenceFromStorage]);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={PATHS.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.PEOPLE} element={<PeoplePage />} />
          <Route path={PATHS.PERSON} element={<PersonPage />} />
          <Route path={PATHS.SENTENCE_ADD} element={<SentenceFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
