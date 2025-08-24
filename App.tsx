import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import TabNavigator from './src/navigation/TabNavigator'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})