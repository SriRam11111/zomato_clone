/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {THEME_COLOR} from '../../strings';
import {db} from '../../firebaseConfig';
import {ref, set} from 'firebase/database';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState();
  const [nameError, setNameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const data = await AsyncStorage.getItem('phoneNumber');
      console.log('getdata', data);
      setPhoneNumber(data);
    } catch (error) {
      console.log(error);
    }
  }

  // validation for registration
  const validate = () => {
    name === '' ? setNameError(true) : setNameError(false);
    email === '' ? setEmailError(true) : setEmailError(false);
    password === '' ? setPasswordError(true) : setPasswordError(false);
    confirmPassword === ''
      ? setConfirmPasswordError(true)
      : setConfirmPasswordError(false);
    password !== confirmPassword
      ? setConfirmPasswordError(true)
      : setConfirmPasswordError(false);
    //     console.log('nameError', nameError);
    //     console.log('emailError', emailError);
    //     console.log('passwordError', passwordError);
    //     console.log('confirmPasswordError', confirmPasswordError);
  };

  useEffect(() => {
    if (
      nameError === false &&
      emailError === false &&
      passwordError === false &&
      confirmPasswordError === false
    ) {
      handleRegistration();
    }
  }, [
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
    handleRegistration,
  ]);

  // function to add data to firebase realtime database
  const handleRegistration = useCallback(() => {
    set(ref(db, 'posts/' + name + 'details'), {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber,
    });
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    console.log('data saved');
    loggedin();
  }, [name, email, password, confirmPassword, phoneNumber, loggedin]);

  const loggedin = useCallback(async () => {
    console.log('..///...loggedin');
    try {
      await AsyncStorage.setItem('logginAlreadyDone', JSON.stringify(true));
      navigation.navigate('homescreen');
    } catch (error) {
      console.log(error);
    }
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      {nameError === true && (
        <Text style={{color: '#ffff'}}>Please Enter Name</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      {emailError === true && (
        <Text style={{color: '#ffff'}}>Please Enter Email</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        keyboardType="numeric"
        secureTextEntry
      />
      {passwordError === true && (
        <Text style={{color: '#ffff'}}>Please Enter Password</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Co                                                                                                                                                                                                                                                                           nfirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        keyboardType="numeric"
        secureTextEntry
      />
      {confirmPasswordError === true && (
        <Text style={{color: '#ffff'}}>Please Enter correct Password</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={validate}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLOR,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegistrationPage;
