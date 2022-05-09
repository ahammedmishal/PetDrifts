import React from 'react';
import {Text,TouchableOpacity, StyleSheet } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimenstions';


const FormButton = ({buttonTitle,disabled, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        marginBottom:20,
        width: '100%',
        height: windowHeight /15,
        backgroundColor: '#FBA304',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        // fontFamily: 'Lato-Regular',
      },
});

export default FormButton;