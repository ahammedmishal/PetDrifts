import React, {useState,useEffect,useContext} from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  LogBox
  } from "react-native";
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import { Colors, Fonts,Images } from '../constants';
import { StatusBarHeight, windowHeight, windowWidth} from '../utils/Dimenstions';
import FormButton from "../components/FormButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Spinner from "../components/Spinner";
import {Avatar} from 'react-native-paper';
import { DonutChart } from "react-native-circular-chart";
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
LogBox.ignoreAllLogs(true)

const DashBoardScreen = ({navigation}) => { 

  const axiosContext = useContext(AxiosContext);

  const [calories, setCalories] = useState(0)
  const [sleep, setSleep] = useState(0)
  const [status, setStatus] = useState('loading');
  const [active, setActive] = useState(null)

  useEffect(() => {
    getCaloriesRest();
    getPetStatus();
  },[])
  
  const getCaloriesRest = async () => {
    try {
      const response = await axiosContext.authFitAxios.get('/get_dashboard')
      let caloriesRest = response.data;
      let calories = response.data.calories;
      let sleep = response.data.sleep;
      // console.log(response.data);
      setCalories(calories);
      setSleep(sleep);
      // console.log(caloriesRest);
      // console.log(calories);
      // console.log(sleep);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      // console.log(error);
    } 
  }

  const getPetStatus = async () =>{
    try {
      const response = await axiosContext.authFitAxios.get('/get_pet_status')
      setActive(response.data.status)
    } catch (error) {
      // console.log(error)
    } 
  }

const pieData = [
  {name: "Calories" ,value: calories == 0 ? 150 : parseInt(calories) , color: calories == 0 ? Colors.LIGHT_GREY3 : Colors.PRIMARY},
  {name: "Rest" ,value: sleep == 0 ? 150 : parseInt(sleep), color: sleep == 0 ? Colors.LIGHT_GREY3 : Colors.GREEN_CYAN3},
  {name: "Blank" ,value:350,color: Colors.LIGHT_GREY3},
]

const caloriesGraph = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const restGraph = [200, 10, 40, 95, -4, -24, 205, 91, 35, 53, -53, 24, 250, 300, 300]

  return (
    <View style={styles.container}>
     <StatusBar
       barStyle="dark-content" 
       backgroundColor="rgba(0, 0, 0, 0.20)"
       translucent
     />

      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={{backgroundColor:'#f9f9f9',width:40,height:40,alignItems:'center',justifyContent:'center',borderRadius:8}}
          onPress={() => navigation.openDrawer()}>
            <Image source={Images.MENU} style={{width:25,height:20}}/>
        </TouchableOpacity>
            <Image source={Images.Logo} style={{width:128,height:40}}/>
        <TouchableOpacity
         onPress={()=> navigation.navigate('DrawerHome',{screen: 'PetProfile'})}>
          <Avatar.Image
            source={Images.PETAVATAR}
            size={40}
          />
          {/* enable below code to get green active color on pet profile */}
          {/* <View style={{borderRadius:30,width:12,height:12,backgroundColor:'#00F349',alignSelf:'flex-end', position: 'absolute',
            right: -2,
            bottom: 0,borderWidth:2,borderColor:'#ffffff'}}
          /> */}
        </TouchableOpacity>
      </View>

      <View style={{}}>
          <View style={styles.titileContainer}>
              {/* <Text style={styles.headerText1}>{active}</Text> */}
              {/* <Text style={styles.headerText}>Feeling like Athlete!</Text> */}
          </View>

          <View style={styles.sectionWrapper}>
  
            {status == 'loading' ?

              <Spinner/>
              :
              <>
                <DonutChart
                    data={pieData}
                    strokeWidth={15} 
                    radius={100}
                    containerWidth={ 370 - 10 * 2}
                    containerHeight={130 * 2}
                    type="round"
          
                    startAngle={0}
                    endAngle={360}
                    animationType="slide"
                    labelValueStyle={{
                        color: Colors.LIGHT_GREY2,
                        
                    }}
                    labelTitleStyle={{
                        color: Colors.LIGHT_GREY2,
                    }}
                    containerStyle={{
                        backgroundColor: Colors.LIGHT_GREY2,
                        borderRadius: 10,
                    }}
                />
                <Text style={{position:'absolute',bottom:100}}>Feeling like Athlete!</Text>
                <Image source={Images.BURN} style={{bottom:150,width:40,height:40,position:'absolute',resizeMode:'contain'}}/>
              </>
            }

            <View style={styles.sectionConatiner}>
              <View style={styles.sectionTitleConatiner}>
              <Icon name="moon-full" size={15} color={Colors.PRIMARY}/>
              <Text style={styles.sectionTitle}>Calories</Text>
            </View>

            <View style={styles.sectionTitleConatiner}>
              <Icon name="moon-full" size={15} color={Colors.GREEN_CYAN2}/>
              <Text style={styles.sectionTitle}>Rest Hours</Text>
            </View>
          </View>
        </View>

        {/* Line Graph */}
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
          
          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('CaloriesBurnt')} style={styles.ChartConatinerLeft}>
            <Text style={styles.lineGraphText}>{calories} Kcal</Text>
            <LineChart
              style={{height: 95,width:100}}
              data={caloriesGraph}
              contentInset={{ top: 50, bottom: 30 }}
              curve={shape.curveNatural}
              svg={{  strokeWidth: 3, stroke: Colors.DEFAULT_WHITE }}
            />
            <Text style={styles.lineGraphText2}>Calories</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('CaloriesBurnt')} style={styles.ChartConatinerRight}>
            <Text style={styles.lineGraphText}>{sleep} Hours</Text>
            <LineChart
              style={{height: 95,width:100}}
              data={restGraph}
              contentInset={{ top: 50, bottom: 30 }}
              curve={shape.curveNatural}
              svg={{  strokeWidth: 3, stroke: Colors.DEFAULT_WHITE }}
            />
            <Text style={styles.lineGraphText2}>Rest</Text>
          </TouchableOpacity>

        </View>

     </View>

     <FormButton
        buttonTitle="Device"
        onPress={()=> navigation.navigate('DrawerHome',{screen: 'DeviceStatus'})}
     />

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:Colors.DEFAULT_WHITE,
      padding: 20,
      justifyContent:'space-between'
    },
    titileContainer: {
      marginBottom:  windowHeight / 80,
    },
    headerText: {
      alignSelf:'center',
      fontFamily: Fonts.POPPINS_MEDIUM,
      fontSize: 23,
      color: Colors.BLACK,
    },
    headerText1: {
      alignSelf:'center',
      fontFamily: Fonts.POPPINS_MEDIUM,
      fontSize: 17,
      color: Colors.BLACK,
    },
    ChartConatinerLeft: {
      width:windowWidth /2.3,
      height:windowHeight/ 4.3,
      backgroundColor: Colors.PRIMARY,
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center'
    },
    ChartConatinerRight: {
      width:windowWidth /2.3,
      height:windowHeight/ 4.3,
      backgroundColor: Colors.GREEN_CYAN,
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center'
    },
    sectionWrapper: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: Colors.LIGHT_GREY2,
      shadowColor: "#000",
      height: windowHeight / 2.5,
      marginBottom:10
    },
    sectionConatiner: {
      backgroundColor: Colors.LIGHT_GREY2,
      width:240,
      flexDirection:'row',
      height:20,
      justifyContent:'space-between',
    },
    sectionTitleConatiner: {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    sectionTitle: {
      fontFamily: Fonts.POPPINS_REGULAR,
      fontSize:14,
      paddingLeft:4,
      color: Colors.DARK_GREY
    },
    lineGraphText :{
      color: Colors.DEFAULT_WHITE,
      fontFamily:Fonts.POPPINS_MEDIUM,
      fontSize:16,
    },
    lineGraphText2 :{
      color: Colors.DEFAULT_WHITE,
      fontFamily:Fonts.POPPINS_SEMI_BOLD,
      fontSize:17,
    },
    headerContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingTop:StatusBarHeight
    },
  });
export default DashBoardScreen;