import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,StatusBar,Alert} from 'react-native';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import {Colors, Fonts, Images } from '../constants';
import { StatusBarHeight, windowHeight } from '../utils/Dimenstions';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'

const PetInformation = ({navigation}) => {

    const [data, setData] = useState([
      { "id":1,value: 'Dog' ,image: Images.DOG },
      { "id":2,value: 'Cat', image: Images.CAT },
    ])
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [breed, setBreed] = useState(null);
    const [type, setType] = useState(null)
    
    useEffect(() => {
    },)
    
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
                <View style={[styles.iconStyle,{ borderColor: item.selected ? Colors.VIOLET : 'lightgrey'}]}>
                    <Image source={item.image} style={styles.ButtonLogo}/>
                </View>
            </View>
            </TouchableOpacity>
          )
    }

    const continueButton = () =>{
      if(!name || !age || !breed || !type){
        Alert.alert("please fill all the fields")
        return
      }else{
        navigation.navigate('WeGuessed',{
          name:name,age:age,breed:breed,type:type
        })
      }
    }

  return (
    <View style={styles.container}>
       <StatusBar
          barStyle="dark-content" 
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent
      />
     <TouchableOpacity style={styles.headerContainer}>
        <Ionicons name="close" size={30} onPress={() => navigation.navigate('DrawerHome')} color={'black'} />
     </TouchableOpacity>

      <Text style={styles.headerText1}>Pet Information</Text>
    
       <View style={{flex:1,justifyContent:'space-between'}}>
            <View>
                <Text style={styles.text1}>Pet Name:</Text>
                <FormField
                    labelValue={name}
                    onChangeText={(petName) => setName(petName)}
                    iconType="user"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
        
                <Text style={styles.text1}>Age:</Text>
                <FormField
                    labelValue={age}
                    onChangeText={(petAge) => setAge(petAge)}
                    iconType="user"
                    keyboardType="numeric"
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
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View>
                <FormButton
                    buttonTitle="Continue"
                    onPress={()=>continueButton()}
                />
            </View>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.DEFAULT_WHITE,
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
    color: Colors.BLACK,
  },
  text: {
    alignSelf:'center',
    marginTop:windowHeight/15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 18,
    fontSize: 18,
  },
  text1: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: Colors.BLACK,
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
    borderWidth:2
  },
  ButtonLogo: { 
    height: 100,
    width: 100,
    resizeMode: 'contain',
  }
});

export default PetInformation;