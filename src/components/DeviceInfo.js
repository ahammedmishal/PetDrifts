import React from 'react';
import { View, Text, StyleSheet,Image} from 'react-native';
import { Colors, Fonts,Images } from '../constants';
import { windowHeight, windowWidth} from '../utils/Dimenstions';

const DeviceInfo = ({title,title2,source}) => {
  return (
    <View style={styles.container}>
      <View style={styles.DeviceContainer}>
        <View style={styles.InfoConatiner}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.dot}>...</Text>
        </View>
        <View style={styles.InfoConatiner}>
          <Text style={styles.text1}>{title2}</Text>
          <Image source={source} style={styles.ButtonLogo}/>
        </View>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.DEFAULT_WHITE,
      padding: 15,
    },
    ButtonLogo: { 
      height: 43,
      width: 43,
      resizeMode: 'contain',
    },
    text:{
      fontFamily:Fonts.POPPINS_MEDIUM,
      fontSize:16,
      color: Colors.BLACK
    },
    text1:{
      fontFamily:Fonts.POPPINS_REGULAR,
      fontSize:13,
      color:'#707070',
      marginTop:15
    },
    dot: {
      fontFamily:Fonts.POPPINS_MEDIUM,
      fontSize:18,
      color: Colors.BLACK,
      marginBottom:8
    },
    DeviceContainer: {
      width:windowWidth / 2.3,
      height:windowHeight / 7,
      borderRadius:10,
      backgroundColor: Colors.LIGHT_GREY2,
      justifyContent:'space-between',
      padding:10
    },
    InfoConatiner: {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:"center"
    }
  });
  

export default DeviceInfo;