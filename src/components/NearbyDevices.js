import React,{useState,useEffect} from 'react';
import WifiManager from 'react-native-wifi-reborn';
import {
  View,
  Text,
  StyleSheet,
  FlatList,TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

let NearbyDevices = ({wifiState}) =>{

    let [nearbyNetworksList,setNearbyNetworks] = useState([]);

    useEffect(() => {
        WifiManager.loadWifiList().then(devices=>{
            // List Of Devices [Containing Only SSID]
            let devices_list = devices.map(device=>{
                return device.SSID;
            })
            setNearbyNetworks(devices_list);
            }).catch(err=>{
            console.log(err)
        })
    },)
    
    return (
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       
            </View>
        {wifiState ?
        <FlatList 
        data={nearbyNetworksList}
        renderItem={({item,index})=>(
          <TouchableOpacity onPress={()=>connectToNetwork(item,index)} key={index} style={{flexDirection:'row',marginTop:20}}>
            <Icon name="wifi" solid={true} color="#212121" size={20}></Icon>
            <Text style={{color:'#2D2D2D',fontWeight:'bold',fontSize:16,textAlignVertical:'bottom'}}> {item} </Text> 
          </TouchableOpacity>
        )}
        ></FlatList>: null}


        </View>
    )
}

export default NearbyDevices;

const style = StyleSheet.create({
    header:{
        backgroundColor:'#212121',
        flexDirection:'row',
        elevation:0.5,
        alignItems:'flex-end'
    },
    headerText:{
        color:"#fff",
        fontSize:18,
        fontWeight:'bold'
    },
    text:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:2,
        color:'red'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:2,
    }
})
