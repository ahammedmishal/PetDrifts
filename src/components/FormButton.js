import React,{useState} from 'react';
import {Text,TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import { Fonts } from '../constants';
import {windowHeight, windowWidth} from '../utils/Dimenstions';


const FormButton = ({buttonTitle,disabled,backgroundColor,color,isLoading, ...rest}) => {
  return (
    <TouchableOpacity disabled={isLoading} style={[styles.buttonContainer,{backgroundColor: backgroundColor ? backgroundColor : isLoading ? '#F3F3F3' : '#FBA304'}]} {...rest}>
      {
        isLoading ?
         <ActivityIndicator size="small" color="#565656" />
        :
        <Text style={[styles.buttonText,{color: color ? color : '#ffffff'}]}>{buttonTitle}</Text>
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
        backgroundColor:'#FBA304',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
      },
      buttonText: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
});

export default FormButton;