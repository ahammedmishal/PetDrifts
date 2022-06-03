import React from 'react';
import {Image, View, TextInput, StyleSheet } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimenstions';
import { Colors, Fonts } from '../constants';

const FormInput = ({labelValue, placeholderText, iconType,source, ...rest}) => {
    const [borderColor, setBorderColor] = React.useState();
    return (
        <View style={styles.container}>

          <View style={styles.iconStyle}>
            <Image source={source} style={styles.ButtonLogo}/>
          </View>

          <View style={styles.inputContainer}>
              <TextInput
                value={labelValue}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="#666"
                {...rest}
                selectionColor={Colors.PRIMARY}
                onBlur={console.log('focus lost')}
                onFocus={console.log('focused')}
                style={[styles.input,{borderColor}]}
              />
          </View>

        </View>
    );
  };
  
export default FormInput;

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center'
    },
    inputContainer: {
      marginLeft:10,  
      marginBottom: 10,
      width: '85%',
      height: windowHeight / 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconStyle: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.2,
      width: 50,
      height: windowHeight / 15,
      borderRadius:15,
      borderColor:'#2D2D2D',
    },
    input: {
      paddingLeft: 10,
      paddingBottom:8,
      flex: 1,
      fontSize: 14,
      borderWidth: 1.2,
      borderRadius: 15,
      color: '#333',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: Fonts.POPPINS_REGULAR,
    },
    ButtonLogo: { 
      height: 20,
      width: 20,
      resizeMode: 'contain',
    }
  });
