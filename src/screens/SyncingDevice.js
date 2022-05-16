import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,StatusBar,Image,Button,Modal} from 'react-native';
import DeviceInfo from '../components/DeviceInfo';
import { Fonts,Images } from '../constants';
import { windowHeight, windowWidth} from '../utils/Dimenstions';
import Icon from "react-native-vector-icons/Feather";
import FormButton from '../components/FormButton';

const SyncingDevice = ({navigation}) => {

  useEffect(() => {
    Model()
  }, [])
  
  const Model = () =>{
    setTimeout(function(){
      toggleModal()
    },4000)
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
     <StatusBar 
        barStyle="dark-content"
        backgroundColor={"#fff"}
        translucent 
     />
     <Modal animationType="slide" transparent={true} visible={isModalVisible}>
          <View style={{flex:1,justifyContent: "center", alignItems: "center" }}>
            <View style={styles.modalViewContainer} >
              <Text style={styles.modalText}>Syncing Complete</Text> 
              <Text style={styles.modalText2}>Device Status:
                <Text style={{color:'#FBA304'}}> Ok</Text>
              </Text> 
              <FormButton
                buttonTitle={'Start Tracking'}
                onPress={toggleModal} 
              /> 
            </View> 
          </View>
     </Modal>

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
        onPress={()=>navigation.navigate('DashBoardScreen')}
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
    justifyContent:'space-between',
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
  modalText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 19,
    color: '#2D2D2D',
  },
  modalText2: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: '#565656',
  },
  modalViewContainer: {
    borderRadius:15,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    width:windowWidth/1.1,
    height:windowHeight/4,
    padding:15,
    paddingTop:40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default SyncingDevice;