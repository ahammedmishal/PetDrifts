import React from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import DeviceInfo from '../components/DeviceInfo';
import { Fonts,Images } from '../constants';
import { windowHeight, windowWidth} from '../utils/Dimenstions';


const DeviceStatus = () => {
  return (
    <View style={styles.container}>
     <StatusBar
        barStyle="dark-content" 
        backgroundColor={"#fff"}
        translucent
     />
      <View style={{flexDirection:'row'}}>
        <DeviceInfo
          title={'Battery'}
          title2={'67%'}
          source={Images.CHARGING}
        />
        <DeviceInfo
          title={'Network'}
          title2={'Wifi, Secured'}
          source={Images.WIFI}
        />
      </View>

      <View style={{flexDirection:'row'}}>
        <DeviceInfo
          title={'Last Sync'}
          title2={'Mar 27, 2022'}
          source={Images.REFRESH}
        />
        <DeviceInfo
          title={'Firmware'}
          title2={'JDQ34-2269...'}
          source={Images.CLOUDDOWNLOAD}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  }
});

export default DeviceStatus;