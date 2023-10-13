import { useRegisterSW } from 'virtual:pwa-register/react';

import Button from '@shared/Button/Button';
import IconReload from '@shared/Icons/IconReload';
import Modal from '@shared/Modal/Modal';

/**
 * Modal prompting user to update service worker.
 *
 * @return {JSX.Element}
 */
function ReloadModal(): JSX.Element {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const handleClose = (): void => setNeedRefresh(false);

  const handleUpdateServiceWorker = async (): Promise<void> => updateServiceWorker(true);

  return (
    <Modal className="ReloadModal" isVisible={needRefresh} onClose={handleClose}>
      <IconReload />

      <h2 className="ReloadModal__title">Mise à jour disponible</h2>

      <p className="ReloadModal__text">
        Une nouvelle mise à jour de
        <br /> l’application est disponible. Installez
        <br /> là dès maintenant !
      </p>

      <Button onClick={handleUpdateServiceWorker} className="ReloadModal__button">
        Mettre à jour
      </Button>
    </Modal>
  );
}

export default ReloadModal;
