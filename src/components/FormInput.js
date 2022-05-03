import React from 'react';
import {Image, View, StyleSheet } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimenstions';
import { TextInput } from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Fonts } from '../constants';

const FormInput = ({labelValue, placeholderText, iconType,source, ...rest}) => {
    const [borderColor, setBorderColor] = React.useState();
    
    return (
        <View style={styles.container}>

          <View style={{flexDirection:'row',flex:1,justifyContent:'center'}}>
            <View style={styles.iconStyle}>
                {/* <AntDesign name={iconType} size={23} color="#666" /> */}
                <Image source={source} style={styles.ButtonLogo}/>
            </View>

            <TextInput
                theme={{roundness:15,fonts:{regular:''}}}
                value={labelValue}
                mode='outlined'
                outlineColor='black'
                fontFamily={Fonts.POPPINS_REGULAR}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="#2D2D2D"
                {...rest}
                style={styles.input}
                activeOutlineColor='#FBA304'
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
      borderColor:'#2D2D2D',
    },
    input: {
      marginBottom:8,
      flex:1,
      fontSize:15,
      backgroundColor:'#fff',
    },
    ButtonLogo: { 
      height: 20,
      width: 20,
      resizeMode: 'contain',
    }
  });
