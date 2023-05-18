/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Image} from 'moti';
import {THEME_COLOR} from '../../strings';
import DeliveryTab from './tabs/DeliveryTab';
import DiningTab from './tabs/DiningTab';
import GroceryTab from './tabs/GroceryTab';

const HomeScreen = () => {
  const [selectedtab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
    <View style={{color:'black'}}>
      {selectedtab === 0 ? (<DeliveryTab />) : selectedtab === 1 ? (<DiningTab/>) : (<GroceryTab/>) }
      </View>
      <View style={styles.bottomnavigation}>
        <TouchableOpacity onPress={()=>{setSelectedTab(0);}}
          style={[
            styles.tab,
              // { backgroundColor: selectedtab === 0 ? THEME_COLOR : '#e4fbf2'},
            //   {borderTopColor: selectedtab == 0 ? THEME_COLOR : '#e4fbf2' },
          ]}>
          <Image
            source={selectedtab === 0 ? require('../../images/delivery.png') : require('../../images/delivery_not.png') }
            style={styles.tabicon}
          />
          <Text style={{ 'color': '#200639' }}>delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setSelectedTab(1); }}
          style={[
            styles.tab,
              // { backgroundColor: selectedtab == 1 ? THEME_COLOR : '#e4fbf2'},
            // { tintColor: selectedtab === 1 ? THEME_COLOR : '#e4fbf2' }
          ]}>
          <Image
            source={selectedtab === 1 ? require('../../images/dining.png') : require('../../images/not_dining.png') }
            style={styles.tabicon}
          />
          <Text style={{'color': '#200639'}}>dining</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setSelectedTab(2); }}
          style={[
            styles.tab,
          ]}>
          <Image
            source={selectedtab === 2 ? require('../../images/grocery.png') : require('../../images/grocery_not.png')}
            style={styles.tabicon}
                      />
          <Text style={{ 'color': '#200639' }}>grocery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomnavigation: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    bottom: 0, //to move the view block to bottom
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#e4fbf2',
  },
  tab: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    // marginBottom: 10,
    // borderTopWidth:3,
    //   flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  tabicon: {
    padding:10,
    // backgroundColor:'green',
    width: responsiveWidth(11),
    height: responsiveHeight(6),
    // aspectRatio:16 / 9,
    resizeMode:'contain',
  },
});
