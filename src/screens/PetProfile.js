import React,{useState,useEffect,useContext} from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import { Avatar } from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import { Fonts, Images } from '../constants';
import { windowHeight } from '../utils/Dimenstions';
import SwitchSelector from "react-native-switch-selector";
import Ruler from 'react-native-animated-ruler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBarHeight } from '../utils/Dimenstions';

const PetProfile = ({navigation}) => {
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [breed, setBreed] = useState(null);
    const [type, setType] = useState(null)
    const [switchOne, setSwitchOne] = useState(false)
    const [switchTwo, setSwitchTwo] = useState(false)
    const [rulerHeight, setRulerHeight] = useState()
    const [rulerWeight, setRulerWeight] = useState()
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    
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
      },)

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
        var lbs = (rulerWeight / 2.2);
        console.log("second weight",lbs);
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
            console.log(petInfo);
          } catch (error) {
            Alert.alert('Error',  JSON.stringify(error.response));
            console.log(error)
          }
    }
  
      
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="close" size={30} onPress={() => navigation.goBack()} color={'black'} />
        <Text style={styles.helpText} >Save</Text>
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
        labelValue={name}
        onChangeText={(PetAge) => setAge(PetAge)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="02 Years"
     />
      <Text style={styles.text}>Breed:</Text>
      <FormField
        labelValue={name}
        onChangeText={(PetBreed) => setBreed(PetBreed)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Persian Cat"
     />
     
     <View style={styles.switchContainer}>
        <Text style={styles.text}>Height:</Text>
        <SwitchSelector style={{width:139}}
            selectedColor={"#fff"}
            buttonColor={'#FBA304'}
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
                indicatorColor='#4552CB'
                indicatorWidth={100}
                indicatorHeight={20}
                indicatorBottom={0}
                onChangeValue={value => setRulerHeight(value)}
                step={10}
                stepColor='#333333'
                stepHeight={20} //big theri heieght
                normalColor='#2D2D2D' //thari color
                normalHeight={10} //thari height
                backgroundColor='#FFFFFF'
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
                stepHeight={20} //big theri heieght
                normalColor='#2D2D2D' //thari color
                normalHeight={10} //thari height
                backgroundColor='#FFFFFF'
                numberFontFamily='System'
                numberSize={20}
                numberColor='#ffff'
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
                      stepHeight={20} //big theri heieght
                      normalColor='#2D2D2D' //thari color
                      normalHeight={10} //thari height
                      backgroundColor='#FFFFFF'
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
                         indicatorColor='#4552CB'
                         indicatorWidth={100}
                         indicatorHeight={20}
                         indicatorBottom={0}
                         step={10}
                         stepColor='#333333'
                         onChangeValue={value => setRulerWeight(value)}
                         stepHeight={20} //big theri heieght
                         normalColor='#2D2D2D' //thari color
                         normalHeight={10} //thari height
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

    <FormButton
        buttonTitle="Submit"
        onPress={()=> onLogin()}
    />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'#ffffff',
    padding: 20,
  },
  text1: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: '#2D2D2D',
  },
  switchContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  text: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 13,
    color: '#2D2D2D',
  },
  userInfoSection: {
    alignItems:'center',
    backgroundColor:'#ffffff',
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

export default PetProfile;