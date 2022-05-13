import React from 'react';
import { View, Text, StyleSheet,StatusBar,Image } from 'react-native';
import DeviceInfo from '../components/DeviceInfo';
import { Fonts,Images } from '../constants';
import { windowHeight, windowWidth} from '../utils/Dimenstions';
import Icon from "react-native-vector-icons/Feather";
import FormButton from '../components/FormButton';

const SyncingDevice = () => {
  return (
    <View style={styles.container}>
     <StatusBar
        barStyle="dark-content" 
        backgroundColor={"#fff"}
        translucent
     />
     <View style={{flex:1,justifyContent:'space-between',alignItems:'center',paddingBottom:20}}>
        <View style={styles.titileContainer}>
            <Text style={styles.headerText1}>Syncing with Device</Text>
            <Text style={styles.headerText2}>Please wait, I'll take a couple seconds</Text>
        </View>
        
        <View style={styles.logoConatiner}>
            <Image style={styles.Logo} source={Images.Logo}/>
        </View>
        <View style={styles.refreshContainer}>
            <Image style={styles.refreshLogo} source={Images.REFRESHICON}/>
        </View>
     </View>

    <FormButton
        buttonTitle="Syncing Data"
        onPress={()=>console.log('clicked')}
        backgroundColor="#f3f3f3"
        color={'#2D2D2D'}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    padding: 15,
    alignItems:'center',
    justifyContent:'space-between'
  },
  headerText1: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    color: '#2D2D2D',
  },
  headerText2: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 15,
    color:'#565656'
  },
  logoConatiner: {
   alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#faf6ee',
    borderRadius: 180,
    width:windowWidth / 2,
    height:windowHeight / 3.9,
  },
  refreshContainer: {
    alignItems:'center'
  },
  Logo: { 
    width: windowWidth / 2.2,
    height: windowHeight / 3.8,
    resizeMode: 'contain',
  },
  refreshLogo: { 
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
});

export default SyncingDevice;