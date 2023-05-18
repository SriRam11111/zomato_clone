/* eslint-disable prettier/prettier */
// import {StyleSheet, Text, View} from 'react-native';
import React ,{createContext,useState} from 'react';

const CartItems = createContext();

const ContextOfCart = ({children}) => {
    const [cart , setCart] = useState([]);
  const [viewcartmodal, setViewCartModal] = useState(false);
    // console.log('children',children);
    // children is <AppNavigator />
  return (
    <CartItems.Provider value={{ cart, setCart, viewcartmodal, setViewCartModal }}>
      {children}
    </CartItems.Provider>
  );
};

export { ContextOfCart , CartItems};

// const styles = StyleSheet.create({});
