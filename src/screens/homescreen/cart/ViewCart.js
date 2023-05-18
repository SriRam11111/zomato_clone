/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, Text, View, Modal, Alert } from 'react-native';
import React, { useContext } from 'react';
import { CartItems } from '../contextapi/ContextOfCart';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import ViewcartCheck from './ViewcartCheck';


// we use the reduce() method to iterate over each element in the array and add them up, starting with an initial value of { }.
// initially returnvalue is 0  after it store value of previous return value
const ViewCart = ({ restaurant }) => {
  const { cart, setCart, viewcartmodal, setViewCartModal } = useContext(CartItems);
  const total = cart.map((item, index) => Number((item.price).replace('₹', ''))).reduce((returnvalue, currentvalue) => returnvalue + currentvalue, 0);
  // total=sum(total)
  // console.log('cart', '====', cart, '====',setCart, '====', total)

  return (
    <>
      <Modal
        animationType="slide"
        visible={viewcartmodal}
        transparent={true}
        onCloseRequest={() => {
          Alert.alert('Model has been closed');
          setViewCartModal(!viewcartmodal);
        }}
      >
        <ViewcartCheck total={total} restaurant={restaurant} />
      </Modal>
      <View style={styles.container}>
        {total === 0 ? (null) :
          (
            <Pressable onPress={() => setViewCartModal(true)} style={styles.cart}>
              <Text style={styles.text}>cart</Text>
            </Pressable>
          )}
      </View>
    </>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#FFFAFA',
    fontSize: 25,
    fontWeight: '800',
  },
  cart: {
    backgroundColor: '#fd5c63',
    width: responsiveWidth(90),
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
});

