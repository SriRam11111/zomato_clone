/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
// import CountDown from 'react-native-countdown-component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const OrderData = () => {
  const route = useRoute();
  // const countingUniqueItems = route.params.data;
  const restaurant = route.params.restaurant;
  const time = moment().format('LT');
  console.log('countingUniqueItems', restaurant);
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    })
      // .stop();
      .start(() => console.log('Animation finished'));
  };
  useEffect(() => {
    handleLikeAnimation();
    // const animation = Animated.timing(progress, {
    //   toValue: 1,
    //   duration: 2000,
    //   useNativeDriver: true,
    // });

    // animation.start();

    // setTimeout(() => {
    //   animation.stop();
    //   console.log('animation stopped');
    // }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Ionicons
          name="chevron-back"
          size={35}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{backgroundColor: '#fcb045', padding: 10}}>
        <Text style={styles.text1}>
          {restaurant.name} has accepted your order at {time}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#0ce93b',
          width: responsiveWidth(45),
          padding: 5,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <MaterialCommunityIcons
          name="clock-time-eight-outline"
          size={20}
          color="#ecfaef"
        />
        <Text style={styles.text}>Delivery in 30 min</Text>
      </View>
      <View style={{padding: 20}}>
        {/* <CountDown
          // size={20}
          // until={1800}
          // //60 = 1 min
          // showSeparator
          // timeToShow={['M', 'S']}
          // timeLabels={{ m: 'min', s: 'sec' }}
          // onPress={() => { Alert.alert('Wait Food Is On The Way'); setIsCounting(!isCounting); }}
          // onFinish={() => { Alert.alert('Enjoy Your Food');
          //   setTimeout(() => {
          //     navigation.goBack();
          // }, 3000);
          //    }}
          // running={isCounting}
          until={10}
          onFinish={() => Alert('finished')}
          onPress={() => Alert('hello')}
          size={20}
        /> */}
      </View>
      <View style={styles.overlay}>
        <LottieView
          style={{width: 200}}
          progress={progress}
          source={require('../../../images/lottie/lottie-sucess.json')}
          autoPlay
          loop={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderData;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '800',
  },
  text1: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    marginTop: 200,
    alignItems: 'center',
  },
});

// useEffect(() => {
// }, [isCounting]);
// useEffect(() => {
//   fetch('http://192.168.0.138:3001/homescreenData')
//     .then((resp) => resp.json())
//     .then((json) => console.log('json =:',json))
//     .catch((error) => console.error(error));
//     console.log('fetch');
// }, []);

//    const homePageData = async () => {
//     try {
//       const response = await fetch('http://192.168.0.138:3001/homescreenData', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       console.log('data',data)
//       return data;
//     } catch (error) {
//       console.error(error);
//       return error;
//     }
//   };
// homePageData();
