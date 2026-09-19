import { useState, useEffect, useCallback } from 'react';

export default function useDarkMode(initialValue = true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(value));
    } catch (e) {
      // ignore
    }
  }, [value]);

  const enable = useCallback(() => setValue(true), []);
  const disable = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return {
    value,
    enable,
    disable,
    toggle,
  };
}

