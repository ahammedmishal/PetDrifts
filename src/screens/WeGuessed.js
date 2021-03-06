import React,{useState,useEffect,useContext} from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FormButton from '../components/FormButton';
import {Colors, Fonts, Images } from '../constants';
import { StatusBarHeight, windowHeight } from '../utils/Dimenstions';
import SwitchSelector from "react-native-switch-selector";
import Ruler from 'react-native-animated-ruler';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';

const WeGuessed = ({route,navigation}) => {
   const {name,age,breed,type} = route.params
   const [switchOne, setSwitchOne] = useState(false)
   const [switchTwo, setSwitchTwo] = useState(false)
   const [rulerHeight, setRulerHeight] = useState('0')
   const [rulerWeight, setRulerWeight] = useState()
   const [height, setHeight] = useState(null)
   const [weight, setWeight] = useState(null)

   const axiosContext = useContext(AxiosContext);
   const authContext = useContext(AuthContext);
   const {publicAxios} = useContext(AxiosContext);
   const {authAxios} = useContext(AxiosContext);
   const [petInfo, setPetInfo] = useState({})
   
    useEffect(() => {
      var h = (convertedCentoFeet())
      setHeight(h.replace(/'/g,"."))
      // console.log("height",height)
      if(switchTwo){
        var w = (convertedLbstoKg())
        setWeight(w)
        // console.log('converted weight',weight);
      }else{
        setWeight(rulerWeight)
        // console.log("weight",rulerWeight);
      }
      // console.log('original weight',weight);
      // console.log(name);
      // console.log(age);
      // console.log(breed);
      // console.log(type);
    },)
    
    const convertedCentoFeet = () => {
      var realFeet = ((rulerHeight * 0.393700) / 12);
      var feet = Math.floor(realFeet);
      var inches = Math.round((realFeet - feet) * 12);
      var ft = feet+"'"+inches;
      var h = feet+"."+inches;
      // console.log(h);
      return ft
    }

    const convertedLbstoKg = () => {
      var value = (rulerWeight / 2.2);
      var lbs = value.toString().slice(0,4)
      // console.log("second weight",lbs);
      return lbs
    }

    const onFormSubmit = async () =>{
      try {
            const response = await axiosContext.authPetAxios.post('/update_profile', {
              name,
              age,
              breed,
              type,
              height,
              weight
            });
            let petInfo = response.data;
            setPetInfo(petInfo);
            // console.log(petInfo);
          } catch (error) {
            Alert.alert('Error',  JSON.stringify(error.response));
            // console.log(error)
          }
          navigation.navigate('SearchingForDevices')
    }

  return (
    <View style={styles.container}>

       <StatusBar
          barStyle="dark-content" 
          backgroundColor={"#fff"}
          translucent
      />
      <TouchableOpacity style={styles.headerContainer}>
        <Ionicons name="close" size={30} onPress={() => navigation.navigate('DrawerHome')} color={'black'} />
      </TouchableOpacity>

            <View style={{flex:1,justifyContent:'space-between',}}>
                <View>
                    <Text style={styles.headerText1}>We Guessed</Text>
                    <Text style={styles.headerText}>Your Height and Weight</Text>
                    <Text style={styles.headerText}>{name}</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.text1}>Height:</Text>
                    <SwitchSelector style={{width:139}}
                      selectedColor={"#fff"}
                      buttonColor={Colors.PRIMARY}
                      backgroundColor={'#f3f3f3'}
                      borderColor={'#f3f3f3'}
                      hasPadding
                      height={40}
                      animationDuration={210}
                      options={[
                          { label: "CM", value: false },
                          { label: "FT", value: true },
                      ]}
                      initial={0}
                      onPress={value => setSwitchOne(value)}
                    />
                </View>

                <View style={styles.containerSlider}>
                  {switchOne !== true ?
                    <View style={styles.sliderOne}> 
                        <Ruler
                        style={{borderBottomWidth:2}}
                        width={350}
                        height={50}
                        vertical={false}
                        minimum={122}
                        maximum={222}
                        segmentWidth={2}
                        segmentSpacing={10}
                        indicatorColor={Colors.VIOLET}
                        indicatorWidth={100}
                        indicatorHeight={20}
                        indicatorBottom={0}
                        onChangeValue={value => setRulerHeight(value)}
                        step={10}
                        stepColor='#333333'
                        stepHeight={20} 
                        normalColor={Colors.BLACK}
                        normalHeight={10} 
                        backgroundColor={Colors.DEFAULT_WHITE}
                        numberFontFamily='System'
                        numberSize={20}
                        numberColor='#888888'
                        unit='cm'
                        unitSize={15}
                        unitBottom={20}
                        unitColor='#888888'
                        unitFontFamily='System'
                      />
                    </View>
                    :
                    <View style={styles.sliderOne}>
                      <Text style={styles.sliderText}>{convertedCentoFeet()} ft</Text>
                      <Ruler
                      style={{borderBottomWidth:2}}
                      width={350}
                      height={50}
                      vertical={false}
                      minimum={122}
                      maximum={222}
                      segmentWidth={2}
                      segmentSpacing={10}
                      indicatorColor={Colors.VIOLET}
                      indicatorWidth={100}
                      indicatorHeight={20}
                      indicatorBottom={0}
                      onChangeValue={value => setRulerHeight(value)}
                      step={10}
                      stepColor='#333333'
                      stepHeight={20} 
                      normalColor={Colors.BLACK}
                      normalHeight={10} 
                      backgroundColor={Colors.DEFAULT_WHITE}
                      numberFontFamily='System'
                      numberSize={20}
                      numberColor={Colors.DEFAULT_WHITE}
                      unit=''
                      unitSize={15}
                      unitBottom={20}
                      unitColor='#888888'
                      unitFontFamily='System'
                    />
                    </View>
                  }
                  <View style={styles.container}>
                </View>
                     
              </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.text1}>Weight:</Text>
                    <SwitchSelector style={{width:139}}
                      selectedColor={"#fff"}
                      buttonColor={Colors.PRIMARY}
                      backgroundColor={'#f3f3f3'}
                      borderColor={'#f3f3f3'}
                      hasPadding
                      height={40}
                      animationDuration={210}
                      options={[
                        { label: "KG", value: false },
                        { label: "LBS", value: true },
                      ]}
                      initial={0}
                      onPress={value => setSwitchTwo(value)}
                    />
                </View>

                <View style={styles.containerSlider}>
                  {switchTwo !== true ?
                    <View style={styles.sliderOne}>
                    <Ruler
                      style={{borderBottomWidth:2}}
                      width={350}
                      height={50}
                      vertical={false}
                      minimum={1}
                      maximum={120}
                      segmentWidth={2}
                      segmentSpacing={10}
                      indicatorColor={Colors.VIOLET}
                      indicatorWidth={100}
                      indicatorHeight={20}
                      indicatorBottom={0}
                      step={10}
                      stepColor='#333333'
                      onChangeValue={value => setRulerWeight(value)}
                      stepHeight={20} 
                      normalColor={Colors.BLACK}
                      normalHeight={10} 
                      backgroundColor={Colors.DEFAULT_WHITE}
                      numberFontFamily='System'
                      numberSize={26}
                      numberColor='#888888'
                      unit='Kg'
                      unitSize={15}
                      unitBottom={20}
                      unitColor='#888888'
                      unitFontFamily='System'
                    />
                    </View>
                    :
                    <View style={styles.sliderOne}>
                       {/* <Text style={styles.sliderText}>({convertedCentoFeet(multiSliderValue[0])}) ft</Text> */}
                       <Ruler
                         style={{borderBottomWidth:2}}
                         width={350}
                         height={50}
                         vertical={false}
                         minimum={2}
                         maximum={120}
                         segmentWidth={2}
                         segmentSpacing={10}
                         indicatorColor={Colors.VIOLET}
                         indicatorWidth={100}
                         indicatorHeight={20}
                         indicatorBottom={0}
                         step={10}
                         stepColor='#333333'
                         onChangeValue={value => setRulerWeight(value)}
                         stepHeight={20} 
                         normalColor={Colors.BLACK}
                         normalHeight={10} 
                         backgroundColor={Colors.DEFAULT_WHITE}
                         numberFontFamily='System'
                         numberSize={26}
                         numberColor='#888888'
                         unit='lbs'
                         unitSize={15}
                         unitBottom={20}
                         unitColor='#888888'
                         unitFontFamily='System'
                       />
                    </View>
                  }
                  <View style={styles.container}>
                </View>
                     
              </View>

              <View>
                    <Text style={styles.noteText}>
                        Note: 
                        <Text style={styles.noteText1}>
                            <Text> </Text>
                            Please feel free to change if you know the exact values.
                        </Text>
                    </Text>
                </View>

                <View>
                  <FormButton
                        buttonTitle="Continue"
                        onPress={()=>onFormSubmit()}
                  />
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
  headerContainer: {
    flexDirection:'row',
    alignItems:'center',
    paddingTop:StatusBarHeight
  },
  headerText1: {
    alignSelf:'center',

    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    // marginBottom: 1,
    color: Colors.BLACK,
  },
  headerText: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    // marginBottom: 1,
    color: Colors.BLACK,
  },
  text1: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: Colors.BLACK,
  },
  switchContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  noteText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: Colors.PRIMARY,
  },
  noteText1:{
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: Colors.BLACK,
  },
  sliderText: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize:20,
    color:'#888888'
  },
  sliderOne:{
    alignItems:'center'
  }
});

export default WeGuessed;