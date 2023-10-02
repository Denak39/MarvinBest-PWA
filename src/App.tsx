import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import { PATHS } from '@constants/index';
import { useGetPeopleOptionsQuery, useGetPeopleQuery } from '@people/slice';

import '@styles/index.scss';

const HomePage = lazy(() => import('@home/HomePage'));
const PeoplePage = lazy(() => import('@people/components/PeoplePage'));
const PersonPage = lazy(() => import('@people/components/PersonPage'));
const SentenceFormPage = lazy(() => import('@sentences/components/SentenceFormPage'));
const NotFoundPage = lazy(() => import('@components/ErrorPage/NotFoundPage'));

function App() {
  useGetPeopleOptionsQuery({
    'order[name]': 'asc',
    pagination: false,
  });
  useGetPeopleQuery({
    'order[name]': 'asc',
    page: 1,
  });

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={PATHS.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.PEOPLE} element={<PeoplePage />} />
          <Route path={PATHS.PERSON} element={<PersonPage />} />
          <Route path={PATHS.SENTENCE_FORM} element={<SentenceFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
