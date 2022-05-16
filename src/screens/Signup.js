import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {Fonts, Images } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Separator from '../components/Separator';
import CheckBox from '../components/CheckBox';
import { AuthContext } from '../context/AuthContext';


const Signup = ({navigation}) => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [country, setCountry] = useState(null);
  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [phone, setPhone] = useState();
  const [music, setMusic] = useState(false);

  function onClearCredentials() {
    setEmail(null),
    setPassword(null),
    setCountry(null),
    setName(null),
    setIsLoading(false)
  }

  const onRegister = async () => {
    try {
        const response = await publicAxios.post('/register', {
        name,
        email,
        password,
        country,
        });
  
        const {refresh, access} = response.data.user;
        let userInfo = response.data.user;
        setUserInfo(userInfo);
        console.log(userInfo);
        authContext.setAuthState({
          access,
          refresh,
          authenticated: true,
        });

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            access,
            refresh,
          }),
        );
      } catch (error) {
        Alert.alert('Registraion Failed', JSON.stringify(error.response.data.user));
      }
    };

  return (
    <View style={styles.container}>
        <StatusBar
          barStyle="dark-content" 
          backgroundColor={"#fff"}
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
        // keyboardType="name"
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
  {/* //phone */}
      <FormInput
        labelValue={phone}
        onChangeText={(userPhone) => setPhone(userPhone)}
        placeholderText="Phone Number"
        iconType="email"
        source={Images.CALL}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={country}
        onChangeText={(userCountry) => setCountry(userCountry)}
        placeholderText="Country"
        iconType="email"
        source={Images.MARKER}
        // keyboardType="alphabet"
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
      />

      <View style={styles.termsButton} onPress={() => {}}>
        <CheckBox
            onPress={() => setMusic(!music)}
            title="By Clicking this I agree to"
            isChecked={music}
        />
      </View>

      <FormButton
        buttonTitle="Login"
        onPress={() => onRegister()}
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
    backgroundColor:'#ffffff',
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
    // marginBottom: 1,
    color: '#feaa18',
  },
  text1: {
    fontFamily:  Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    marginBottom: 8,
    color: '#2D2D2D',
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
    color: '#2D2D2D',
    paddingRight:5,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  navTermsText2: {
    fontSize: 13,
    color: '#FBA304',
    paddingRight:5,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
  navButtonText1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D2D2D',
    paddingRight:5,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  navButtonText2: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FBA304',
    fontFamily: Fonts.POPPINS_BOLD,
  },
});

export default Signup;