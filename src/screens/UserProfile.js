import React,{useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormField from '../components/FormField';
import { Fonts, Images } from '../constants';


const UserProfile = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [country, setCountry] = useState(null);
    const [province, setProvince] = useState(null);
  return (
    <View style={styles.container}>

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
        labelValue={name}
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="abc@gmail.com"
     />
      <Text style={styles.text1}>Password:</Text>
      <FormField
        labelValue={name}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Password"
     />
      <Text style={styles.text1}>Country:</Text>
      <FormField
        labelValue={name}
        onChangeText={(country) => setCountry(country)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderText="Country"
     />
      <Text style={styles.text1}>Province:</Text>
      <FormField
        labelValue={name}
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
    backgroundColor:'#ffffff',
    padding: 20,
  },
  text1: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: '#2D2D2D',
  },
  userInfoSection: {
    alignItems:'center',
  },
});

export default UserProfile;