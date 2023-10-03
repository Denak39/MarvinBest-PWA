import { NavLink } from 'react-router-dom';

import Button from '@components/Button/Button';
import { PATHS } from '@constants/index';

function HomePage(): JSX.Element {
  return (
    <>
      {' '}
      <h1>marvin.best</h1>{' '}
      <NavLink to={PATHS.TEST} aria-label="Aller à la page d'accueil">
        <Button>TEST</Button>
      </NavLink>
    </>
  );
}

export default HomePage;
