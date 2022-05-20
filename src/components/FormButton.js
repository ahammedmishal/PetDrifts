import React,{useState} from 'react';
import {Text,TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import { Fonts,Colors } from '../constants';
import {windowHeight, windowWidth} from '../utils/Dimenstions';


const FormButton = ({buttonTitle,disabled,backgroundColor,color,isLoading, ...rest}) => {
  return (
    <TouchableOpacity disabled={isLoading} style={[styles.buttonContainer,{backgroundColor: backgroundColor ? backgroundColor : isLoading ? '#F3F3F3' : Colors.PRIMARY}]} {...rest}>
      {
        isLoading ?
         <ActivityIndicator size="small" color={Colors.DARK_GREY} />
        :
        <Text style={[styles.buttonText,{color: color ? color : Colors.DEFAULT_WHITE}]}>{buttonTitle}</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        marginBottom:20,
        width: '100%',
        height: windowHeight /15,
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
      },
      buttonText: {
        fontSize: 16,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
});

export default FormButton;