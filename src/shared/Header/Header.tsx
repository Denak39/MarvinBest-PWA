import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import type { HeaderProps } from '@shared/Header/Header.types';
import IconButton from '@shared/IconButton/IconButton';
import IconArrowBack from '@shared/Icons/IconArrowBack';

/**
 * Header component.
 *
 * @param {HeaderProps} props Props
 * @return {JSX.Element}
 */
function Header({ children, className, goBack = false, ...props }: HeaderProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <header className={clsx('Header', className)} data-testid="Header" {...props}>
      <IconButton
        aria-label="Retour en arrière"
        hidden={!goBack}
        onClick={() => navigate(-1)}
        variant="secondary"
      >
        <IconArrowBack />
      </IconButton>

      <h1 className="Header__title">{children}</h1>
    </header>
  );
}

export default Header;
