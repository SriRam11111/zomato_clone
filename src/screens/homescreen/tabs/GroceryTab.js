/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

function GroceryTab() {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [galleryPhoto, setGalleryPhoto] = useState();

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera(options);
        setCameraPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerArea}>
        <TouchableOpacity
          onPress={openCamera}
          style={{backgroundColor: '#0e9ed9', padding: 5, margin: 7}}>
          <Text style={styles.text}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{backgroundColor: '#841584', padding: 5, margin: 7}}>
          <Text style={styles.text}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'purple',
  },
  centerArea: {
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default GroceryTab;
