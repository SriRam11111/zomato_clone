/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, View, Text, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import { CartItems } from '../contextapi/ContextOfCart';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';
import zomato_sound from '../../../audio/assets_zomato.mp3';


const ViewcartCheck = ({ restaurant, total }) => {
    const { cart, setCart, viewcartmodal, setViewCartModal } = useContext(CartItems);
    // console.log('cart====',cart);
    const [contentheight, setContentHeight] = useState(0);

    const navigation = useNavigation();

    //oncontextsizechange in scroll takes function of two parameters ={(width,height)=>{}}
    const onContentSizeChange = (width, height) => {
        setContentHeight(Math.max(270, (height + 200)));
    };
    console.log('contentheight', contentheight);

    let countingUniqueItems = cart.reduce((count, item) => {
        if (!count[item.name]) {
            count[item.name] = { dish: item, count: 1 };
        } else {
            count[item.name].count++;
        }
        return count;
    }, {});

    // console.log('countingUniqueItems before', countingUniqueItems);
    countingUniqueItems = Object.values(countingUniqueItems);
    // console.log('countingUniqueItems after', countingUniqueItems);

    const onPress = () => {
        setViewCartModal(false);
        setCart([]);
        setTimeout(() => {
            playsound.play();
        }, 3000);
        navigation.navigate('orderdata', { data: countingUniqueItems ,restaurant:restaurant});

    };

    const playsound = new Sound(zomato_sound, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('Failed to load sound: ', error);
        } else {
            playsound.setVolume(0.9);
            navigation.navigate('orderdata');
            console.log('making sound');
        }
    });

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            {/* this view backgroundColor makes background page black when we click on cart otherwise it shows its own background color (white in this case)*/}
            <Pressable onPress={() => setViewCartModal(false)}>
                <AntDesign
                    style={{ alignSelf: 'center', padding: 10 }}
                    name="closecircle"
                    size={40}
                    color="black"
                />
            </Pressable>
            <View style={{ height: Math.min(contentheight, 500), backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} >
                <Text style={[styles.text, { fontSize: 25, padding: 10, backgroundColor: '#f5f1f1' }]}>Items added</Text>
                {/* <Text style={{color:'black'}}>hi {cart[0].name}</Text> */}
                <ScrollView onContentSizeChange={onContentSizeChange} height={contentheight} style={{ paddingBottom: 40 }}>
                    {countingUniqueItems.map((item) => (
                        <View key={item.dish.id} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                            <Image source={{ uri: item.dish.image }} style={{ width: 70, aspectRatio: 1, borderRadius: 10 }} />
                            <View style={{ margin: 10 }}>
                                <Text style={[styles.text1]} >{item.dish.name}</Text>
                                <Text style={[styles.text1]} >Each item: {item.dish.price}</Text>
                                <Text style={[styles.text1]}>Quantity: {item.count}</Text>
                            </View>
                            <Text style={[styles.text, { alignSelf: 'center', flex: 1, marginRight: 10, textAlign: 'right' }]}>₹{(Number((item.dish.price).replace('₹', '')) * (item.count))}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 3, alignItems: 'center' }}>
                    <Text style={styles.text1}>TotalItems Price</Text>
                    <Text style={styles.text1}>{total}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 3, alignItems: 'center' }}>
                    <Text style={styles.text1}>Delivery Fee</Text>
                    <Text style={styles.text1}>₹50</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 3, alignItems: 'center' }}>
                    <Text style={styles.text1}>Total Cost</Text>
                    <Text style={styles.text1}>₹{total + 50}</Text>
                </View>
                <View>
                    <Pressable style={{ backgroundColor: '#e65366', height: 50, justifyContent: 'center' }} onPress={onPress}>
                        <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}> Place Order</Text>
                    </Pressable>
                </View>
            </View>

        </View>

    );
};

export default ViewcartCheck;

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 12,
        fontWeight: '800',
    },
    text1: {
        color: 'black',
        fontSize: 14,
        fontWeight: '800',
    },
});


// return (
//     <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//         {/* this view backgroundColor makes background page black when we click on cart otherwise it shows its own background color (white in this case)*/}
//         <Pressable onPress={() => setViewCartModal(false)}>
//             <AntDesign
//                 // key={`${menu.id}-${i}`}
//                 // style={{ margin: 2, marginHorizontal: 0 }}
//                 style={{ alignSelf: 'center', padding: 10 }}
//                 name="closecircle"
//                 size={30}
//                 color="black"
//             />
//         </Pressable>
//         <View style={{ height: 500, backgroundColor: 'white' }}>

//         </View>

//     </View>
// );
//     };
