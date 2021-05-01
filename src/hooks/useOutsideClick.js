import { useEffect, useState } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(ref) {
  const [clickedOutside, setClickedOutside] = useState(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickedOutside(true);
      } else {
        setClickedOutside(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return { clickedOutside };
}

export default useOutsideClick;
