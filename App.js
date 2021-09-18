import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DrawerNavigator from './navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import { createSwitchNavigator,createAppContainer } from 'react-navigation';


const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
})


const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App() {
  return (
    <AppNavigator/>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
