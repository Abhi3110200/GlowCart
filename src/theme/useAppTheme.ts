import { useTheme } from './ThemeContext';

export const useAppTheme = () => {
  const { colors, theme, toggleTheme, isDark } = useTheme();
  
  return {
    colors,
    theme,
    toggleTheme,
    isDark,
    // Add any additional theme-related utilities here
  };
};
