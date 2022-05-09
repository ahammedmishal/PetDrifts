import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const CustomMarker = () => {
  return (
    <Image
    style={styles.image}
    source={require('../Assets/Images/slideBtn.png')}
    resizeMode="contain"
  />
  );
};

const styles = StyleSheet.create({
    image:{
        width:30, height:30
    }
});

export default CustomMarker;