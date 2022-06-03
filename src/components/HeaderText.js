import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderText = () => {
  return (
    <View style={styles.container}>
      <Text>We Guessed</Text>
      <Text>Your Height and Weight</Text>
      <Text>Pet Name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HeaderText;