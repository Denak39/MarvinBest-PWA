import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { PATHS } from '@constants/index';
import type { BaseErrorPageProps } from '@shared/ErrorPage/BaseErrorPage/BaseErrorPage.types';
import Header from '@shared/Header/Header';
import IconHome from '@shared/Icons/components/IconHome';

import mascotSrc from '@assets/mascot.png';

/**
 * BaseErrorPage component.
 *
 * @param {BaseErrorPageProps} props Props
 * @return {JSX.Element}
 */
function BaseErrorPage({ children, className, title, ...props }: BaseErrorPageProps): JSX.Element {
  return (
    <div className={clsx('BaseErrorPage', className)} data-testid="BaseErrorPage" {...props}>
      <Header goBack>{title}</Header>

      <div className="BaseErrorPage__image-wrapper">
        <img
          alt="Mascotte Quiproquotes"
          className="BaseErrorPage__image"
          draggable={false}
          src={mascotSrc}
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
