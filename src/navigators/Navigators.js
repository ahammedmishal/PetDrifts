import React, {useCallback, useContext, useEffect, useState} from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from '../context/AuthContext' 
import { AxiosContext } from '../context/AxiosContext';
import * as Keychain from 'react-native-keychain';
import Home from '../screens/Home';
import Spinner from '../components/Spinner';
import {Login,Signup} from '../screens';
import {TouchableOpacity,Text,StyleSheet,Image} from 'react-native';
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
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PetProfile from '../screens/PetProfile';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()

const Navigators = ()=>{
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('loading');
    const [userInfoStatus, setUserInfoStatus] = useState('loading')
  
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
    },[checkUserInfo()])

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

        <Drawer.Screen  options={{
          title:'Settings',
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
        name="Settings" component={Settings}/>

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
        }} name="SearchingForDevices" component={SearchingForDevices}/>

        <Stack.Screen options={{
          headerShown: false
        }} name="DeviceFound" component={DeviceFound}/>

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
