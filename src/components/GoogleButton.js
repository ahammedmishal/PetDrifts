import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {windowHeight} from '../utils/Dimenstions';

const GoogleButton = ({
    buttonTitle,
    color,
    backgroundColor,
    source,
    ...rest
  }) => {
    let bgColor = backgroundColor;
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, {backgroundColor: bgColor}]}
        {...rest}>
        <View style={styles.iconWrapper}>
          <Image source={source} style={styles.googleButtonLogo}/>
        </View>
      </TouchableOpacity>
    );
  };

  export default GoogleButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop:20,
    marginBottom:windowHeight /15,
    width: '30%',
    height: windowHeight / 18,
    padding: 10,
    flexDirection: 'row',
    justifyContent:'center',
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'lightgrey'
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonLogo:{
    height: 25,
    width: 25,
  }
});