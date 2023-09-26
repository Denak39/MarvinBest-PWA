import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import type { HeaderProps } from '@components/Header/Header.types';
import IconArrowBack from '@components/Icons/IconArrowBack';

import '@components/Header/Header.scss';

function Header({ className, goBack = false, title, ...props }: HeaderProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <header
      className={clsx('Header', { 'Header--has-go-back': goBack }, className)}
      data-testid="Header"
      {...props}
    >
      <div className="Header__go-back">
        <button onClick={() => navigate(-1)} aria-label="Retour en arrière">
          <IconArrowBack />
        </button>
      </div>

      <h1 className="Header__title">{title}</h1>
    </header>
  );
}

export default Header;
