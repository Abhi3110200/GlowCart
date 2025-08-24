import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import TabNavigator from './src/navigation/TabNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <RootNavigator />
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})