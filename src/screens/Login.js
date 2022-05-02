import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import GoogleButton from '../components/GoogleButton';
import { windowWidth } from '../utils/Dimenstions';
import {Fonts, Images } from '../constants';


const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [user, setUser] = useState()
  const [password, setPassword] = useState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={Images.Logo}
        style={styles.logo}
      />
      <Text style={styles.text}>Welcome Back!</Text>
      <Text style={styles.text1}>We have been waiting for you!</Text>

      <FormInput
        labelValue={user}
        onChangeText={(userName) => setUser(userName)}
        placeholderText="Username"
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

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        source={Images.UNLOCK}
        iconType="lock"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navForgottenText}>Forgotten Password?</Text>
      </TouchableOpacity>

      <FormButton
        buttonTitle="Login"
        onPress={() => login(email, password)}
      />
      
      <View style={styles.orContainerText}>
        <View style={styles.orTextLine}/>
          <Text style={styles.orText}>or</Text>
        <View style={styles.orTextLine}/>
      </View>

      {Platform.OS === 'android' ? (
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

          <GoogleButton
            buttonTitle="Sign In with Google"
            source={Images.GOOGLE}
            color="#de4d41"
            backgroundColor="#fdf8f8"
            onPress={() => googleLogin()}
            
          />
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#fff"
            backgroundColor="#1492e6"
            onPress={() => fbLogin()}
          />
          
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="apple"
            color="#fff"
            backgroundColor="#2D2D2D"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText1}>Don't have an account?</Text>
        <Text style={styles.navButtonText2}>SIGN UP!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor:'#ffffff',
    padding: 20,
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
  forgotButton: {
    marginVertical: 2,
    alignSelf:'flex-end'
  },
  createButton: {
    marginVertical: 20,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  navForgottenText: {
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
    backgroundColor:'#ededed'
  },
  orText:{
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color:"black",
    fontFamily:Fonts.POPPINS_REGULAR,
    alignSelf:'center'
  },
});