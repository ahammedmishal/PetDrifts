import React,{useState,useEffect,useContext} from 'react';
import { View, Text, StyleSheet,StatusBar,Alert,Button} from 'react-native';
import { Avatar } from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import { Colors, Fonts, Images } from '../constants';
import { windowHeight } from '../utils/Dimenstions';
import SwitchSelector from "react-native-switch-selector";
import Ruler from 'react-native-animated-ruler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBarHeight } from '../utils/Dimenstions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import ToggleSwitch from "toggle-switch-react-native";

const PetProfile = ({navigation}) => {
    const axiosContext = useContext(AxiosContext);
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [breed, setBreed] = useState(null);
    const [type, setType] = useState(null)
    const [switchOne, setSwitchOne] = useState(false)
    const [switchTwo, setSwitchTwo] = useState(false)
    const [rulerHeight, setRulerHeight] = useState('0')
    const [rulerWeight, setRulerWeight] = useState()
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [petInfo, setPetInfo] = useState({})
    const [displayHeight, setdisplayHeight] = useState()
    const [displayWeight, setdisplayWeight] = useState()
    const [editHW, setEditHW] = useState(false)
    
    useEffect(() => {
        var h = (convertedCentoFeet())
        setHeight(h.replace(/'/g,"."))
        console.log("height",height)
        if(switchTwo){
          var w = (convertedLbstoKg())
          setWeight(w)
          console.log('converted weight',weight);
        }else{
          setWeight(rulerWeight)
          console.log("weight",rulerWeight);
        }
        console.log('original weight',weight);
        console.log(name);
        console.log(age);
        console.log(breed); 
        console.log(type);
        console.log(rulerHeight);
        console.log(rulerWeight);
        console.log(height);
        console.log(weight);
      },)

    useEffect(() => {
      onGetProfile()
    }, [onGetProfile])
    
    const onToggle = (isOn) =>{
      setEditHW(isOn)
    }

    const convertedCentoFeet = () => { 
        var realFeet = ((rulerHeight * 0.393700) / 12);
        var feet = Math.floor(realFeet);
        var inches = Math.round((realFeet - feet) * 12);
        var ft = feet+"'"+inches;
        var h = feet+"."+inches;
        console.log(h);
        return ft
    }
  
    const convertedLbstoKg = () => {
        var value = (rulerWeight / 2.2);
        var lbs = value.toString().slice(0,4)
        console.log("second weight",lbs);
        return lbs
    }

    const onFormSubmit = async () =>{
      try {
            const response = await axiosContext.authPetAxios.post('/update_profile', {
              name,
              age,
              breed,
              height,
              weight
            });
            let petInfo = response.data;
            setPetInfo(petInfo);
            console.log(petInfo);
            } catch (error) {
            Alert.alert('Error',  JSON.stringify(error.response));
            console.log(error)
          }
    }
  
  const onGetProfile = async () =>{
    try {
      const response = await axiosContext.authPetAxios.get('/get_profile')
      console.log(response.data);
      setName(response.data.name)
      setAge(response.data.age)
      setBreed(response.data.breed)
      setdisplayHeight(response.data.height)
      setdisplayWeight(response.data.weight)
      console.log("he",height);
    } catch (error) {
      // setStatus('error');
      console.log(error)
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color={Colors.BLACK} />
        </TouchableOpacity>
        <Text style={styles.headText} >User Profile</Text>
        <TouchableOpacity onPress={()=>onFormSubmit()}>
          <Text style={styles.helpText} >Save</Text>
        </TouchableOpacity>
      </View>

    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Avatar.Image 
         source={Images.PETAVATAR}
         size={130}
       />
      </View>

      </View>
      <Text style={styles.text}>Pet Name:</Text>
      <FormField
        labelValue={name}
        onChangeText={(Petname) => setName(Petname)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Enter name here..."
     />
      <Text style={styles.text}>Age:</Text>
      <FormField
        labelValue={age}
        onChangeText={(PetAge) => setAge(PetAge)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="02 Years"
     />
      <Text style={styles.text}>Breed:</Text>
      <FormField
        labelValue={breed}
        onChangeText={(PetBreed) => setBreed(PetBreed)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Persian Cat"
     />

     {/* <TouchableOpacity style={{width:40,height:20,backgroundColor:'green',borderRadius:15,alignItems:'center',alignSelf:'flex-end'}}>
       <Text style={{color:'#ffffff'}}>Edit</Text>
     </TouchableOpacity> */}
<View style={{alignSelf:'flex-end'}}>
     <ToggleSwitch
      label="Edit Height and Weight"
      labelStyle={{ color: "black", fontFamily:Fonts.POPPINS_REGULAR }}
        isOn={editHW}
        onColor={Colors.PRIMARY}
        offColor='#ecf0f1'
        size="small"
        onToggle={onToggle}
        animationSpeed={0}
     />
</View>

     {editHW ? 
     <>
     <View style={styles.switchContainer}>
        <Text style={styles.text}>Height:</Text>
        <SwitchSelector style={{width:139}}
            selectedColor={"#fff"}
            buttonColor={Colors.PRIMARY}
            backgroundColor={Colors.LIGHT_GREY5}
            borderColor={Colors.LIGHT_GREY5}
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
                indicatorColor='#4552CB'
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
                indicatorColor='#4552CB'
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
     </View>

     <View style={styles.switchContainer}>
            <Text style={styles.text1}>Weight:</Text>
            <SwitchSelector style={{width:139}}
            selectedColor={"#fff"}
            buttonColor={'#FBA304'}
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
                      indicatorColor='#4552CB'
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
                       <Ruler
                         style={{borderBottomWidth:2}}
                         width={350}
                         height={50}
                         vertical={false}
                         minimum={2}
                         maximum={120}
                         segmentWidth={2}
                         segmentSpacing={10}
                         indicatorColor='#4552CB'
                         indicatorWidth={100}
                         indicatorHeight={20}
                         indicatorBottom={0}
                         step={10}
                         stepColor='#333333'
                         onChangeValue={value => setRulerWeight(value)}
                         stepHeight={20} 
                         normalColor={Colors.BLACK} 
                         normalHeight={10} 
                         backgroundColor='#FFFFFF'
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
     </View>
     </>
     :
     <View style={{justifyContent:'space-between',flex:1,}}>
      <Text style={styles.text1}>Height : {displayHeight}</Text>
      <Text style={styles.text1}>Weight : {displayWeight}</Text>
     </View>
    }


    <FormButton
        buttonTitle="Submit"
        onPress={()=> onFormSubmit()}
    />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 20,
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
  text: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 13,
    color: Colors.BLACK,
  },
  userInfoSection: {
    alignItems:'center',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  sliderText: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize:15,
    color:'#888888',
    alignSelf:'center'
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
  },
  headText:{
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    color: Colors.BLACK,
    alignSelf:'center',
    marginTop:10
  }
});

export default PetProfile;