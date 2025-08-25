import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../theme/useAppTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <TouchableOpacity 
      style={styles.themeToggle} 
      onPress={toggleTheme}
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Ionicons 
        name={isDark ? 'sunny' : 'moon'} 
        size={24} 
        color={isDark ? '#FFD700' : '#4B4B4B'} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ThemeToggle;
