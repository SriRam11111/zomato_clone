/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useContext } from 'react';
import { Image } from 'moti';
import { CartItems } from '../contextapi/ContextOfCart';


// {/* <Text style={[styles.text]} ><MaterialCommunityIcons name="square-circle" size={22} color="#17e83c" /> BestSeller </Text> */}

const RecommendedFood = ({data}) => {
    // const menu = props.data; props is undefined here since we took the parameters by deconstructing  [props to {data,cart,setCart}]
    const menu = data;
    const [additems,setAdditems] = useState(0);
    const { cart, setCart } = useContext(CartItems);
  return (
      <View style={styles.container}>
              <View style={{ margin: 10}}>
                  <View>
                      {menu.bestSeller && (
                          <View style={{ flexDirection: 'row' }}>
                              <MaterialCommunityIcons name="square-circle" size={22} color="#17e83c" />
                              <Text style={[styles.text, { backgroundColor: '#c1af08', padding: 2, fontSize: 12, borderRadius: 8, marginLeft: 10 }]}>BestSeller</Text>
                          </View>
                      ) ||
                          (<View style={{ flexDirection: 'row' }}>
                              <FontAwesome name="caret-square-o-up" size={22} color="#b3752e" />
                              <Text style={[styles.text, { backgroundColor: '#a5708c', padding: 2, fontSize: 12, borderRadius: 8, marginLeft: 10 }]}> Must Try</Text>
                          </View>)
                      }
                  </View>
                  <Text style={styles.text}>{menu.name}</Text>
                  <Text style={styles.text}>{menu.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                          style={{
                              marginTop: 5,
                              backgroundColor: '#FFFFF0',
                              padding: 3,
                              borderRadius: 4,
                          }}
                      >
                          {[0, 0, 0, 0, 0].map((en, i) => (
                              //en- are values in array
                              //i is index position 0-4
                              <AntDesign
                                  key={`${menu.id}-${i}`}
                                  style={{ margin: 2, marginHorizontal: 0 }}
                                  name={i < Math.floor(menu.star) ? 'star' : 'staro'}
                                  size={13}
                                  color="#FFD700"
                              />
                          ))}
                      </Text>
                  </View>
              <Text style={{ color: '#020024', fontSize: 15, fontWeight: '800' }}>{menu.review} reviews</Text>
              </View>
              <View style={{marginRight:15}}>
              <Image source={{ uri: menu.image }} style={{ width: 150, height: 150, borderRadius: 10 }}/>
              <Pressable
                  style={{
                      position: 'absolute',
                      right: 30,
                      top: 130,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#edbfc3',
                      borderRadius: 5,
                      borderColor:'#ed3646',
                      borderWidth:1,
                  }}
              >
                  <Pressable onPress={() => {
                    setAdditems(Math.max(0,additems - 1));
                    setCart(cart.filter((p)=>p.id !== menu.id));
                    }}>
                  {/*if we give range from 0 to 1 ,everytime on clicking it sets value as 1 because it is maximum  */}
                  {/*if we give range from 0 to -1 ,everytime on clicking it sets value as 0 because it is maximum  */}
                  {/*if we give range from 0 to additems-1 ,everytime on clicking it decreases its additem value by one at last
                  when it is 0 and 1-1 since both values are same it sets the value as 0 further decrease is not possible
                   because 0 is maximum among [-1,-2,...]  */}
                  {/* {console.log('setitems',additems,additems-1)} */}
                      <Text style={{ fontSize: 25, color: '#ed3646', paddingHorizontal: 10 }} >
                          -
                      </Text>
                  </Pressable>

                  <Pressable>
                      <Text style={{ fontSize: 20, color: '#ed3646', paddingHorizontal: 10 }}>
                          {additems}
                      </Text>
                  </Pressable>

                  <Pressable onPress={() =>{
                    setCart([...cart,menu]);
                    setAdditems(additems + 1);}}>
                      <Text style={{ fontSize: 20, color: '#ed3646', paddingHorizontal: 10 }}>
                          +
                      </Text>
                  </Pressable>
              </Pressable>
              </View>
      </View>
  );
};

export default RecommendedFood;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10,
        paddingVertical:20,
        backgroundColor:'#ffff',
    },
    text:{
    color: '#020024',
     fontSize: 15,
      fontWeight: '800',
     },
});

// setCart(cart.filter((p, index) => {
// if (p.id === menu.id && index === cart.findIndex((item) => item.id === menu.id)) {
//     // return true to remove the first matching item only
//     return true;
// }
// // return false to keep all other items with the same ID
// return false;
// }));
