import React from 'react';
import {View, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimenstions';
import { TextInput } from 'react-native-paper';
import { Colors, Fonts } from '../constants';


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
                placeholderTextColor={Colors.BLACK}
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
