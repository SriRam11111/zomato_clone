/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, {  useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import RecommendedFood from './RecommendedFood';
import RecommendedFoodData from './RecommendedFoodData';
import ViewCart from '../cart/ViewCart';



const EachHotelDetails = () => {
  const route = useRoute();
  const restaurant = route.params.data;
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(-1);


  const handlePressIn = (index) => {
    setIsPressed(index);
  };

  const handlePressOut = () => {
    setIsPressed(-1);
  };
  const filter = [
    {
      name: 'pure veg',
    },
    {
      name: 'rating 4.0+',
    },
    {
      name: 'offers',
    },
    {
      name: 'offers',
    },
  ];
  // console.log('each hotel details cart', cart,setCart);
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{color: '#020024', fontSize: 30, fontWeight: '800'}}>*/}
        <View style={{
          padding:10,
          flexDirection:'row',
          justifyContent:'space-between',

        }}
        >
          <Ionicons name="chevron-back" size={30} color="#020024" onPress={() => navigation.goBack()} />
          <View style={{
            flexDirection:'row',width:responsiveWidth(30),justifyContent:'space-evenly'}}>
            <FontAwesome name="share" size={30} color="#020024"/>
            <Ionicons name="heart-outline" size={30} color="#020024" />
            <Ionicons name="restaurant-outline" size={30} color="#020024" />
          </View>
        </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding:5, backgroundColor:'#fff',borderRadius:20,marginHorizontal:5}}>
          <View >
          <Text style={{ color: '#020024', fontSize: 20, fontWeight: 'bold' }}>{restaurant.name}</Text>
          <Text style={{ fontSize: 15, color:'#39ac5e' }}>{restaurant.cuisines}</Text>
          <Text style={{ color: '#020024', fontSize: 15, fontWeight: '800' }}>{restaurant.smalladress}</Text>
          <View style={{flexDirection:'row',alignItems:'center',padding:4}}>
            <Entypo name="stopwatch" size={25} color="#3ac762" />
            <Text style={{ color: '#020024', fontSize: 13, fontWeight: '800' }}  >    {restaurant.time} | 5 km away</Text>
          </View>
          </View>
          <View >
          <View style={{flexDirection:'row' ,backgroundColor:'green',paddingHorizontal:10,paddingTop:10,borderTopLeftRadius:20,borderTopRightRadius:20,justifyContent:'space-between'}}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>
              {restaurant.aggregate_rating}
            </Text>
            <AntDesign name="star" size={22} color="#fff" />
          </View>
          <View style={{ backgroundColor: '#FFFDD0', paddingHorizontal: 10, paddingBottom: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 ,alignItems:'center' }}>
            <Text style={{ color: '#020024', fontSize: 12, fontWeight: 'bold' }}>{restaurant.no_of_Delivery}</Text>
            <Text style={{ color: '#020024', fontSize: 10, fontWeight: 'bold' }}>deliveries</Text>
          </View>
          </View>
        </View>
        <View>
        <FlatList data={filter}
        horizontal={true}
        renderItem={({ item ,index}) => (
          <Pressable style={{ margin: 10, borderWidth: 0.5, borderColor: 'black', borderRadius: 10, backgroundColor: index === isPressed ? '#efa5ac' : 'white'}}
            onPressIn={()=>handlePressIn(index)}
            onPressOut={handlePressOut}>
            <Text style={{ color: 'black', borderRadius: 10, padding: 5, fontWeight: 900 }} >{item.name}</Text>
          </Pressable>
        )} />
        </View>
        <View style={{margin:10}}>
          <Text style={styles.text}>Recommended</Text>
          <Text style={{borderColor:'red',borderWidth:2,height:2,width:responsiveWidth(29)}}/>
        </View>
        <ScrollView>
        {RecommendedFoodData.map((item,index) => <RecommendedFood key={index} data={item} />)}
        </ScrollView>
      <ViewCart restaurant={restaurant}/>
      </SafeAreaView>
  );
};

export default EachHotelDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{ color: '#020024', fontSize: 15, fontWeight: '800' },
});
