import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import {AxiosContext} from '../context/AxiosContext'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Colors, Fonts, Images } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Separator from '../components/Separator';
import CheckBox from '../components/CheckBox';
import { AuthContext } from '../context/AuthContext';
import { TextInput } from 'react-native-paper';

const Signup = ({navigation}) => {

  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  function onClearCredentials() {
    setEmail(null),
    setPassword(null),
    setCountry(null),
    setName(null),
    setIsLoading(false)
  }

  const onRegister = async () => {
    setIsLoading(!isLoading);
    try {
        const response = await publicAxios.post('/register', {
        name,
        email,
        password,
        country,
        });
        await navigation.navigate('Login')
        onClearCredentials()
      } catch (error) {
        Alert.alert('Registraion Failed', JSON.stringify(error.response.data.user));
        onClearCredentials()
      }
    };

  return (
    <View style={styles.container}>
        <StatusBar
          barStyle="dark-content" 
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent
        />
      <View style={styles.headerContainer}>
        <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} color={'black'} />
      </View>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
      <Separator height={StatusBar.currentHeight} />
      <Text style={styles.text}>Welcome to Pet Drifts!</Text>
      <Text style={styles.text1}>Please create an account to continue</Text>

      <FormInput
        labelValue={name}
        onChangeText={(userName) => setName(userName)}
        placeholderText="Full Name"
        iconType="user"
        source={Images.USER}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email Address"
        iconType="email"
        source={Images.EMAIL}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={country}
        onChangeText={(userCountry) => setCountry(userCountry)}
        placeholderText="Country"
        iconType="email"
        source={Images.MARKER}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        autoCapitalize="none"
        source={Images.UNLOCK}
        iconType="lock"
        secureTextEntry={true}
        right={<TextInput.Icon color={Colors.INACTIVE_GREY} name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
      />

      <View style={styles.termsButton} onPress={() => {}}>
        <CheckBox
            onPress={() => setTerms(!terms)}
            title="By Clicking this I agree to"
            isChecked={terms}
        />
      </View>

      <FormButton
        buttonTitle="Login"
        onPress={() => onRegister()}
        isLoading={isLoading}
      />
      
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText1}>Already have an account?</Text>
        <Text style={styles.navButtonText2}>LOGIN!</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor:Colors.DEFAULT_WHITE,
    padding: 10,
  },
  headerContainer: {
    flexDirection:'row',
    alignItems:'center',
    paddingVertical: 45,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 18,
    color: Colors.PRIMARY,
  },
  text1: {
    fontFamily:  Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    marginBottom: 8,
    color: Colors.BLACK,
  },
  navButton: {
    marginTop: 15,
  },
  termsButton: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical: 2,
  },
  createButton: {
    marginVertical: 20,
    marginTop:80,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  navTermsText1: {
    fontSize: 13,
    color: Colors.BLACK,
    paddingRight:5,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  navTermsText2: {
    fontSize: 13,
    color: Colors.PRIMARY,
    paddingRight:5,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
  navButtonText1: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.BLACK,
    paddingRight:5,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  navButtonText2: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.PRIMARY,
    fontFamily: Fonts.POPPINS_BOLD,
  },
});

export default Signup;