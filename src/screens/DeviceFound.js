import React from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Button } from 'react-native';
import { Colors, Fonts,Images } from '../constants';
import { StatusBarHeight, windowHeight, windowWidth} from '../utils/Dimenstions';
import Icon from "react-native-vector-icons/Feather";
import FormButton from '../components/FormButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {WifiWizard, HotspotWizard} from 'react-native-wifi-and-hotspot-wizard';

const DeviceFound = ({navigation}) => {

  return (
    <View style={styles.container}>
      <StatusBar
          barStyle="dark-content" 
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="close" size={30} onPress={() => navigation.navigate('DrawerHome')} color={Colors.BLACK} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.helpText} >Help</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex:1,justifyContent:'space-between',alignItems:'center'}}>
        <View>
            <View style={styles.titileContainer}>
                <Text style={styles.headerText1}>1 Device Found</Text>
                <Text style={styles.headerText2}>Select your device to Pair</Text>
            </View>

            <View style={styles.deviceConatiner}>
                <View>
                    <Text style={styles.title} >Pet Device ABCD</Text>
                    <Text style={styles.title1}>Device</Text>
                </View>
                <View>
                    <Icon name='check-circle' size={25} color={Colors.PRIMARY}/>
                </View>
            </View>
        </View>
        
        <FormButton
            buttonTitle="Select"
            onPress={()=>navigation.navigate('SyncingDevice')}
        />
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
  titileContainer: {
    marginBottom:  windowHeight / 23,
  },
  headerText1: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    color: Colors.BLACK,
  },
  headerText2: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 15,
    color: Colors.DARK_GREY
  },
  title: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 16,
    color: Colors.BLACK,
  },
  title1: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 13,
    color: Colors.DARK_GREY,
  },
  deviceConatiner: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:15,
    borderColor: Colors.PRIMARY,
    borderWidth:2,
    width: windowWidth / 1.1,
    height: windowHeight / 9,
    paddingHorizontal:30
  },
  headerContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:StatusBarHeight
  },
  helpText:{
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.PRIMARY,
  }
});

export default DeviceFound;