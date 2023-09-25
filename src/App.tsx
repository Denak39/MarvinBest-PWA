import { Route, Routes } from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import { PATHS } from '@constants/index';
import HomePage from '@home/HomePage';
import PeoplePage from '@people/components/PeoplePage';

import '@styles/index.scss';

function App() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={PATHS.PEOPLE} element={<PeoplePage />} />
      </Route>
    </Routes>
  );
}

export default App;
