// import React,{useState,useEffect,useContext} from 'react';
// import { View, Text, StyleSheet,TextInput,TouchableOpacity,Image,Button} from 'react-native';
// import FormButton from '../components/FormButton';
// import FormField from '../components/FormField';
// import PetView from '../components/PetView';
// import {Fonts, Images } from '../constants';
// import { windowHeight } from '../utils/Dimenstions';
// import { RadioButton } from 'react-native-paper';
// import { FlatList } from 'react-native-gesture-handler';
// import SwitchSelector from "react-native-switch-selector";
// import {AuthContext} from '../context/AuthContext';
// import * as Keychain from 'react-native-keychain';
// import {AxiosContext} from '../context/AxiosContext';

// const PetInformation = () => {
    
//     const axiosContext = useContext(AxiosContext);
//     const {authAxios} = useContext(AxiosContext);
//     const [petInfo, setPetInfo] = useState({});
//     const [name, setName] = useState(null);
//     const [age, setAge] = useState(null);
//     const [breed, setBreed] = useState(null);
//     const [type, setType] = useState(null)
    
//     const [data, setData] = useState([
//       { "id":1,value: 'Dog' ,image: Images.DOG },
//       { "id":2,value: 'Cat', image: Images.CAT },
//       { "id":3,value: 'Wold',image: null },
//     ])

//     const [showNext,setShowNext] = useState(false)

//     const options1 = [
//         { label: "CM", value: "CM" },
//         { label: "FT", value: "FT" },
//       ];

//     const options2 = [
//         { label: "KG", value: "KG" },
//         { label: "LBS", value: "LBS" },
//       ];

//     useEffect(() => {
//         const getPet = async () => {
//             try {
//               const response = await axiosContext.authPetAxios.get('/get_profile')
//               let petInfo = response.data
//               console.log(response.data);
//               setPetInfo(petInfo)
//               console.log(petInfo);
//             } catch (error) {
//             //   setStatus('error');
//               console.log(error)
//             }
//           }
//           getPet();
//         console.log(type);
//     },)
    

//     const onclickItem = (item,index) =>{
//         const newArrData = data.map((e,index)=>{
//             if(item.id == e.id){
//                 return{
//                     ...e,
//                     selected:true,
//                 }
//             }
//             return{
//                 ...e,
//                 selected:false
//             }
//         })
//         setType(item.value)
//         setData(newArrData)
//     }

//      const renderItem = ({item,index})=>{
//           return(
//             <TouchableOpacity  onPress={()=>onclickItem(item,index)} style={styles.petContainer}>
//             <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
//                 <View style={[styles.iconStyle,{ borderColor: item.selected ? 'green' : 'lightgrey'}]}>
//                     <Image source={item.image} style={styles.ButtonLogo}/>
//                 </View>
//             </View>
//             </TouchableOpacity>
//           )
//       }

//   return (
//     <View style={styles.container}>
//           {!showNext && 
//           <>
//        <Text style={styles.text}>Pet Information</Text>
//        <View style={{flex:1,justifyContent:'space-between'}}>
//             <View>
//                 <Text style={styles.text1}>Pet Name:</Text>
//                 <FormField
//                     labelValue={name}
//                     onChangeText={(petName) => setName(petName)}
//                     iconType="user"
//                     // keyboardType="name"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                 />
        
//                 <Text style={styles.text1}>Age:</Text>
//                 <FormField
//                     labelValue={age}
//                     onChangeText={(petAge) => setName(petAge)}
//                     iconType="user"
//                     // keyboardType="name"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                 />
//                 {/* Pet Image  */}

//                 <Text style={styles.text1}>Pet:</Text>

//                 <FlatList
//                     horizontal
//                     data={data}
//                     renderItem={renderItem}
//                     extraData={type}
//                     keyExtractor={item=>`key-${item.id}`}
//                 />

