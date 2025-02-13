import { createContext, useState, ReactNode } from 'react';
import { ThemeOption } from '../../types';

export const ThemeContext = createContext({
  theme: ThemeOption.Light,
  handleThemeChange: (_: ThemeOption) => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(ThemeOption.Light);
  const handleThemeChange = (colorTheme: ThemeOption) => {
    setTheme(colorTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
