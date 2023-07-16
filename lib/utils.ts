import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Set item in local storage
export const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get item from local storage
export const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item) as T;
  }
  return null;
};

// Remove item from local storage
export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

// Clear all items from local storage
export const clear = (): void => {
  localStorage.clear();
};
