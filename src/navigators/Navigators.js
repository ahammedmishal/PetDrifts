import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TouchableOpacity,Text,StyleSheet,Image} from 'react-native';
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from '../context/AuthContext' 
import { AxiosContext } from '../context/AxiosContext';
import * as Keychain from 'react-native-keychain';

import SplashScreen from 'react-native-splash-screen';
import Spinner from '../components/Spinner';
import {Avatar} from 'react-native-paper';
import { Fonts ,Images } from '../constants';

import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  Login,
  Signup,
  DashBoardScreen,
  CaloriesBurnt,
  DeviceStatus,
  UserProfile,
  PetProfile,
  DeviceFound,
  Settings,
  PetInformation,
  WeGuessed,
  SearchingForDevices,
  SyncingDevice,
  Home
} from '../screens';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()

const Navigators = ()=>{
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('loading');
    const [userInfoStatus, setUserInfoStatus] = useState('loading')
    const [mounted, setMounted] = useState(true);
    
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
    
    
    const checkUserInfo = async () => {
      if(authContext.authState.authenticated === true ){
        try {
          const response = await axiosContext.authPetAxios.get('/get_profile')
          setUserInfoStatus('success')
        }catch (error) {
          console.log("main",error)
           setUserInfoStatus('error') 
        }  
      } 
    }

    useEffect(() => {
        SplashScreen.hide();
        loadJWT();
      }, [loadJWT])

    useEffect(()=>{
      checkUserInfo();
    },[checkUserInfo])

    const DrawerHome = () => (
      <Drawer.Navigator
      initialRouteName="DashBoardScreen"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ 
        headerShown: false,
        headerStyle: {
          backgroundColor:'#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        drawerActiveBackgroundColor: '#FBA304',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: Fonts.POPPINS_MEDIUM,
          fontSize: 15,
          marginTop:5
        },
      }}>
        <Drawer.Screen options={{
          title: 'Dash Board' ,
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }} name="DashBoardScreen" component={DashBoardScreen}/>
        {/* <Drawer.Screen options={{
          title: 'Dash Board' ,
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }} name="DeviceFound" component={DeviceFound}/> */}

        <Drawer.Screen options={{
          title:'Calories Burnt',
          drawerIcon: ({color}) => (
            <MaterialCIcons name="fire" size={22} color={color} />
          ),
        }} name="CaloriesBurnt" component={CaloriesBurnt}/>

        <Drawer.Screen options={{
          title:'Device Status',
          drawerIcon: ({color}) => (
            <Ionicons name="phone-portrait-outline" size={22} color={color} />
          ),
        }} name="DeviceStatus" component={DeviceStatus}/>

        <Stack.Screen  options={{
          title:'User Profile',
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
        name="UserProfile" component={UserProfile}/>

        <Stack.Screen  options={{
          title:'Pet Profile',
          drawerIcon: ({color}) => (
            <MaterialIcons name="pets" size={22} color={color} />
          ),
        }}
        name="PetProfile" component={PetProfile}/>

        <Drawer.Screen  options={{
          title:'Settings',
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
        name="Settings" component={Settings}/>

      </Drawer.Navigator>
    );

    return(
        <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false,
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
        
        userInfoStatus == 'loading' ? 

        <Stack.Screen
          options={{headerShown:false}} 
          name="Spinner"
          component={Spinner}
        />
        :
        userInfoStatus == 'success' ?

        <Stack.Screen
          name="DrawerHome"
          component={DrawerHome}
          options={{ headerShown: false }}
        />
        :
        <>
        <Stack.Screen  options={{
          headerShown:false
        }}
          name="PetInformation" component={PetInformation}/>
          
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />

          <Stack.Screen options={{
          headerShown: false
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
          headerShown:false
        }} name="DeviceStatus" component={DeviceStatus}/>

        <Stack.Screen options={{
          headerShown:false
        }} name="SearchingForDevices" component={SearchingForDevices}/>

        <Stack.Screen options={{
          headerShown: false
        }} name="DeviceFound" component={DeviceFound}/>
              
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
            
            <Stack.Screen
              name="DrawerHome"
              component={DrawerHome}
              options={{ headerShown: false }}
            />

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
