/**
 * Taken from @jrtilak/lazykit
 * See more about this method: https://lazykit.jrtilak.dev/docs/react-hooks/functional/useDebounceValue
 */

import { useEffect,useState } from 'react';

/**
 * Custom hook that returns a debounced value after a specified delay.
 */
function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebouncedValue;
