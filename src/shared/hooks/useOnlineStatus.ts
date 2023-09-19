import { useEffect, useState } from 'react';

function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(window?.navigator?.onLine ?? true);

  const handleStatusChange = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  return isOnline;
}

export default useOnlineStatus;
