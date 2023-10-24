import { useRegisterSW } from 'virtual:pwa-register/react';

import Button from '@shared/Button/Button';
import IconReload from '@shared/Icons/components/IconReload';
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
    <Modal
      className="ReloadModal"
      icon={IconReload}
      isVisible={needRefresh}
      onClose={handleClose}
      title="Mise à jour disponible"
    >
      <p>
        Une nouvelle mise à jour de
        <br /> l’application est disponible. Installez
        <br /> là dès maintenant !
      </p>

      <Button onClick={handleUpdateServiceWorker}>Mettre à jour</Button>
    </Modal>
  );
}

export default ReloadModal;
