import { useCallback, useEffect, useState } from 'react';

function useScrolledToBottom(offset: number = 0): boolean {
  const [isBottom, setIsBottom] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const newIsBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
    setIsBottom(newIsBottom);
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
