import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Signup = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View>
         <Text>Signup</Text>
         <View style={styles.signUpContainer}>
          <Text style={styles.accountText}>have an account</Text>
          <Text style={styles.signupText} onPress={()=>navigation.navigate('Login')}>Login</Text>
         </View>   
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpContainer:{
    marginHorizontal: 20,
    justifyContent:'center',
    paddingVertical:20,
    flexDirection:'row',
    direction:'center'
  },
  accountText:{
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color:"black",
  },
  signupText:{
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color:"green",
    marginLeft:5,
  },
});

export default Signup;