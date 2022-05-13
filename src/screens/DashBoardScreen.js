import React, {useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Image
  } from "react-native";
import { Fonts,Images } from '../constants';
import { windowHeight, windowWidth} from '../utils/Dimenstions';
import { DonutChart } from "react-native-circular-chart";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FormButton from "../components/FormButton";
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const DashBoardScreen = () => {
    const [data, setData] = useState([
        {name: "Blue" ,value:350,color:'#FBA304'},
        {name: "Red" ,value:150,color:'#5D7E76'},
        {name: "Red" ,value:250,color:'#E3E3E3'},
    ])

const caloriesGraph = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const restGraph = [200, 10, 40, 95, -4, -24, 205, 91, 35, 53, -53, 24, 250, 300, 300]

  return (
    <View style={styles.container}>
     <StatusBar
       barStyle="dark-content" 
       backgroundColor={"#fff"}
       translucent
     />
     <View style={{}}>
        <View style={styles.titileContainer}>
            <Text style={styles.headerText}>Feeling like Athlete!</Text>
        </View>
        
        <View style={styles.sectionWrapper}>
            <DonutChart
                data={data}
                strokeWidth={15}
                radius={100}
                containerWidth={ 370 - 10 * 2}
                containerHeight={130 * 2}
                type="round"
                startAngle={0}
                endAngle={360}
                animationType="slide"
                labelValueStyle={{
                    color: '#f7f7f7',
                }}
                labelTitleStyle={{
                    color: '#f7f7f7',
                }}
                containerStyle={{
                    backgroundColor:'#f7f7f7',
                    borderRadius: 10,
                }}
            />
            <Image source={Images.BURN} style={{width:40,height:40,position:'absolute',resizeMode:'contain'}}/>

            <View style={styles.sectionConatiner}>
              <View style={styles.sectionTitleConatiner}>
               <Icon name="moon-full" size={15} color='#FBA304'/>
               <Text style={styles.sectionTitle}>Calories</Text>
              </View>

              <View style={styles.sectionTitleConatiner}>
               <Icon name="moon-full" size={15} color='#6F958B'/>
               <Text style={styles.sectionTitle}>Rest Hours</Text>
              </View>
            </View>
        </View>

        {/* Line Graph */}
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
          
          <View style={styles.ChartConatinerLeft}>
            <Text style={styles.lineGraphText}>350 Kcal</Text>
            <LineChart
              style={{height: 95,width:100}}
              data={caloriesGraph}
              contentInset={{ top: 50, bottom: 30 }}
              curve={shape.curveNatural}
              svg={{  strokeWidth: 3, stroke: 'white' }}
            />
            <Text style={styles.lineGraphText2}>Calories</Text>
          </View>

          <View style={styles.ChartConatinerRight}>
            <Text style={styles.lineGraphText}>2 Hours</Text>
            <LineChart
              style={{height: 95,width:100}}
              data={restGraph}
              contentInset={{ top: 50, bottom: 30 }}
              curve={shape.curveNatural}
              svg={{  strokeWidth: 3, stroke: 'white' }}
            />
            <Text style={styles.lineGraphText2}>Rest</Text>
          </View>

        </View>
     </View>
        <FormButton
            buttonTitle="Device"
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff',
      padding: 20,
      alignItems:'center',
      justifyContent:'space-between'
    },
    titileContainer: {
      marginBottom:  windowHeight / 80,
    },
    headerText: {
      alignSelf:'center',
      fontFamily: Fonts.POPPINS_MEDIUM,
      fontSize: 23,
      color: '#2D2D2D',
    },
    ChartConatinerLeft: {
      width:165,
      height:160,
      backgroundColor:'#FBA304',
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center'
    },
    ChartConatinerRight: {
      width:165,
      height:160,
      backgroundColor:'#77807D',
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center'
    },
    sectionWrapper: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      backgroundColor: "#f7f7f7",
      shadowColor: "#000",
      height: windowHeight / 2.5,
      marginBottom:10
    },
    sectionConatiner: {
      backgroundColor:'#f7f7f7',
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
      color:'#565656'
    },
    lineGraphText :{
      color:'#ffffff',
      fontFamily:Fonts.POPPINS_MEDIUM,
      fontSize:16,
    },
    lineGraphText2 :{
      color:'#ffffff',
      fontFamily:Fonts.POPPINS_SEMI_BOLD,
      fontSize:17,
    },
  });
export default DashBoardScreen;