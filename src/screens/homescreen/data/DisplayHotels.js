/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { Pressable , View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'moti';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
// import { Pressable } from 'react-native/Libraries/Components/Pressable/Pressable';

// const DisplayHotels = ({ restaurant }) => { // added destructured prop here
const DisplayHotels = props => {
    const restaurant = props.restaurant;
    const navigation = useNavigation();
    //   console.log(restaurant);
    return (
        <Pressable onPress={() => console.warn('button needed to long pressed')}
            onLongPress={() => navigation.navigate('eachhoteldetails',{data:restaurant})}
            delayLongPress={100}
            >
        <View style={{ backgroundColor: '#fff', borderRadius: 15, margin: 10,paddingBottom:10 }}>
            <Image
                style={{
                    height: responsiveHeight(30),
                    width: '100%',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}
                source={{ uri: restaurant.featured_image }}
            />
            <View style={styles.hoteldetails}>
                <View>
                    <Text style={{ color: '#020024', fontSize: 15, fontWeight: 'bold' }}>
                        {restaurant.name}
                    </Text>
                    <Text style={{ color: '#84b488' }}>{restaurant.cuisines}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10,alignContent:'center' }}>
                        <View style={{ backgroundColor: '#86b7f1', width: 20, height: 20, borderRadius: 40, justifyContent:'center',alignItems:'center' }}>
                        <AntDesign name="doubleright" size={15} color="black" />
                        </View>
                        <Text style={{ paddingHorizontal: 10, color: '#020024', fontSize: 13, fontWeight: '800' }}>
                        {restaurant.no_of_Delivery} + orders placed here
                        </Text>
                    </View>
                </View>
                <View style={styles.ratingdetails}>
                    <Text style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}>{restaurant.aggregate_rating}</Text>
                    <AntDesign name="star" size={15} color="#fff" />
                </View>
            </View>
            {/* <View style={{backgroundColor:'blue',marginHorizontal:15,padding:5,borderRadius:50,flexDirection:'row'}}>
                <MaterialCommunityIcons name="brightness-percent" size={15} color="black" />
                <Text>up to {restaurant.offer}</Text>
            </View> */}
            <LinearGradient
                colors={['#1E90FF','#87CEFA']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                style={{ marginHorizontal: 15, padding: 10, borderRadius: 20, alignItems: 'center' }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="brightness-percent" size={20} color="white" />
                    <Text style={{ color: 'white', marginLeft: 5, fontSize: 15 }}>Up to {restaurant.offer}% </Text>
                </View>
            </LinearGradient>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop:5 }}>
            <View style={{flexDirection:'row', alignItems:'center'}} >
                    <Entypo name="stopwatch" size={25} color="#3ac762" />
                <Text style={{ color: '#020024', fontSize: 13, fontWeight: '800' }}  >    {restaurant.time} - 2 km</Text>
            </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#020024', fontSize: 13, fontWeight: '800' }}>{restaurant.cost}</Text>
            </View>
            </View>
            </View>
        </Pressable>
            );
};

            export default DisplayHotels;

            const styles = StyleSheet.create({
                container: {
                flex: 1,
  },
            hoteldetails: {
                padding: 10,
            flexDirection:'row',
            alignContent: 'center',
            justifyContent:'space-between',
  },
            ratingdetails: {
                backgroundColor: '#0bd615',
            borderRadius: 10,
            paddingHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center',
            height: responsiveHeight(4),
            width:responsiveWidth(15),
            justifyContent:'space-evenly',
     },
});
