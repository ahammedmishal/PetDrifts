import React from 'react';
import {Image, View, StyleSheet } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimenstions';
import { TextInput } from 'react-native-paper';
import { Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons'
import { PasswordVisible } from './PasswordVisible';

const FormInput = ({labelValue, placeholderText, iconType,source,right,error, ...rest}) => {

    
    return (
        <View style={styles.container}>

          <View style={{flexDirection:'row',flex:1,justifyContent:'center'}}>
            <View style={styles.iconStyle}>
                <Image source={source} style={styles.ButtonLogo}/>
            </View>
            <TextInput
                theme={{roundness:15,fonts:{regular:''}}}
                value={labelValue}
                mode='outlined'
                outlineColor={Colors.BLACK}
                fontFamily={Fonts.POPPINS_REGULAR}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor={Colors.BLACK}
                {...rest}
                style={styles.input}
                activeOutlineColor={Colors.PRIMARY}
                right={right}
                error={error ? error : null}
            />
          </View>
      </View>
    );
  };
  
export default FormInput;

const styles = StyleSheet.create({

    container: {
      height: windowHeight / 11,
    },
    iconStyle: {
      padding: 10,
      marginTop:6,
      marginRight:10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.2,
      width: 50,
      height: windowHeight / 14,
      borderRadius:15,
      borderColor: Colors.BLACK,
    },
    input: {
      marginBottom:8,
      flex:1,
      fontSize:15,
      backgroundColor: Colors.DEFAULT_WHITE
    },
    ButtonLogo: { 
      height: 20,
      width: 20,
      resizeMode: 'contain',
    }
  });
