/* eslint-disable prettier/prettier */
import Splash from './screens/Splash';
import Login from './screens/Login';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homescreen/HomeScreen';
import EachHotelDetails from './screens/homescreen/data/EachHotelDetails';
import OrderData from './screens/homescreen/orderdata/OrderData';
import RegistrationPage from './screens/registration/registrationPage';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name="splash"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Login}
          name="login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={HomeScreen}
          name="homescreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={EachHotelDetails}
          name="eachhoteldetails"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={OrderData}
          name="orderdata"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={RegistrationPage}
          name="registrationPage"
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
