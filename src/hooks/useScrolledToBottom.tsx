import { useCallback, useEffect, useState } from 'react';

/**
 * Hook useScrolledToBottom.
 *
 * @return {number} offset Offset scroll
 * @return {boolean}
 */
function useScrolledToBottom(offset: number = 0): boolean {
  const [isBottom, setIsBottom] = useState<boolean>(false);

  /**
   * Update isBottom state according scroll position.
   *
   * @return {void}
   */
  const handleScroll = useCallback(() => {
    const newIsBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
    setIsBottom(newIsBottom);
  }, [offset]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return isBottom;
}

export default useScrolledToBottom;
