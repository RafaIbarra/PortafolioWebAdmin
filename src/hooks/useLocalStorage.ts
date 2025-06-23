import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue?: T): [
  T,
  (value: T) => void,
  () => T | null // Función "obtener" que devuelve el valor actual sin estado
] 
{
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value); // <-- Esto actualiza el estado
      window.localStorage.setItem(key, JSON.stringify(value)); // <-- Esto actualiza el localStorage
    } catch (error) {
      console.warn(error);
    }
  };

  const obtener = (): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  return [storedValue, setValue,obtener];
}

export default useLocalStorage;
