import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity,Image,Button,StatusBar} from 'react-native';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import PetView from '../components/PetView';
import {Fonts, Images } from '../constants';
import { windowHeight } from '../utils/Dimenstions';
import { RadioButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import SwitchSelector from "react-native-switch-selector";
import Ruler from 'react-native-animated-ruler';
import Rule from '../components/Rule';

const PetInformation = () => {

    const [data, setData] = useState([
      { "id":1,value: 'Dog' ,image: Images.DOG },
      { "id":2,value: 'Cat', image: Images.CAT },
      { "id":3,value: 'Wold',image: null },
    ])
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

    const [showNext,setShowNext] = useState(false)

    useEffect(() => {
      console.log(type)
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

    const onclickItem = (item,index) =>{
        const newArrData = data.map((e,index)=>{
            if(item.id == e.id){
                return{
                    ...e,
                    selected:true,
                }
            }
            return{
                ...e,
                selected:false
            }
        })
        setType(item.value)
        setData(newArrData)
    }

     const renderItem = ({item,index})=>{
          return(
            <TouchableOpacity  onPress={()=>onclickItem(item,index)} style={styles.petContainer}>
            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                <View style={[styles.iconStyle,{ borderColor: item.selected ? 'green' : 'lightgrey'}]}>
                    <Image source={item.image} style={styles.ButtonLogo}/>
                </View>
            </View>
            </TouchableOpacity>
          )
      }

  return (
    <View style={styles.container}>
       <StatusBar
          barStyle="dark-content" 
          backgroundColor={"#fff"}
          translucent
      />
          {!showNext && 
          <>
       <Text style={styles.text}>Pet Information</Text>
       <View style={{flex:1,justifyContent:'space-between'}}>
            <View>
                <Text style={styles.text1}>Pet Name:</Text>
                <FormField
                    labelValue={name}
                    onChangeText={(petName) => setName(petName)}
                    iconType="user"
                    // keyboardType="name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
        
                <Text style={styles.text1}>Age:</Text>
                <FormField
                    labelValue={age}
                    onChangeText={(petAge) => setAge(petAge)}
                    iconType="user"
                    // keyboardType="name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {/* Pet Image  */}

                <Text style={styles.text1}>Pet:</Text>

                <FlatList
                    horizontal
                    data={data}
                    renderItem={renderItem}
                    extraData={type}
                    keyExtractor={item=>`key-${item.id}`}
                />

                <Text style={styles.text1}>Breed:</Text>
                <FormField
                    labelValue={breed}
                    onChangeText={(petBreed) => setBreed(petBreed)}
                    iconType="user"
                    // keyboardType="name"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View>
                <FormButton
                    buttonTitle="Continue"
                    onPress={()=>setShowNext(true)}
                />
            </View>
       </View>
    </>
    }
    {showNext ?
        <View style={styles.container}>
            <View style={{flex:1,justifyContent:'space-between',}}>
                <View>
                    <Text style={styles.headerText}>We Guessed</Text>
                    <Text style={styles.headerText}>Your Height and Weight</Text>
                    <Text style={styles.headerText}>{name}</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.text1}>Height:</Text>
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
                  <View style={styles.container}>
                </View>
                     
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
                        onPress={()=>setShowNext(true)}
                    />
                </View>
            </View>
        </View>
        :
            null
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    padding: 15,
  },
  text: {
    alignSelf:'center',
    marginTop:windowHeight/15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 18,
    // marginBottom: 1,
    color: '#2D2D2D',
  },
  headerText: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    // marginBottom: 1,
    color: '#2D2D2D',
  },
  text1: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: '#2D2D2D',
  },
  petContainer: {
    height: windowHeight / 7,
    justifyContent:'center',
  },
  iconStyle: {
    marginRight:15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: windowHeight / 8,
    borderRadius:15,
    backgroundColor:'#f3f3f3',
    borderWidth:1
  },
  ButtonLogo: { 
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  switchContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  noteText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: '#FBA304',
  },
  noteText1:{
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: '#2D2D2D',
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

export default PetInformation;