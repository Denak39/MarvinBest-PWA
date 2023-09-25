import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import { PATHS } from '@constants/index';

import '@styles/index.scss';

const HomePage = lazy(() => import('@home/HomePage'));
const PeoplePage = lazy(() => import('@people/components/PeoplePage'));
const PersonPage = lazy(() => import('@people/components/PersonPage'));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={PATHS.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.PEOPLE} element={<PeoplePage />} />
          <Route path={PATHS.PERSON} element={<PersonPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
