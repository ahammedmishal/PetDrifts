import React from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import DeviceInfo from '../components/DeviceInfo';
import { Fonts,Images } from '../constants';
import { StatusBarHeight, windowHeight, windowWidth} from '../utils/Dimenstions';
import Icon from "react-native-vector-icons/Feather";
import FormButton from '../components/FormButton';
import Ionicons from 'react-native-vector-icons/Ionicons'


const DeviceFound = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
          barStyle="dark-content" 
          backgroundColor={"#fff"}
          translucent
      />
      <View style={styles.headerContainer}>
          <Ionicons name="close" size={30} onPress={() => navigation.navigate('DashBoardScreen')} color={'black'} />
          <Text style={styles.helpText} >Help</Text>
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
                    <Icon name='check-circle' size={25} color="#FBA304"/>
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
    backgroundColor:'#ffffff',
    padding: 15,
    
  },
  titileContainer: {
    marginBottom:  windowHeight / 23,
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
  title: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 16,
    color: '#2D2D2D',
  },
  title1: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 13,
    color: '#565656',
  },
  deviceConatiner: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:15,
    borderColor:'#FBA304',
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
    color:'#FBA304',
  }
});

export default DeviceFound;