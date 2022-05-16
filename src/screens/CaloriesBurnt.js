import React,{useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,StatusBar} from 'react-native';
import { Fonts,Images } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons'
import { windowHeight, windowWidth} from '../utils/Dimenstions';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";


const CaloriesBurnt = () => {
  
    const [lineData, setLineData] = useState([
      {value: 0, dataPointText: '0',label:'Mon'},
      {value: 200, dataPointText: '20',label:'Tue'},
      {value: 180, dataPointText: '18',label:'Wed'},
      {value: 350, dataPointText: '40',label:'Thu'},
      {value: 200, dataPointText: '20',label:'Fri'},
      {value: 80, dataPointText: '8',label:'Sat'},
      {value: 280, dataPointText: '28',label:'Sun'},
    ])

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
              backgroundColor={"#fff"}
              translucent
          />
          <View style={{paddingHorizontal:15}}>
            <View style={styles.weelkyTextContainer}>
              <Text style={styles.headerText1}>Weekly Calories</Text>
              <TouchableOpacity>
              <Icon name='md-ellipsis-horizontal-sharp' size={20} color="#2D2D2D"/>
              </TouchableOpacity>
            </View>
            <LineChart
              areaChart
              backgroundColor={"white"}
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
              color1="#33BB98"
              startFillColor1="#3D504B"
              startFillColor2="#3D504B"
              endFillColor1="#3D504B"
              startOpacity={0.1}
              endOpacity={0}
              noOfSections={3}
              yAxisThickness={0}
              xAxisLabelTextStyle={{
                fontSize:13,
                color:'#565656',
              }}
              rulesType="solid"
              rulesColor="#EEEEEE"
              rulesThickness={2}
              xAxisColor="lightgray"
              scrollToEnd={true}
              showScrollIndicator={true}
              pointerConfig={{
                pointerStripUptoDataPoint: true,
                pointerStripColor: '#33BB98',
                pointerStripWidth:5,
                pointerStripHeight: 40,
                strokeDashArray: [11, 11],
                pointerColor: '#679D8F',
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
                        backgroundColor: '#679D8F',
                        borderRadius: 4,
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:8,
                      }}>
                      <Text style={{color: 'white', fontWeight:'bold',fontSize:16}}>{items[0].value}</Text>
                      <Text style={{color: 'white',fontSize:12,fontFamily:Fonts.POPPINS_REGULAR}}>{"Kcal"}</Text>
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
            barWidth={29}
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
            initialSpacing={0}
            disableScroll={true}
          />
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  },
  weelkyTextContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:windowHeight / 50,
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
    color: '#2D2D2D',
  },
});

export default CaloriesBurnt;