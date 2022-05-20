import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,StatusBar,Image,Modal,TouchableOpacity} from 'react-native';
import { Fonts,Images,Colors} from '../constants';
import { StatusBarHeight, windowHeight, windowWidth} from '../utils/Dimenstions';
import Ionicons from 'react-native-vector-icons/Ionicons'
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
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent 
     />
    <TouchableOpacity style={styles.headerContainer}>
          <Ionicons name="close" size={30} onPress={() => navigation.navigate('DrawerHome')} color={Colors.BLACK} />
    </TouchableOpacity>
    <View style={{flex:1,justifyContent:'space-between',alignItems:'center'}}>

     <Modal animationType="slide" transparent={true} visible={isModalVisible}>
          <View style={{flex:1,justifyContent: "center", alignItems: "center" }}>
            <View style={styles.modalViewContainer} >
              <Text style={styles.modalText}>Syncing Complete</Text> 
              <Text style={styles.modalText2}>Device Status:
                <Text style={{color:Colors.PRIMARY}}> Ok</Text>
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
        onPress={()=>navigation.navigate('DrawerHome')}
        backgroundColor="#f3f3f3"
        color={Colors.BLACK}
    />
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.DEFAULT_WHITE,
    padding: 15,
    justifyContent:'space-between',
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
    color: Colors.DARK_GREY,
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
    color: Colors.BLACK,
  },
  modalText2: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: Colors.DARK_GREY,
  },
  modalViewContainer: {
    borderRadius:15,
    backgroundColor: Colors.DEFAULT_WHITE,
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
  },
  headerContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:StatusBarHeight
  },
});

export default SyncingDevice;