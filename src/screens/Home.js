import axios from 'axios';
import React, {useContext, useState,useEffect} from 'react';
import {Button,Text, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import * as Keychain from 'react-native-keychain';

const Home = ({navigation}) => {

  const [status, setStatus] = useState('idle');

  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const {publicAxios} = useContext(AxiosContext);
  const {authAxios} = useContext(AxiosContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    
    const getUsers = async () => {
      try {
        const response = await axiosContext.authAxios.get('/get_user_profile')
        let userInfo = response.data
        console.log(response.data);
        setUserInfo(userInfo)
        console.log(userInfo);
      } catch (error) {
        setStatus('error');
        console.log(error)
      }
    }
    getUsers();

      const checkUserStatus = async () => {
        try {
          const credentials = await Keychain.getGenericPassword();
          if (credentials) {
           console.log('Credentials loaded')
           console.log('Credentials:',credentials)
           console.log('Credentials:',credentials.password)
          } else {
            console.log('No credentials stored');
          }
        } catch (error) {
          console.log('Keychain couldn\'t be accessed!', error);
          setLoading(false);
        }
      }

      checkUserStatus();

  },[])

  return (
    <View style={styles.container}>
     
        <Text style={styles.text}>user:{userInfo.user}</Text>
        <Text style={styles.text}>name:{userInfo.name}</Text>
        <Text style={styles.text}>country:{userInfo.country}</Text>
        <Text style={styles.text}>province:{userInfo.province}</Text>

      <View style={styles.buttonGroup}>
      {/* <Button title="Get user" onPress={onGetUserProfile} /> */}
        <Button title="Logout" onPress={() => authContext.logout()} />
        <Button title="SyncingDevice" onPress={() => navigation.navigate('Signup')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
  text:{
    color:'black',
    fontWeight:'bold',
    fontSize:20,
  }
});
export default Home;
