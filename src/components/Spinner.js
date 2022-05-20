import React from 'react';
import {ActivityIndicator, StyleSheet, View,StatusBar} from 'react-native';
import { Colors } from '../constants';

const Spinner = () => (
  <View style={styles.container}>
    <StatusBar
      barStyle="dark-content" 
      backgroundColor={"#fff"}
      translucent
    />
    <ActivityIndicator size="large" color={ Colors.PRIMARY } />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
