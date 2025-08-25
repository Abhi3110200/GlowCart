import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeColors = {
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  badge: string;
  bag: string;
  primary: string;
  secondary: string;
  textSecondary: string;
  cardBackground: string;
};

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: ThemeColors;
  isDark: boolean;
};

const lightColors: ThemeColors = {
  background: '#FFEDE8',
  card: '#FFFFFF',
  text: '#1A1A1A',
  border: '#E0E0E0',
  notification: '#4B4B4B',
  badge: '#B84953',
  bag: '#4B4B4B',
  primary: '#B84953',
  secondary: '#4B4B4B',
  textSecondary: '#666666',
  cardBackground: '#FFFFFF',
};

const darkColors: ThemeColors = {
  background: '#070707',
  card: '#1E1E1E',
  text: '#FFFFFF',
  border: '#333333',
  bag:'#FFFFFF',
  notification: '#FFFFFF',
  badge: '#B84953',
  primary: '#FF6B6B',
  secondary: '#A0A0A0',
  textSecondary: '#A0A0A0',
  cardBackground: '#2D2D2D',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(colorScheme || 'light');

  useEffect(() => {
    // Sync with system theme changes
    setTheme(colorScheme || 'light');
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'dark' ? darkColors : lightColors;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
