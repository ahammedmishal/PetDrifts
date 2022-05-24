import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Image } from 'react-native';
import DeviceInfo from '../components/DeviceInfo';
import { Colors, Fonts,Images } from '../constants';
import { StatusBarHeight, windowHeight, windowWidth} from '../utils/Dimenstions';
import {Avatar} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';

const DeviceStatus = ({navigation}) => {

  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [deviceInfo, setDeviceInfo] = useState(0)

  useEffect(() => {
    getDeviceStatus();
  },[])
  
  const getDeviceStatus = async () => { 
    try {
      const response = await axiosContext.authDeviceAxios.get('/get_device')
      let deviceInfo = response.data;
      setDeviceInfo(deviceInfo)
      console.log(deviceInfo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
     <StatusBar
        barStyle="dark-content" 
        backgroundColor="rgba(0, 0, 0, 0.20)"
        translucent
     />

    <View style={styles.headerContainer}>
      <TouchableOpacity style={{padding: 15}} onPress={() => navigation.openDrawer()}>
          <Image source={Images.MENU} style={{width:25,height:20}}/>
      </TouchableOpacity>
      <Text style={styles.headText} >Device Status</Text>
      <TouchableOpacity
        style={{padding: 15}}
        onPress={()=> navigation.navigate('DrawerHome',{screen: 'PetProfile'})}>
        <Avatar.Image
          source={Images.PETAVATAR}
          size={40}
        />
      </TouchableOpacity>
    </View>

      <View style={{flexDirection:'row'}}>
        <DeviceInfo
          title={'Battery'}
          title2={`${deviceInfo.battery}%`}
          source={Images.CHARGING}
        />
        <DeviceInfo
          title={'Network'}
          title2={'Wifi, Secured'}
          source={Images.WIFI}
        />
      </View>

      <View style={{flexDirection:'row'}}>
        <DeviceInfo
          title={'Last Sync'}
          title2={'Mar 27, 2022'}
          source={Images.REFRESH}
        />
        <DeviceInfo
          title={'Firmware'}
          title2={deviceInfo.frimware}
          source={Images.CLOUDDOWNLOAD}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:StatusBarHeight
  },
  headText:{
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 19,
    color: Colors.BLACK,
    alignSelf:'center'
  }
});

export default DeviceStatus;