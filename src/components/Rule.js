import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ruler from 'react-native-animated-ruler';

const Rule = () => {
  return (
    <Ruler
    style={{borderBottomWidth:2}}
    width={350}
    height={50}
    vertical={false}
    minimum={122}
    maximum={222}
    segmentWidth={2}
    segmentSpacing={10}
    indicatorColor='#4552CB'
    indicatorWidth={100}
    indicatorHeight={20}
    indicatorBottom={0}
    step={10}
    stepColor='#333333'
    stepHeight={20} //big theri heieght
    normalColor='#2D2D2D' //thari color
    normalHeight={10} //thari height
    backgroundColor='#FFFFFF'
    numberFontFamily='System'
    numberSize={20}
    numberColor='#ffff'
    unit=''
    unitSize={15}
    unitBottom={20}
    unitColor='#888888'
    unitFontFamily='System'
  />
  );
};


export default Rule;