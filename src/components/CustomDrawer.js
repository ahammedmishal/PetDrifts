import React,{useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';


import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Fonts } from '../constants';
import { AuthContext } from '../context/AuthContext';
import { AxiosContext } from '../context/AxiosContext';

const CustomDrawer = props => {
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
        <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0.20)"
        animated
        />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#ffffff'}}>

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => authContext.logout()} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={25} color='#7b7b7b' />
            <Text
              style={{
                fontSize: 15,
                fontFamily: Fonts.POPPINS_SEMI_BOLD,
                marginLeft: 5,
                color:'#7b7b7b'
              }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;