import React,{useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../constants';
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
        contentContainerStyle={{backgroundColor: Colors.DEFAULT_WHITE}}>

        <View style={{flex: 1, backgroundColor: Colors.DEFAULT_WHITE, paddingTop: 10}}>
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