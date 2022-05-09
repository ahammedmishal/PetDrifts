import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimenstions';
import { TextInput } from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Fonts } from '../constants';


const FormField = ({labelValue, placeholderText, iconType,source, ...rest}) => {
    const [borderColor, setBorderColor] = React.useState();
    
    return (
        <View style={styles.container}>

          <View style={{flexDirection:'row',flex:1,justifyContent:'center'}}>
        
            <TextInput
                theme={{borderWidth:0,roundness:15,fonts:{regular:''}}}
                value={labelValue}
                mode='outlined'
                outlineColor='#F3F3F3'
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
  
export default FormField;

const styles = StyleSheet.create({

    container: {
      height: windowHeight / 11,
    },
    input: {
      marginBottom:8,
      flex:1,
      fontSize:15,
      backgroundColor:'#F3F3F3',
      borderWidth:0
    },
    ButtonLogo: { 
      height: 20,
      width: 20,
      resizeMode: 'contain',
    }
  });
