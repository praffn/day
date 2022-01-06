import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
  } from "react";
  
  type UseLocalStorageReturn<T> = [T, Dispatch<SetStateAction<T>>, () => void];


  export default function useLocalStorage<T>(
    key: string,
    initialValueOrFunction: T | (() => T)
  ): UseLocalStorageReturn<T> {
    const [state, setState] = useState(initialValueOrFunction);
  
    useEffect(() => {
      try {
        const raw = window.localStorage.getItem(key);
        if (raw) {
          setState(JSON.parse(raw));
        } else {
          const valueToStore = initialValueOrFunction instanceof Function ? initialValueOrFunction() : initialValueOrFunction;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (_) {}
    }, [key]);
  
    const setValue = useCallback(
      (value: T | ((value: T) => T)) => {
        try {
          const valueToStore = value instanceof Function ? value(state) : value;
          setState(valueToStore);
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (_) {}
      },
      [key, state]
    );
  
    const reset = useCallback(() => {
      window.localStorage.removeItem(key);
      const value =
        initialValueOrFunction instanceof Function
          ? initialValueOrFunction()
          : initialValueOrFunction;
      setState(value);
    }, [initialValueOrFunction, key]);
  
    return [state, setValue, reset];
  }
  