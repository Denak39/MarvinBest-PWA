import { useCallback, useEffect, useState } from 'react';

function useScrolledToBottom(offset: number = 0): boolean {
  const [isBottom, setIsBottom] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - offset) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }, [offset]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isBottom;
}

export default useScrolledToBottom;
