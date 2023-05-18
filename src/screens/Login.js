/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {Image} from 'moti';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {ToastAndroid} from 'react-native';
import Modal from 'react-native-modal';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Grayscale, //to change image into grey like applyimg filter
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
} from 'react-native-color-matrix-image-filters';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Login_Title, THEME_COLOR} from '../strings';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const [mobilenumber, setMobileNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [visiblebottomsheet, setVisibleBottomSheet] = useState(false);
  const [languages, setLanguages] = useState([
    {name: 'English', selected: true},
    {name: 'हिंदी', selected: false},
    {name: 'తెలుగు', selected: false},
    {name: 'தமிழ்', selected: false},
    {name: 'اردو', selected: false},
  ]);
  const [otp, setOtp] = useState('');

  const navigation = useNavigation();
  // Handle the button press
  const signInWithPhoneNumber = async () => {
    // const confirmation = await auth().signInWithPhoneNumber('+91'+mobilenumber);
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        '+91' + mobilenumber,
      );
      setConfirm(confirmation);
      // Handle the confirmation
      console.log('successfully mobile no registered');
      // console.log('confirmation', confirmation);
    } catch (error) {
      // Display the Toast message with a black background
      ToastAndroid.showWithGravityAndOffset(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0, // horizontal offset
        100, // vertical offset
        '#000000', // background color
        5000, // specify duration in milliseconds
      );
      console.log(error);
      console.log(error.code);
      console.log(error.message);
      // Handle the error
    }
  };

  const verifyCode = async () => {
    try {
      const res = await confirm.confirm(otp);
      console.log('response in OTP verification');
      try {
        const data = await AsyncStorage.setItem(
          'phoneNumber',
          res.user.phoneNumber,
        );
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('registrationPage');
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  const OnSelect = index => {
    let templanguages = languages;
    templanguages.map((item, ind) => {
      if (ind === index) {
        if (item.selected === true) {
          item.selected = false;
        } else {
          item.selected = true;
        }
      } else {
        item.selected = false;
      }
    });
    let x = [];
    templanguages.map(item => {
      x.push(item);
    });
    setLanguages(x);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={styles.topview}>
        <Image
          source={require('../images/secondscreentop.png')}
          style={styles.banner}
        />
        <TouchableOpacity
          style={styles.changelanguagebtn}
          onPress={() => {
            setVisibleBottomSheet(true);
            console.log('setVisibleBottomSheet');
          }}>
          <Image
            source={require('../images/languagechange.jpg')}
            style={styles.langicon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.logintitle}>{Login_Title}</Text>
      <View style={styles.divider}>
        <View style={[styles.dividerview, {marginLeft: 10}]} />
        <Text style={styles.dividertext}>Login or Signup</Text>
        <View style={[styles.dividerview, {marginRight: 10}]} />
      </View>
      {confirm == null ? (
        <View>
          <TextInput
            placeholder="mobile number"
            placeholderTextColor="#000000"
            style={styles.mobileinp}
            keyboardType="number-pad"
            value={mobilenumber}
            onChangeText={text => {
              setMobileNumber(text);
            }}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              signInWithPhoneNumber();
              // setConfirm(true);//for checking
            }}>
            <Text style={styles.loginbtntext}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <OTPInputView
            style={{width: '80%', height: 50, alignSelf: 'center'}}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
              setOtp(code);
            }}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              verifyCode();
              navigation.navigate('homescreen');
              // navigation.navigate('registrationPage');
            }}>
            <Text style={styles.loginbtntext}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* onBackButtonPress={() => {setVisibleBottomSheet(true);} used in model to set backbutton act */}
      <Modal
        isVisible={visiblebottomsheet}
        onBackdropPress={() => {
          setVisibleBottomSheet(false);
        }}
        onBackButtonPress={() => {
          setVisibleBottomSheet(false);
        }}
        style={styles.modelstyle}
        // animationIn={'slideInUp'}
        // animationInTiming={'1000'}
      >
        <View style={styles.modalcontainer}>
          <FlatList
            data={languages}
            renderItem={({item, index}) => {
              // console.log('item',item);
              return (
                <TouchableOpacity
                  style={[
                    styles.differentLanguages,
                    {borderColor: item.selected === true ? 'blue' : 'black'},
                  ]}
                  onPress={() => {
                    OnSelect(index);
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent:'center'
                      paddingLeft: 20,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {item.selected === true ? (
                        <Image
                          source={require('../images/radio-button_selected.png')}
                          style={styles.radiobuttonicon}
                        />
                      ) : (
                        <Image
                          source={require('../images/radio-button_unselected.png')}
                          style={styles.radiobuttonicon}
                        />
                      )}

                      <Text
                        style={{color: 'black', fontSize: 18, fontWeight: 400}}>
                        {item.name}
                      </Text>
                    </View>
                    {item.selected === true ? (
                      <ColorMatrix>
                        <Image
                          source={require('../images/languagechange.jpg')}
                          style={{height: 50, width: 50, marginRight: 15}}
                        />
                      </ColorMatrix>
                    ) : (
                      <Grayscale>
                        <Image
                          source={require('../images/languagechange.jpg')}
                          style={{
                            height: 50,
                            width: 50,
                            marginRight: 15,
                            opacity: 0.5,
                          }}
                        />
                      </Grayscale>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
  },
  topview: {
    height: responsiveHeight(30),
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  logintitle: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center', //right-left in middle
    // textAlign: 'center',
    marginTop: responsiveHeight(5),
  },
  divider: {
    flexDirection: 'row',
    width: '100%',
    marginTop: responsiveHeight(4),
    alignItems: 'center', //top-bottom in middle
    justifyContent: 'space-evenly',
  },
  dividerview: {
    height: 2,
    backgroundColor: '#8e8e8e',
    width: '25%',
    opacity: 0.5,
  },
  dividertext: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
  },
  mobileinp: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    borderColor: 'darkgray', // '#8e8e8e',
    marginTop: 20,
    width: '85%',
    alignSelf: 'center',
    color: 'black',
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: THEME_COLOR,
    width: '85%',
    height: 50,
    borderRadius: 10,
    marginTop: responsiveHeight(5),
    justifyContent: 'center', //text/comtents in the given block top-down middle
    alignItems: 'center', //text in the given block left-right middle
    alignSelf: 'center', //moving whole block left-right middle
  },
  loginbtntext: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '100',
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    // borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: THEME_COLOR,
  },
  changelanguagebtn: {
    borderWidth: 1,
    // borderColor:'white',
    padding: 3,
    position: 'absolute',
    top: 50,
    left: 20,
  },
  modelstyle: {
    justifyContent:
      'flex-end' /* Align the item to the bottom of the flex container */,
    margin: 0 /* to extend box sides to is border - to overwrite the default margin*/,
  },
  modalcontainer: {
    paddingTop: 20,
    backgroundColor: 'white',
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
  },
  langicon: {
    // tintColor:'o',
    width: 40,
    height: 40,
  },
  differentLanguages: {
    width: '90%',
    height: 55,
    borderRadius: 10,
    alignSelf: 'center', // to move words from sticking to boundary
    borderWidth: 1,
    marginTop: 10,
  },
  radiobuttonicon: {
    height: 25,
    width: 25,
  },
});
