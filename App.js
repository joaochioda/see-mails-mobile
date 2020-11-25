import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

import {  createAppContainer, createSwitchNavigator } from 'react-navigation';

const MainNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
});


const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14213d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
