import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Button,Permission,PermissionsAndroid,ScrollView,} from 'react-native';
import { Colors, Fonts,Images } from '../constants';
import { StatusBarHeight, windowHeight, windowWidth} from '../utils/Dimenstions';
import Icon from "react-native-vector-icons/Feather";
import FormButton from '../components/FormButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
import NearbyDevices from '../components/NearbyDevices';
import ToggleSwitch from "toggle-switch-react-native";
import WifiManager from 'react-native-wifi-reborn';
import Modal from 'react-native-modal';

const DeviceFound = ({navigation}) => {

  let [nearbyNetworksList,setNearbyNetworks] = useState([]);
  let [GetNearbyNetworksModalState,showGetNearbyNetworksModal] = useState(false);
  const [wifiState, setWifiState] = useState(false)

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "React Native Wifi Reborn App Permission",
          message:
            "Location permission is required to connect with or scan for Wifi networks. ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function getNearbyNetworks(){
    showGetNearbyNetworksModal(true);
  }

  const wifiOn = async () =>{
    WifiManager.setEnabled(true); //set WiFi ON
  }
  const wifiOff = async () =>{
    WifiManager.setEnabled(false); //set WiFi OFF
  }

  const onToggle = (isOn) =>{
    setWifiState(isOn)
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

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
            onPress={()=>{getNearbyNetworks()}}
        />
        {/* <FormButton
            buttonTitle="Select"
            onPress={()=>navigation.navigate('SyncingDevice')}
        /> */}

    <Modal isVisible={GetNearbyNetworksModalState} style={{justifyContent: 'flex-end',margin: 0}}>
     <View style={{height:windowHeight/2 ,backgroundColor:'#fff',padding:15,borderTopLeftRadius:30,borderTopRightRadius:30,paddingHorizontal:25}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
              <Text style={styles.text}>Wifi</Text> 
              <Text style={styles.text1}>Toggle Wifi on or off</Text> 
            </View>
            <ToggleSwitch
                isOn={wifiState}
                onColor="#4552cb"
                offColor='#ecf0f1'
                size="medium"
                onToggle={onToggle}
                animationSpeed={0}
            />
          </View>
          <View style={{flex:1,justifyContent:'space-between'}}>
            {wifiState ? <NearbyDevices wifiState={wifiState}/> : <View/>}
            <View>
              
            <View>
                <Text style={styles.noteText}>
                  Note: 
                  <Text style={styles.noteText1}>
                    <Text> </Text>
                    Skipping this will only connect your phone 
                    to device when its near to the device.
                    </Text>
                  </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:15}}> 
            <TouchableOpacity onPress={()=>{showGetNearbyNetworksModal(false)}}>
              <Text style={styles.text3}>Skip</Text>
            </TouchableOpacity>
              <FormButton onPress={()=>navigation.navigate('SyncingDevice')}
                buttonTitle="Connect"
              /> 
            </View>
            </View>
          </View>     
      </View>
    </Modal>

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
  noteText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: Colors.PRIMARY,
  },
  noteText1:{
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: '#565656',
  },
  text:{
    fontSize:20,
    marginBottom:2,
    fontFamily:Fonts.POPPINS_SEMI_BOLD,
    color:'#494949'
  },
  text1:{
    fontSize:15,
    fontFamily:Fonts.POPPINS_REGULAR,
    marginBottom:2,
    color:'#565656'
  },
  text2:{
    fontSize:16,
    fontWeight:'bold',
    marginBottom:2,
  },
  text3:{
    fontSize:16,
    fontWeight:'bold',
    marginBottom:2,
    paddingRight:10,
    paddingBottom:10,
    color:'#494949'
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