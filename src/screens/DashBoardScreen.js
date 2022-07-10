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
import CircularProgress from 'react-native-circular-progress-indicator';
import {PieChart} from 'react-native-svg-charts';
import Svg, {Text as SvgText, ForeignObject} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

LogBox.ignoreAllLogs(true)

const DashBoardScreen = ({navigation}) => { 

  const axiosContext = useContext(AxiosContext);

  const [calories, setCalories] = useState(0)
  const [sleep, setSleep] = useState(0)
  const [status, setStatus] = useState('loading');
  const [active, setActive] = useState(null)
  
  const data = Array.apply(null, Array(61)).map(Number.prototype.valueOf, 1);
  const [values, setValues] = useState([25,15])
  // Replace with your fill method...
  const getFill = (index) => {
    if (index < values[0]) return '#FFB300';
    if (index-values[0] < values[1]) return '#026D7E';
    return '#CCCCCC';
  };

  const pieDatas = data.map((value, index) => ({
    value,
    svg: {
      fill: getFill(index),
    },
    arc: { cornerRadius: 0,strokeWidth:2},
    key: `pie-${index}`,
  }));

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
                <PieChart 
                    innerRadius="89%"
                    outerRadius="99%"
                    style={{
                      height: 250,
                    }}
                    data={pieDatas}>
                      <ForeignObject x={-100} y={-100}>
                        <View style={styles.progressCircleContentContainer}>
                            <View style={{width:100,height:100,backgroundColor:'#fcfcfc',alignItems: 'center',borderRadius:60,justifyContent:'center'}}>
                            <View style={{width:70,height:70,backgroundColor:'#FFFFFF',alignItems: 'center',borderRadius:60,justifyContent:'center'}}>
                                <Image source={Images.PET} style={{width:50,height:50,resizeMode:'contain'}}/>
                            </View>
                        </View>
                        <View style={styles.progressCircleContentView}>
                            <Text style={styles.text}>Feeling like</Text>
                            <Text style={styles.text1}>Athlete!</Text>
                        </View>
                        </View>
                      </ForeignObject>
                  </PieChart>
              </>
            }

            <View style={styles.sectionConatiner}>
              <View style={styles.sectionTitleConatiner}>
                <View style={{width:19,height:6,backgroundColor:'#FFB300',borderRadius:10,marginRight:10}}/>
                <Text style={styles.sectionTitle}>Calories</Text>
              </View>

              <View style={styles.sectionTitleConatiner}>
                <View style={{width:19,height:6,backgroundColor:'#026D7E',borderRadius:10,marginRight:10}}/>
                <Text style={styles.sectionTitle}>Rest Hours</Text>
              </View>
          </View>
        </View>

        {/* Line Graph */}
        <View style={{justifyContent:'space-evenly',marginTop:40,backgroundColor:'#F9F9F9',borderRadius:20,}}>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#F9F9F9',borderRadius:20,paddingHorizontal:5,marginBottom:10}}>
          
          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('CaloriesBurnt')} style={styles.ChartConatinerLeft}>
            <LinearGradient 
              start={{x:0.0,y:0.25}}
              end={{x:0.5,y:1.0}}
              colors={['#FFAD00','#985100']}
              style={styles.ChartConatinerLeft}
              >
            <View style={{width:56,height:56,backgroundColor:'white',borderRadius:30,marginTop:-30,alignItems:'center',justifyContent:'center',elevation:30}}>
              <Image source={Images.CALORIES} style={{width:35,height:40,resizeMode:'contain'}}/>
            </View>
              <LineChart
                style={{height: 95,width:100}}
                data={caloriesGraph}
                contentInset={{ top: 50, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{  strokeWidth: 3, stroke: Colors.DEFAULT_WHITE }}
              />
              <View style={{flexDirection:'row'}}>
                <Text style={styles.lineGraphText}>{calories} </Text>
                <Text style={styles.lineGraphValueText}>Kcal</Text>
              </View>
              <Text style={styles.lineGraphText2}>Calories burnt</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('CaloriesBurnt')} style={styles.ChartConatinerRight}>
            <LinearGradient 
                start={{x:0.0,y:0.25}}
                end={{x:0.5,y:1.0}}
                colors={['#12A1B3','#025D6C']}
                style={styles.ChartConatinerLeft}
                >
            <View style={{width:56,height:56,backgroundColor:'white',borderRadius:30,marginTop:-30,alignItems:'center',justifyContent:'center',elevation:30}}>
              <Image source={Images.REST} style={{width:35,height:40,resizeMode:'contain'}}/>
            </View>
              <LineChart
                style={{height: 95,width:100}}
                data={restGraph}
                contentInset={{ top: 50, bottom: 30 }}
                curve={shape.curveNatural}
                fill={ 'white' }
                svg={{  strokeWidth: 3, stroke: Colors.DEFAULT_WHITE }}
              />
              <View style={{flexDirection:'row'}}>
                <Text style={styles.lineGraphText}>{sleep} </Text>
                <Text style={styles.lineGraphValueText}>Hours</Text>
              </View>
              <Text style={styles.lineGraphText2}>Rest</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        <FormButton
            buttonTitle="Device"
            backgroundColor={"white"}
            width={'86%'}
            alignSelelf={'center'}
            elevation={54}
            color={'#FF7B00'}
            onPress={()=> navigation.navigate('DrawerHome',{screen: 'DeviceStatus'})}
        />
        </View>

     </View>

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
      width:windowWidth /2.8,
      height:windowHeight/ 4.3,
      backgroundColor: Colors.PRIMARY,
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center'
    },
    ChartConatinerRight: {
      width:windowWidth /2.8,
      height:windowHeight/ 4.3,
      backgroundColor: Colors.GREEN_CYAN,
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center'
    },
    sectionWrapper: {
      justifyContent: "center",
      borderRadius: 20,
      backgroundColor: Colors.LIGHT_GREY2,
      height: windowHeight / 2.1,
      top:5
    },
    sectionConatiner: {
      backgroundColor:' Colors.LIGHT_GREY2',
      width:'100%',
      alignItems:'center',
      flexDirection:'column',
      height:20,
      justifyContent:'space-between',
      top:15,
    },
    sectionTitleConatiner: {
      flexDirection:'row',
      alignItems:'center',
      width:100
    },
    sectionTitle: {
      fontFamily: Fonts.POPPINS_MEDIUM,
      fontSize:13,
      paddingLeft:4,
      color: "#262626"
    },
    lineGraphText :{
      color: Colors.DEFAULT_WHITE,
      fontFamily:Fonts.POPPINS_SEMI_BOLD,
      fontSize:20,
    },
    lineGraphValueText :{
      color: '#CDCDCD',
      fontFamily:Fonts.POPPINS_REGULAR,
      fontSize:20,
    },
    lineGraphText2 :{
      color: '#CDCDCD',
      fontFamily:Fonts.POPPINS_SEMI_BOLD,
      fontSize:12,
    },
    headerContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingTop:StatusBarHeight
    },
    pieChart: {
      height: 300,
    },
    progressCircle: {
      height: 250,
      marginTop: 25,
    },
    progressCircleContentContainer: {
      alignItems: 'center',
      width: 200,
      height: 200,
      transform: [],
      justifyContent: 'space-around',
    },
    progressCircleContentView: {
      justifyContent: 'center',
      alignItems:'center',
      width: 200,
    },
    text: {
      fontSize: 14,
      color:'#D99800',
      fontFamily:Fonts.POPPINS_SEMI_BOLD,
    },
    text1: {
      fontSize: 18,
      color:'#D99800',
      fontFamily:Fonts.POPPINS_SEMI_BOLD,
    },
  });
export default DashBoardScreen;