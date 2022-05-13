import React from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import DeviceInfo from '../components/DeviceInfo';
import { Fonts,Images } from '../constants';
import { windowHeight, windowWidth} from '../utils/Dimenstions';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";


const CaloriesBurnt = () => {
    // const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]
    const labels= ["January", "February", "March", "April", "May", "June"]
    const data1 = [
        {value: 70},
        {value: 36},
        {value: 50},
        {value: 40},
        {value: 18},
        {value: 38},
      ];
      const data2 = [
        {value: 50},
        {value: 10},
        {value: 45},
        {value: 30},
        {value: 45},
        {value: 18},
      ];
      return (
        <View
         >
          <LineChart
            areaChart
            curved
            data={data2}
            hideDataPoints
            spacing={68}
            color1="#8a56ce"
            color2="#56acce"
            startFillColor1="#8a56ce"
            startFillColor2="#56acce"
            endFillColor1="#8a56ce"
            endFillColor2="#56acce"
            startOpacity={0.9}
            endOpacity={0.2}
            initialSpacing={0}
            noOfSections={4}
            yAxisColor="white"
            yAxisThickness={0}
            rulesType="solid"
            rulesColor="gray"
            yAxisTextStyle={{color: 'gray'}}
            yAxisLabelSuffix="%"
            xAxisColor="lightgray"
            pointerConfig={{
              pointerStripUptoDataPoint: true,
              pointerStripColor: 'lightgray',
              pointerStripWidth: 2,
              strokeDashArray: [2, 5],
              pointerColor: 'lightgray',
              radius: 4,
              pointerLabelWidth: 100,
              pointerLabelHeight: 120,
              pointerLabelComponent: items => {
                return (
                  <View
                    style={{
                      height: 120,
                      width: 100,
                      backgroundColor: '#282C3E',
                      borderRadius: 4,
                      justifyContent:'center',
                      paddingLeft:16,
                    }}>
                    <Text style={{color: 'lightgray',fontSize:12}}>{2018}</Text>
                    <Text style={{color: 'white', fontWeight:'bold'}}>{items[0].value}</Text>
                    <Text style={{color: 'lightgray',fontSize:12,marginTop:12}}>{2019}</Text>
                    <Text style={{color: 'white', fontWeight:'bold'}}>{items[1].value}</Text>
                  </View>
                );
              },
            }}
          />
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  }
});

export default CaloriesBurnt;