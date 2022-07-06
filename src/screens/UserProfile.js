import React,{useState,useEffect,useContext} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import { Colors, Fonts, Images } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBarHeight } from '../utils/Dimenstions';
import { AxiosContext } from '../context/AxiosContext';
import Toast from 'react-native-simple-toast';

const UserProfile = ({navigation}) => {

  useEffect(() => {
    onGetProfile()
  }, [onGetProfile])
  

  const onFormSubmit = async () =>{
    try {
      const response = await axiosContext.authAxios.post('/update_user_profile', {
          name,
          country,
          province
        });
        // console.log(response.data);
        Toast.show("Saved Succesfully.")
        } catch (error) {
        Alert.alert('Error',  JSON.stringify(error.response));
        // console.log(error)
        Toast.show("Network error.")
      }
  }

  const onGetProfile = async () =>{
    try {
      const response = await axiosContext.authAxios.get('/get_user_profile')
      // console.log(response.data);
      setName(response.data.name)
      // setEmail(response.data.email)
      setCountry(response.data.country)
      setProvince(response.data.province)
    } catch (error) {
      // setStatus('error');
      // console.log(error)
    }
  }
    
    const axiosContext = useContext(AxiosContext);
    const [name, setName] = useState(null);

    const [country, setCountry] = useState(null);
    const [province, setProvince] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="close" size={30} onPress={() => navigation.goBack()} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.headText} >User Profile</Text>
        <TouchableOpacity onPress={()=> onFormSubmit()}>
          <Text style={styles.helpText} >Save</Text>
        </TouchableOpacity>
      </View>

    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Avatar.Image 
         source={Images.USERAVATAR}
         size={130}
       />
      </View>

      </View>
      <Text style={styles.text1}>Full Name:</Text>
      <FormField
        labelValue={name}
        onChangeText={(name) => setName(name)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Name"
     />
      <Text style={styles.text1}>Country:</Text>
      <FormField
        labelValue={country}
        onChangeText={(country) => setCountry(country)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Country"
     />
      <Text style={styles.text1}>Province:</Text>
      <FormField
        labelValue={province}
        onChangeText={(province) => setProvince(province)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Province"
     />
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
    justifyContent:'space-between',
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 20,
  },
  text1: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: Colors.BLACK,
  },
  userInfoSection: {
    alignItems:'center',
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
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 18,
    color: Colors.BLACK,
    alignSelf:'center',
    marginTop:10
  }
});

export default UserProfile;