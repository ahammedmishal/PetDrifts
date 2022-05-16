import React, {useCallback, useContext, useEffect, useState} from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext' 
import * as Keychain from 'react-native-keychain';
import Home from '../screens/Home';
import Spinner from '../components/Spinner';
import {Login,Signup} from '../screens';
import {TouchableOpacity,Text,StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import PetInformation from '../screens/PetInformation';
import WeGuessed from '../screens/WeGuessed';
import DeviceStatus from '../screens/DeviceStatus';
import { Fonts ,Images } from '../constants';
import {Avatar} from 'react-native-paper';
import Settings from '../screens/Settings';
import UserProfile from '../screens/UserProfile';
import Icon from "react-native-vector-icons/Ionicons";
import DeviceFound from '../screens/DeviceFound';
import SyncingDevice from '../screens/SyncingDevice';
import DashBoardScreen from '../screens/DashBoardScreen';
import CaloriesBurnt from '../screens/CaloriesBurnt';
import SearchingForDevices from '../screens/SearchingForDevices';

const Stack = createStackNavigator()

const Navigators = ()=>{

    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('loading');
  
      
    const loadJWT = useCallback(async () => {
      try {
        const value = await Keychain.getGenericPassword();
        const jwt = JSON.parse(value.password);
  
        authContext.setAuthState({
          access: jwt.access || null,
          refresh: jwt.refresh || null,
          authenticated: jwt.access !== null,
        });
        setStatus('success');
      } catch (error) {
        setStatus('error');
        console.log(`Keychain Error: ${error.message}`);
        authContext.setAuthState({
          access: null,
          refresh: null,
          authenticated: false,
        });
      }
    }, []);

    useEffect(() => {
        SplashScreen.hide();
        loadJWT();
      }, [loadJWT])

    return(
        <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor:'#ffffff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTintColor:'#2D2D2D',
            headerTitleStyle:{
              fontFamily: Fonts.POPPINS_MEDIUM,
            }
          }}
        >
        {
          status == 'loading' ?
          <Stack.Screen
            options={{headerShown:false}} 
            name="Spinner"
            component={Spinner}
          />
         :
         (authContext?.authState?.authenticated === false) ? 
          <>
            <Stack.Screen
              options={{headerShown:false}} 
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{headerShown:false}} 
              name="Signup"
              component={Signup}
            />
          </>
         : 
         <>

        <Stack.Screen options={{
            title:'',
            headerLeft: ()=>{
              return <TouchableOpacity
               style={{paddingHorizontal: 10}}
               onPress={() => {console.log('cliked')}}>
                <Icon name="md-close" size={30} color='#2D2D2D'/>
               </TouchableOpacity>
            },
        }} name="SyncingDevice" component={SyncingDevice}/>
        
        <Stack.Screen options={{
              title:'Calories Burnt',
              headerRight: () =>{
                return <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={() => {console.log('cliked')}}>
                 <Avatar.Image
                  source={Images.PETAVATAR}
                  size={40}
                  />
                  </TouchableOpacity> 
        }}} name="CaloriesBurnt" component={CaloriesBurnt}/>

        <Stack.Screen options={{
          title:'',
          headerLeft: ()=>{
            return <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => {console.log('cliked')}}>
              <Icon name="md-close" size={30} color='#2D2D2D'/>
            </TouchableOpacity>
          },
          headerRight: () =>{
            return <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => {console.log('cliked')}}>
            <Text style={styles.title}>Save</Text>
            </TouchableOpacity>
        }}} name="SearchingForDevices" component={SearchingForDevices}/>

        <Stack.Screen options={{
          title:'',
          headerLeft: ()=>{
            return <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => {console.log('cliked')}}>
              <Icon name="md-close" size={30} color='#2D2D2D'/>
            </TouchableOpacity>
          },
          headerRight: () =>{
            return <TouchableOpacity
            style={{paddingHorizontal: 10}}
            onPress={() => {console.log('cliked')}}>
            <Text style={styles.title}>Save</Text>
            </TouchableOpacity>
        }}} name="Device Found" component={DeviceFound}/>


         <Stack.Screen options={{
            title:'',
            headerRight: () =>{
              return <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={() => {console.log('cliked')}}>
               <Avatar.Image
                source={Images.PETAVATAR}
                size={40}
                />
                </TouchableOpacity>
          }}} name="DashBoardScreen" component={DashBoardScreen}/>

          <Stack.Screen options={{
            title:'Device Status',
            headerRight: () =>{
              return <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={() => {console.log('cliked')}}>
               <Avatar.Image
                source={Images.PETAVATAR}
                size={40}
                />
                </TouchableOpacity>
            }}} name="DeviceStatus" component={DeviceStatus}/>

          <Stack.Screen  options={{
            title:'User Profile',
            headerLeft: ()=>{
             return <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={() => {console.log('cliked')}}>
               <Icon name="md-close" size={30} color='#2D2D2D'/>
              </TouchableOpacity>
             },
             headerRight: () =>{
               return <TouchableOpacity
               style={{paddingHorizontal: 10}}
               onPress={() => {console.log('cliked')}}>
                <Text style={styles.title}>Save</Text>
                </TouchableOpacity>
             }}}
             name="UserProfile" component={UserProfile}/>
             
           <Stack.Screen  options={{
             title:'Settings',
             headerRight: () =>{
               return <TouchableOpacity
               style={{paddingHorizontal: 10}}
               onPress={() => {console.log('cliked')}}>
                <Avatar.Image
                  source={Images.USERAVATAR}
                  size={40}
                />
                </TouchableOpacity>
             }}}
             name="Settings" component={Settings}/>
             
          <Stack.Screen name="PetInformation" component={PetInformation}/>
          <Stack.Screen name="WeGuessed" component={WeGuessed} options={{headerShown:false}} />
         </>
        }
      </Stack.Navigator>
    </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_REGULAR,
    color:'#FBA304',
  }
});

export default Navigators
