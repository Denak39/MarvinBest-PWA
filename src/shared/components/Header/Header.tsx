import clsx from 'clsx';

import type { HeaderProps } from '@components/Header/Header.types';

import '@components/Header/Header.scss';

function Header({ title, className, ...props }: HeaderProps): JSX.Element {
  return (
    <header className={clsx('Header', className)} data-testid="Header" {...props}>
      <h1 className="Header__title">{title}</h1>
    </header>
  );
}

export default Header;
