/* eslint-disable prettier/prettier */

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * This function is about the splash screen which is shown starting of app
 * @returns the app title with animated size and background
 */
const Splash = () => {
  const fontSizeValue = useRef(new Animated.Value(100)).current;
  const bgColorValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  console.log('splash screen');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('logginAlreadyDone');
        const isloggedin = JSON.parse(data); // also works if we give islogged in if-stmt
        // console.log('isloggedin', isloggedin);
        if (isloggedin === true) {
          navigation.navigate('homescreen');
        } else {
          // if null /false/other than true -else block executes in this case it is null
          navigation.navigate('login');
          navigation.navigate('registrationPage');
        }
      } catch (error) {
        console.log(error);
      }
    };
    Animated.parallel([
      Animated.timing(fontSizeValue, {
        toValue: 50,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(bgColorValue, {
        toValue: 4,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start(fetchData);
  }, [fontSizeValue, bgColorValue, navigation]);

  const bgColor = bgColorValue.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['white', '#d3a4a6', '#da8084', '#db6166', '#fd5c63'],
  });

  return (
    <Animated.View style={[styles.container, {backgroundColor: bgColor}]}>
      <Animated.Text style={[styles.title, {fontSize: fontSizeValue}]}>
        Zomato
      </Animated.Text>
    </Animated.View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
});
