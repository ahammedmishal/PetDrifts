import React,{useEffect} from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Login,Signup} from '../screens'
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator()

const Navigators = ()=>{

    useEffect(() => {
        SplashScreen.hide();
      }, [])

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name= "Login" component={Login}/>
                <Stack.Screen name= "Signup" component={Signup}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators
