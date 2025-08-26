import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/theme/ThemeContext';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/providers/AuthProvider';

const App: React.FC = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <RootNavigator />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;