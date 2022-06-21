import { RefObject, useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref.
 */
const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  action: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element.
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useOnClickOutside;
