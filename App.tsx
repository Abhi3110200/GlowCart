import { StyleSheet } from 'react-native';
import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/theme/ThemeContext';
import { StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <RootNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
const styles = StyleSheet.create({})