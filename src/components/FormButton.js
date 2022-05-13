import React from 'react';
import {Text,TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts } from '../constants';
import {windowHeight, windowWidth} from '../utils/Dimenstions';


const FormButton = ({buttonTitle,disabled,backgroundColor,color, ...rest}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer,{backgroundColor: backgroundColor ? backgroundColor : '#FBA304'}]} {...rest}>
        <Text style={[styles.buttonText,{color: color ? color : '#ffffff'}]}>{buttonTitle}</Text>
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