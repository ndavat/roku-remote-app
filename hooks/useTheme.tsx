import { useColorScheme } from 'react-native';
import { useState, createContext, useContext, useEffect } from 'react';
import { lightColors, darkColors, ColorTheme } from '@/utils/colorTheme';

interface ThemeContextType {
  colors: ColorTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

// Create a context for the theme
export const ThemeContext = createContext<ThemeContextType>({
  colors: lightColors,
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  // Update theme when system theme changes
  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);
  
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  
  const setTheme = (dark: boolean) => {
    setIsDark(dark);
  };
  
  const colors = isDark ? darkColors : lightColors;
  
  const value = {
    colors,
    isDark,
    toggleTheme,
    setTheme,
  };
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}