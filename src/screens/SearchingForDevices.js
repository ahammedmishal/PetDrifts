import React, { useEffect } from 'react';
import {StyleSheet,View,Text,Image,StatusBar,TouchableOpacity,Platform} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Fonts,Images } from '../constants';
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, Easing } from "react-native-reanimated";
import { StatusBarHeight, windowHeight, windowWidth } from '../utils/Dimenstions';
import FormButton from '../components/FormButton';
import Ionicons from 'react-native-vector-icons/Ionicons'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const SearchingForDevices = ({navigation}) => {
  return (
    <View style={styles.container}>
    <StatusBar
        barStyle="dark-content" 
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
    />
    <TouchableOpacity style={styles.headerContainer}>
        <Ionicons name="close" size={30} onPress={() => navigation.navigate('DrawerHome')} color={'black'} />
        <Text style={styles.helpText} >Help</Text>
    </TouchableOpacity>

    <View style={{ justifyContent:'space-between',flex:1}}>
      <View>
          <View style={styles.titileContainer}>
              <Text style={styles.headerText1}>Searching For Devices</Text>
              <Text style={styles.headerText2}>It's going to take only a couple seconds</Text>
          </View>
      </View>

      <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
      {Platform == "ios" ?
        <View style={{justifyContent:'center',marginTop:80}}/>
        : null
      }
        <PulseCircle/>
        <Image style={styles.Logo} source={Images.Logo}/>
      </View>

      <FormButton
          buttonTitle={'Searching'}
          backgroundColor="#f3f3f3"
          color={Colors.BLACK}
          onPress={()=> navigation.navigate('DeviceFound')}
      />
    </View>
    </View>
  );
};

function PulseCircle() {
    const pulse = useSharedValue(0.5);
  
    const innerStyle = useAnimatedProps(() => {
      return {
        r: pulse.value * 185
      }
    })
  
    const middleStyle = useAnimatedProps(() => {
      return {
        r: 35 + pulse.value * 205
      }
    })
  
    const outerStyle = useAnimatedProps(() => {
      return {
        r: 70 + pulse.value * 220,
        opacity: 1 - pulse.value
      } 
    })
  
    useEffect(() => {
      pulse.value = withRepeat(withTiming(1, { duration: 2000, easing: Easing.linear }), -1, false)
    }, [pulse])
  
    return (
     
      <Svg width={windowWidth} height={windowHeight}>
        <AnimatedCircle cx={200} cy={365} r={35} strokeWidth={10} stroke={Colors.LIGHT_VIOLET}  animatedProps={innerStyle} />
        <AnimatedCircle cx={200} cy={365} r={70} strokeWidth={6} stroke={Colors.LIGHT_VIOLET} animatedProps={middleStyle} />
        <AnimatedCircle cx={200} cy={365} r={105} strokeWidth={3} stroke={Colors.LIGHT_VIOLET}  animatedProps={outerStyle} />
      </Svg>
   
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.DEFAULT_WHITE,
    padding:15,
   
  },
  headerContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:StatusBarHeight
  },
  outerStyle:{
    borderWidth:10
  },
  logoConatiner: {
    alignItems:'center',
     justifyContent:'center',
     backgroundColor:'#faf6ee',
     borderRadius: 180,
   },
  Logo: { 
     width: windowWidth / 2.2,
     height: windowHeight / 6,
     resizeMode: 'contain',
     position:'absolute',
  },
  headerText1: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    color: Colors.BLACK,
  },
  headerText2: {
    alignSelf:'center',
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 15,
    color: Colors.DARK_GREY,
  },
  helpText:{
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.PRIMARY,
  }
});


export default SearchingForDevices;