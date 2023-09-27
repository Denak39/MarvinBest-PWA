import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import type { BaseErrorPageProps } from '@components/ErrorPage/BaseErrorPage/BaseErrorPage.types';
import Header from '@components/Header/Header';
import IconHome from '@components/Icons/IconHome';
import { PATHS } from '@constants/index';

import mascotMarvinBestSad from '@images/mascot-marvin-best-sad.png';

import '@components/ErrorPage/BaseErrorPage/BaseErrorPage.scss';

function BaseErrorPage({ children, className, title, ...props }: BaseErrorPageProps): JSX.Element {
  return (
    <div className={clsx('BaseErrorPage', className)} data-testid="BaseErrorPage" {...props}>
      <Header title={title} goBack />

      <div className="BaseErrorPage__image-wrapper">
        <img
          alt="Mascotte marvin.best triste"
          className="BaseErrorPage__image"
          src={mascotMarvinBestSad}
          draggable={false}
        />

        <p className="BaseErrorPage__text">{children}</p>
      </div>

      <NavLink to={PATHS.HOME} className="BaseErrorPage__link Button">
        Revenir à l’accueil
        <IconHome />
      </NavLink>
    </div>
  );
}

export default BaseErrorPage;
