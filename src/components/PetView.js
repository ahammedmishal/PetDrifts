import React from 'react';
import {Image, View, StyleSheet } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimenstions';
import { TextInput } from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Fonts } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PetView = ({source,value, ...rest}) => {
    
    return (
        <TouchableOpacity style={styles.container}>
          <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
            <View style={[styles.iconStyle,{borderColor: value === null ? 'green' : 'red'}]}>
                <Image source={source} style={styles.ButtonLogo}/>
            </View>
          </View>
        </TouchableOpacity>
    );
  };
  
export default PetView;

const styles = StyleSheet.create({

    container: {
      height: windowHeight / 7,
      justifyContent:'center'
    },
    iconStyle: {
      marginRight:15,
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: windowHeight / 8,
      borderRadius:15,
      backgroundColor:'#f3f3f3',
      borderWidth:1
    },
    ButtonLogo: { 
      height: 100,
      width: 100,
      resizeMode: 'contain',
    }
  });
