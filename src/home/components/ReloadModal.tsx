import { useRegisterSW } from 'virtual:pwa-register/react';

import Button from '@components/Button/Button';
import IconReload from '@components/Icons/IconReload';
import Modal from '@components/Modal/Modal';

import '@home/styles/ReloadModal.scss';

function ReloadModal(): JSX.Element {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const handleClose = () => {
    setNeedRefresh(false);
  };

  const handleUpdateServiceWorker = async () => {
    await updateServiceWorker(true);
  };

  return (
    <Modal className="ReloadModal" isVisible={needRefresh} onClose={handleClose}>
      <span className="ReloadModal__icon">
        <IconReload />
      </span>

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