//                 <Text style={styles.text1}>Breed:</Text>
//                 <FormField
//                     labelValue={breed}
//                     onChangeText={(petBreed) => setName(petBreed)}
//                     iconType="user"
//                     // keyboardType="name"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                 />
//             </View>

//             <View>
//                 <FormButton
//                     buttonTitle="Continue"
//                     onPress={()=>setShowNext(true)}
//                 />
//             </View>
//        </View>
//     </>
//     }

//     {showNext ?
//         <View style={styles.container}>
//             <View style={{flex:1,justifyContent:'space-between',}}>
//                 <View>
//                     <Text style={styles.headerText}>We Guessed</Text>
//                     <Text style={styles.headerText}>Your Height and Weight</Text>
//                     <Text style={styles.headerText}>{petInfo.name}</Text>
//                 </View>
//                 <View style={styles.switchContainer}>
//                     <Text style={styles.text1}>Height:</Text>
//                     <SwitchSelector style={{width:139}}
//                       selectedColor={"#fff"}
//                       buttonColor={'#FBA304'}
//                       backgroundColor={'#f3f3f3'}
//                       borderColor={'#f3f3f3'}
//                       hasPadding
//                       height={40}
//                       animationDuration={210}
//                       options={options1}
//                       initial={0}
//                       onPress={value => console.log(`Call onPress with value: ${value}`)}
//                     />
//                 </View>
//                 <View style={styles.switchContainer}>
//                     <Text style={styles.text1}>Weight:</Text>
//                     <SwitchSelector style={{width:139,fontFamily:Fonts.POPPINS_MEDIUM}}
//                       selectedColor={"#fff"}
//                       buttonColor={'#FBA304'}
//                       backgroundColor={'#f3f3f3'}
//                       borderColor={'#f3f3f3'}
//                       hasPadding
//                       height={40}
//                       animationDuration={210}
//                       options={options2}
//                       initial={0}
//                       onPress={value => console.log(`Call onPress with value: ${value}`)}
//                     />
//                 </View>
//                 <View>
//                     <Text style={styles.noteText}>
//                         Note: 
//                         <Text style={styles.noteText1}>
//                             <Text> </Text>
//                             Please feel free to change if you know the exact values.
//                         </Text>
//                     </Text>
//                 </View>

//                 <View>
//                     <FormButton
//                         buttonTitle="Continue"
//                         onPress={()=>setShowNext(true)}
//                     />
//                 </View>
//             </View>
//         </View>
//         :
//             null
//     }


//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#ffffff',
//     padding: 15,
//   },
//   text: {
//     alignSelf:'center',
//     marginTop:windowHeight/15,
//     fontFamily: Fonts.POPPINS_SEMI_BOLD,
//     fontSize: 18,
//     // marginBottom: 1,
//     color: '#2D2D2D',
//   },
//   headerText: {
//     alignSelf:'center',
//     fontFamily: Fonts.POPPINS_MEDIUM,
//     fontSize: 18,
//     // marginBottom: 1,
//     color: '#2D2D2D',
//   },
//   text1: {
//     fontFamily: Fonts.POPPINS_MEDIUM,
//     fontSize: 14,
//     color: '#2D2D2D',
//   },
//   petContainer: {
//     height: windowHeight / 7,
//     justifyContent:'center',
//   },
//   iconStyle: {
//     marginRight:15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 100,
//     height: windowHeight / 8,
//     borderRadius:15,
//     backgroundColor:'#f3f3f3',
//     borderWidth:1
//   },
//   ButtonLogo: { 
//     height: 100,
//     width: 100,
//     resizeMode: 'contain',
//   },
//   switchContainer: {
//     flexDirection:'row',
//     justifyContent:'space-between',
//     alignItems:'center'
//   },
//   noteText: {
//     fontFamily: Fonts.POPPINS_MEDIUM,
//     fontSize: 14,
//     color: '#FBA304',
//   },
//   noteText1:{
//     fontFamily: Fonts.POPPINS_REGULAR,
//     fontSize: 14,
//     color: '#2D2D2D',
 
//   }
// });

// export default PetInformation;