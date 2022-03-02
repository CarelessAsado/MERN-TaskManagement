import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [itemStored, setItemStored] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });
  function saveLocalStorage(passAnItem) {
    try {
      localStorage.setItem(key, JSON.stringify(passAnItem));
      setItemStored(passAnItem);
    } catch (error) {
      console.log(error, "error custom hook useLocalStorage");
    }
  }
  return [itemStored, saveLocalStorage];
};
