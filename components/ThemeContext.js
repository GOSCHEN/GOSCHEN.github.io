import { createContext, useContext } from 'react';

export const ThemeToggleContext = createContext({ value: true, toggle: () => {} });

export const useThemeToggle = () => useContext(ThemeToggleContext);
