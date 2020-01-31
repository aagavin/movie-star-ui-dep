import { useEffect, useMemo, useState } from 'react';

const useWindowSize = () => {

  const isClient = typeof window === 'object';


  const getSize = useMemo(
    () => {
        return() => ({
          width: isClient ? window.innerWidth : undefined,
          height: isClient ? window.innerHeight : undefined
        });
    },
    [isClient],
  );

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;

};


export default useWindowSize;