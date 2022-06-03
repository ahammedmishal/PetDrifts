import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../context/AxiosContext';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import GoogleButton from '../components/GoogleButton';
import { windowHeight, windowWidth } from '../utils/Dimenstions';
import {Fonts, Images,Colors} from '../constants';
import { TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';


const Login = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [emailValidError, setEmailValidError] = useState(null);
  const [passwordValidError, setPasswordValidError] = useState(null);

  const onLogin = async () => {
    if(email.length == 0 || password.length ==0){
      Alert.alert('Wrong Input!', 'Email or Password field cannot be empty.',[
        {text: 'Okay'}
      ])
    }else{
    setIsLoading(!isLoading)
    try {
      const response = await publicAxios.post('/login', {
        email,
        password,
      });

      const {refresh, access} = response.data;
      let userInfo = response.data;
      setUserInfo(userInfo);
      authContext.setAuthState({
        access ,
        refresh , 
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          access,
          refresh,
        }),
      );
      setIsLoading(false)
    } catch (error) {
      Alert.alert('email or password incorrect.',  JSON.stringify(error.response.data.detail));
      setIsLoading(false)
    }
    }
  };

  const handleValidPassword = val =>{
    if(val.length === 0){
      setPasswordValidError(`Password can't be empty.`);
    } else if (val.trim().length < 6){
      setPasswordValidError('Password must be 6 characters long.');
    }
    else {
     setPasswordValidError('');
    }
  }

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    
    if (val.length === 0) {
      setEmailValidError(`Email address can't be empty.`);
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter valid email address.');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
          barStyle="dark-content" 
          backgroundColor={"#fff"}
          translucent
      />
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
      <Image
        source={Images.Logo}
        style={styles.logo}
      />
      <Text style={styles.text}>Welcome Back!</Text>
      <Text style={styles.text1}>We have been waiting for you!</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => {setEmail(userEmail); handleValidEmail(userEmail)}}
        placeholderText="Email Address"
        iconType="email"
        source={Images.EMAIL}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={emailValidError}
      />
      {emailValidError ?
      <Animatable.View animation={'fadeInLeft'} duration={500}>
        <Text style={styles.errorMsg}>{emailValidError}</Text>
      </Animatable.View> : null
      }

      <FormInput
        labelValue={password}
        onChangeText={userPassword => {setPassword(userPassword);handleValidPassword(userPassword)}}
        placeholderText="Password"
        source={Images.UNLOCK}
        autoCapitalize="none"
        iconType="lock"
        secureTextEntry={passwordVisible}
        error={passwordValidError}
        right={<TextInput.Icon color={Colors.INACTIVE_GREY} name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
      />

      {passwordValidError ?
      <Animatable.View animation={'fadeInLeft'} duration={500}>
        <Text style={styles.errorMsg}>{passwordValidError}</Text>
      </Animatable.View> : null
      }

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navForgottenText}>Forgotten Password?</Text>
      </TouchableOpacity>

      <FormButton
        buttonTitle="Login"
        onPress={()=> onLogin()}
        isLoading={isLoading}
      />
      
      <View style={styles.orContainerText}>
        <View style={styles.orTextLine}/>
          <Text style={styles.orText}>or</Text>
        <View style={styles.orTextLine}/>
      </View>

        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <GoogleButton
            buttonTitle="Sign In with Google"
            source={Images.GOOGLE}
            color="#de4d41"
            backgroundColor={Colors.GOOGLE_WHITE}
            onPress={() => googleLogin()}
          />
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color={Colors.DEFAULT_WHITE}
            backgroundColor={Colors.FABEBOOK_BLUE}
            onPress={() => fbLogin()}
          />
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="apple"
            color={Colors.DEFAULT_WHITE}
            backgroundColor={Colors.BLACK}
            onPress={() => googleLogin()}
          />
        </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText1}>Don't have an account?</Text>
        <Text style={styles.navButtonText2}>SIGN UP!</Text>
      </TouchableOpacity>

    </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor:Colors.DEFAULT_WHITE,
    padding: 10,
    paddingTop: 50,
    flex:1
  },
  logo: {
    alignSelf:'center',
    height:150,
    width: 200,
    resizeMode: 'contain',
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
  forgotButton: {
    marginVertical: 2,
    alignSelf:'flex-end'
  },
  createButton: {
    marginBottom:windowHeight / 15,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  navForgottenText: {
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
  orContainerText:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:windowWidth / 1.2,
    alignSelf:'center',
  },
  orTextLine: {
    height:2,
    width:windowWidth / 2.7,
    backgroundColor:Colors.LIGHT_GREY
  },
  orText:{
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color:"black",
    fontFamily:Fonts.POPPINS_REGULAR,
    alignSelf:'center',
  },
  errorMsg: {
    color:'red',
  }
});