import React,{useState,useEffect,useContext} from 'react';
import { View, Text,Image, StyleSheet,TouchableOpacity,StatusBar} from 'react-native';
import { Fonts,Images,Colors } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons'
import { StatusBarHeight, windowHeight, windowWidth} from '../utils/Dimenstions';
import { BarChart, LineChart} from "react-native-gifted-charts";
import {Avatar} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';

const CaloriesBurnt = ({navigation}) => {

  useEffect(() => {
    getChartsData();
  },[])
  
  const getChartsData = async () => { 
    try {
      const response = await axiosContext.authFitAxios.get('/get_calories_weekly')
      let lineData = response.data;

      for(var i = 0; i < lineData.length; i++){
        var obj = lineData[i];
        for(var prop in obj){
            if(obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])){
                obj[prop] = +obj[prop];   
            }
        }
      }
      setLineData(lineData)
      // console.log(lineData);
    } catch (error) {
      // console.log(error); 
    }
  }
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);

    const [lineData, setLineData] = useState([])

    // const [lineData, setLineData] = useState([
    //   {value: "0.20",label:'Sat'},
    //   {value: 0.20,label:'Sat'},
    // ])

    const [barData, setBarData] = useState([
      {value: 250, label: 'Jan'},
      {value: 500, label: 'Feb'},
      {value: 745, label: 'Mar'},
      {value: 320, label: 'Apr'},
      {value: 600, label: 'May'},
      {value: 256, label: 'June'},
      {value: 300, label: 'July'},
    ])

      return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content" 
          backgroundColor="rgba(0, 0, 0, 0.20)"
          translucent
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{padding: 15}} onPress={() => navigation.openDrawer()}>
              <Image source={Images.MENU} style={{width:25,height:20}}/>
          </TouchableOpacity>
          <Text style={styles.headText} >Calories Burnt</Text>
          <TouchableOpacity
            style={{padding: 15}}
            onPress={()=> navigation.navigate('DrawerHome',{screen: 'PetProfile'})}>
            <Avatar.Image
              source={Images.PETAVATAR}
              size={40}
            />
          </TouchableOpacity>
        </View>

          <View style={{paddingHorizontal:15}}>
            <View style={styles.weelkyTextContainer}>
              <Text style={styles.headerText1}>Weekly Calories</Text>
              <TouchableOpacity>
              <Icon name='md-ellipsis-horizontal-sharp' size={20} color="#2D2D2D"/>
              </TouchableOpacity>
            </View>
            <LineChart
              areaChart
              backgroundColor={Colors.DEFAULT_WHITE}
              curved
              isAnimated={true}
              animationDuration={2000}
              width={windowWidth}
              height={windowHeight/6}
              data={lineData}
              yAxisSide={"left"}
              hideDataPoints
              spacing={50}
              initialSpacing={30}
              thickness={3}
              color1={Colors.GREEN}
              startFillColor1= {Colors.DARK_GREEN}
              startFillColor2= {Colors.DARK_GREEN}
              endFillColor1= {Colors.DARK_GREEN}
              startOpacity={0.1}
              endOpacity={0}
              noOfSections={3}
              yAxisThickness={0}
              xAxisLabelTextStyle={{
                fontSize:13,
                color: Colors.DARK_GREY,
                fontFamily:Fonts.POPPINS_REGULAR
              }}
              yAxisTextStyle={{
                fontSize:15,
                color: Colors.DARK_GREY,
                fontFamily:Fonts.POPPINS_REGULAR
              }}
              rulesType="solid"
              rulesColor={Colors.LIGHT_GREY4}
              rulesThickness={2}
              xAxisColor="lightgray"
              scrollToEnd={true}
              showScrollIndicator={true}
              pointerConfig={{
                pointerStripUptoDataPoint: true,
                pointerStripColor: Colors.GREEN,
                pointerStripWidth:5,
                pointerStripHeight: 40,
                strokeDashArray: [11, 11],
                pointerColor: Colors.LIGHT_GREEN,
                showPointerStrip:true,
                radius: 4,
                shiftPointerLabelX:-35,
                shiftPointerLabelY:-10,
                autoAdjustPointerLabelPosition:false,
                pointerLabelWidth: 100,
                pointerLabelHeight: 120,
                pointerLabelComponent: (items) => {
                  return (
                    <View
                      style={{
                        height: 50,
                        width: 85,
                        backgroundColor: Colors.LIGHT_GREEN,
                        borderRadius: 4,
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:8,
                      }}>
                        {items ?
                        <>
                          <Text style={{color: Colors.DEFAULT_WHITE, fontWeight:'bold',fontSize:16}}>{items[0].value}</Text>
                          <Text style={{color: Colors.DEFAULT_WHITE, fontSize:12,fontFamily:Fonts.POPPINS_REGULAR}}>{"Kcal"}</Text>
                        </>
                          : null
                        }
                    </View>
                  );
                },
              }}
            />
            
          <View style={styles.monthlyTextContainer}>
              <Text style={styles.headerText1}>Monthly Calories</Text>
              <TouchableOpacity>
              <Icon name='md-ellipsis-horizontal-sharp' size={20} color="#2D2D2D"/>
              </TouchableOpacity>
            </View>
          </View>
      
          <BarChart
            barWidth={30}
            isAnimated={true}
            noOfSections={3}
            windowWidth={windowWidth}
            height={windowHeight/5}
            barBorderRadius={4}
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            frontColor={'#e1f1ed'}
            hideRules
            hideYAxisText={true}
            initialSpacing={6}
            disableScroll={true}
            xAxisLabelTextStyle={{
              fontSize:13,
              color: Colors.DARK_GREY,
              fontFamily:Fonts.POPPINS_REGULAR,
              alignSelf:'center'
            }}
            xAxisLabelTexts={{
              padding:10,
              marginTop:10,
              alignSelf:'center'
            }}
          />
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE
  },
  weelkyTextContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:windowHeight / 10,
    marginBottom:windowHeight / 50,
    zIndex:1,
  },
  monthlyTextContainer:{
    marginTop:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:windowHeight / 50,
    zIndex:1,
  },
  headerText1: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    color: Colors.BLACK,
  },
  headerContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:StatusBarHeight
  },
  headText:{
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 19,
    color: Colors.BLACK,
    alignSelf:'center'
  }
});

export default CaloriesBurnt;