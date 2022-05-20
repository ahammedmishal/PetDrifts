import React,{useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import { Colors, Fonts, Images } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBarHeight } from '../utils/Dimenstions';

const UserProfile = ({navigation}) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [country, setCountry] = useState(null);
    const [province, setProvince] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="close" size={30} onPress={() => navigation.goBack()} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity>
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
      <Text style={styles.text1}>Email:</Text>
      <FormField
        labelValue={email}
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="abc@gmail.com"
     />
      <Text style={styles.text1}>Password:</Text>
      <FormField
        labelValue={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Password"
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
          onPress={()=> onLogin()}
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
  }
});

export default UserProfile;