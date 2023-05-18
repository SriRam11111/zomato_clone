/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Image} from 'moti';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import hotelsdata from '../data/hotelsdata';
import DisplayHotels from '../data/DisplayHotels';
import Geocoder from 'react-native-geocoder-reborn';
import Geolocation from 'react-native-geolocation-service';

const DeliveryTab = () => {
  const filter = [
    {
      id: 1,
      name: 'fastest delivery',
    },
    {
      id: 2,
      name: 'rating 4.0+',
    },
    {
      id: 3,
      name: 'offers',
    },
    {
      id: 4,
      name: 'new arrivals',
    },
    {
      id: 5,
      name: 'cuisines',
    },
  ];

  const horizontalScreenViewFoodItems = [
    {
      dish_name: 'chicken',
      featured_image: 'https://i.ibb.co/pfgJz7k/chicken.jpg',
    },
    {
      dish_name: 'idly',
      featured_image: 'https://i.ibb.co/t82LLz0/idly.jpg',
    },
    {
      dish_name: 'dosa',
      featured_image: 'https://i.ibb.co/SxGN5cP/dosa.jpg',
    },
    {
      dish_name: 'Fish',
      featured_image: 'https://i.ibb.co/BgWCM3y/fish.jpg',
    },
    {
      dish_name: 'Rice',
      featured_image: 'https://i.ibb.co/8dPKppr/rice.jpg',
    },
    {
      dish_name: 'Icecream',
      featured_image: 'https://i.ibb.co/pbrvHxf/icecream.jpg',
    },
    {
      dish_name: 'Cake',
      featured_image: 'https://i.ibb.co/7bQyysH/cake.jpg',
    },
  ];
  const [showSearch, setShowSearch] = useState(false);
  const [response, setResponse] = useState('');
  useEffect(() => {
    requestLocationPermission(); //for location access permission
    Geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        // console.log('Longitude: ' + longitude);
        // console.log('Latitude: ' + latitude);
        // using Geocoder from here to
        var NY = {
          lat: latitude,
          lng: longitude,
        };
        Geocoder.geocodePosition(NY)
          .then(res => {
            // res is an Array of geocoding object (see below)
            setResponse(res[0]);
          }) //here
          .catch(err => console.log(err));
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar translucent={true} backgroundColor={'#200639'} />
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../images/location.png')}
                  style={styles.location}
                />
                <View style={{flexDirection: 'column', marginTop: 10}}>
                  <Text style={styles.state}>Office</Text>

                  <Text style={styles.city}>
                    {response.subLocality} , {response.locality}
                  </Text>
                  {/* <Text style={styles.city}></Text> */}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.headerRight}>
              <View>
                <Icon
                  name="search"
                  size={30}
                  color="#FF047D"
                  style={{marginTop: 10}}
                  onPress={() => setShowSearch(!showSearch)}
                />
              </View>
              <View>
                <AntDesign
                  name="profile"
                  size={30}
                  color="#FF047D"
                  style={{marginTop: 7, borderRadius: 5}}
                />
              </View>
            </View>
          </View>
          <View>
            {showSearch && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search menu"
                placeholderTextColor="red"
              />
            )}
          </View>
        </View>
        <View style={{marginTop: !showSearch ? 4 : 50, height: 55}}>
          <FlatList
            data={filter}
            horizontal={true}
            renderItem={({item}) => (
              <Pressable style={{margin: 10}}>
                <Text
                  style={{
                    color: '#fff',
                    borderRadius: 10,
                    backgroundColor: '#d96565',
                    padding: 5,
                    fontWeight: 900,
                  }}>
                  {item.name}
                </Text>
              </Pressable>
            )}
          />
        </View>
        <ScrollView>
          <View style={styles.banner}>
            <Image
              source={require('../../../images/secondscreentop.png')}
              style={{alignSelf: 'center', height: 170}}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                height: responsiveHeight(4),
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: 10,
              }}>
              Eat what makes you happy
            </Text>
          </View>
          <View style={styles.horizontalscrool}>
            {/* <ScrollView horizontal={true}> */}
            <FlatList
              data={horizontalScreenViewFoodItems}
              horizontal={true}
              renderItem={({item}) => (
                <>
                  <View style={{alignItems: 'center', paddingHorizontal: 5}}>
                    <Image
                      source={{uri: item.featured_image}}
                      style={styles.img}
                    />
                    <Text style={{color: 'black'}}>{item.dish_name}</Text>
                  </View>
                </>
              )}
            />
            {/* </ScrollView> */}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                height: 25,
                fontSize: 18,
                paddingHorizontal: 10,
                fontWeight: 'bold',
              }}>
              127 restaurants around you
            </Text>
            <FontAwesome
              name="sort"
              size={22}
              style={{marginTop: 5, paddingHorizontal: 10}}
              color="#FF047D"
            />
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                height: 25,
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              popular
            </Text>
          </View>
          <View
            style={{
              color: 'black',
              fontSize: 20,
              paddingHorizontal: 10,
              marginTop: 25,
              fontWeight: 'bold',
            }}>
            {hotelsdata.map(item => (
              <DisplayHotels restaurant={item} key={item.name} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryTab;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  header: {
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    backgroundColor: '#fff', //white
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'space-between',
    width: responsiveWidth(20),
  },
  headerLeft: {
    flexDirection: 'row',
  },
  location: {
    height: responsiveHeight(5),
    width: responsiveWidth(8),
    marginTop: 10,
    marginLeft: 10,
  },
  state: {
    color: '#200639',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginLeft: 10,
  },
  city: {
    color: '#200639',
    marginLeft: 10,
  },
  banner: {
    height: responsiveHeight(22),
    width: responsiveWidth(100),
    justifyContent: 'center',
  },
  horizontalscrool: {
    marginTop: 40,
    height: responsiveHeight(14),
    borderRadius: 7,
    alignItems: 'center',
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: 60,
    backgroundColor: '#aed3e3',
    marginRight: 10,
    borderWidth: 5,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    borderColor: 'red',
    color: 'black',
    borderWidth: 2,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
