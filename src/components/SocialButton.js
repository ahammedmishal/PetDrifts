import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimenstions';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: bgColor}]}
      {...rest}>
      <View style={styles.iconWrapper}>
        <FontAwesome name={btnType} style={styles.icon} size={21} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop:20,
    marginBottom:windowHeight /15,
    width: '30%',
    height: windowHeight / 18,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 3,
    justifyContent:'center',
    borderRadius:10
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});