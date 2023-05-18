/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* eslint-disable prettier/prettier */
import React from 'react';
// import { View, Text } from 'react-native'
import AppNavigator from './src/AppNavigation';
import { ContextOfCart } from './src/screens/homescreen/contextapi/ContextOfCart';

const App = () => {
  return (
    <ContextOfCart >
      <AppNavigator />
    </ContextOfCart>

  );
};

export default App;
