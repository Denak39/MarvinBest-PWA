import { useEffect } from 'react';

import { useGetLastSentenceQuery } from '@sentences/slice';
import Button from '@shared/Button/Button';
import IconDownload from '@shared/Icons/components/IconDownload';
import Message from '@shared/Message/Message';

import logoSrc from '@assets/logo.png';

let promptInstall: BeforeInstallPromptEvent;

/**
 * Home page.
 *
 * @return {JSX.Element}
 */
function HomePage(): JSX.Element {
  const { data: lastSentence } = useGetLastSentenceQuery();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      promptInstall = event as BeforeInstallPromptEvent;
    });
  }, []);

  /**
   * Install PWA.
   *
   * @return {Promise<void>}
   */
  const handleInstallPWA = async (): Promise<void> => {
    if (!promptInstall) return;
    await promptInstall.prompt();
  };

  return (
    <div className="HomePage" data-testid="HomePage">
      {!!promptInstall && (
        <Button
          aria-label="Installer l'application"
          className="HomePage__button"
          iconLeft={IconDownload}
          onClick={handleInstallPWA}
          variant="secondary"
        >
          Télécharger l&apos;application
        </Button>
      )}

      <h1 className="HomePage__logo">
        <img alt="Logo Quiproquotes" src={logoSrc} draggable={false} />
      </h1>

      {!!lastSentence && (
        <>
          <h2 className="HomePage__title">Dernière phrase ajoutée</h2>
          <Message name={lastSentence.person.name} date={lastSentence.createdAt}>
            {lastSentence.message}
          </Message>
        </>
      )}
    </div>
  );
}

export default HomePage;
