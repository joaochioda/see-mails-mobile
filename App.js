import { StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import MainScreenWithTabs from './screens/MainScreenWithTabs';

import {  createAppContainer, createSwitchNavigator } from 'react-navigation';

const MainNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  MainScreenWithTabs: { screen: MainScreenWithTabs },
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
