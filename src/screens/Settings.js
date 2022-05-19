import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,StatusBar,Image,TouchableOpacity
} from "react-native";
import {Avatar} from 'react-native-paper';
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { Fonts,Images} from "../constants";
import Icon from 'react-native-vector-icons/Ionicons'
import FormButton from "../components/FormButton";
import { StatusBarHeight } from "../utils/Dimenstions";

const Settings = ({navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const [data, setData] = useState([
    {
        "id": "1",
        "name": "Account",
    },
    {
        "id": "2",
        "name": "Theme",
    },
    {
        "id": "3",
        "name": "Push Notifications",
    },
    {
        "id": "4",
        "name": "Add a Device",
    },
    {
        "id": "5",
        "name": "Help & Support",  
    },
    {
        "id": "6",
        "name": "Privacy Policy",  
    },
    {
        "id": "7",
        "name": "Terms & Conditions",    
    },
  ])

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content" 
        backgroundColor="rgba(0, 0, 0, 0.20)"
        translucent
     />

     <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={Images.MENU} style={{width:25,height:20}}/>
        </TouchableOpacity>
        <Text style={styles.headText} >Settings</Text>
        <TouchableOpacity
        
          onPress={() => {console.log('cliked')}}>
          <Avatar.Image
            source={Images.USERAVATAR}
            size={40}
          />
        </TouchableOpacity>
      </View>

    <View style={{marginTop:20}}>
      <SearchBar
       searchPhrase={searchPhrase}
       setSearchPhrase={setSearchPhrase}
       clicked={clicked}
       setClicked={setClicked}
      />
    </View> 

    <Text style={styles.title}>GENERAL SETTINGS</Text>
    <View style={{justifyContent:'space-between',flex:1}}>
      <List
        searchPhrase={searchPhrase}
        data={data}
        setClicked={setClicked}
      />
      <FormButton
        buttonTitle="Save"
      />
    </View>

    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    padding: 20,
 
  },
  title: {
    marginTop: 20,
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color:'#2D2D2D',
  },
  action: {
    marginTop:25
  },
  heading:{
    fontSize: 16,
    marginTop: 5,
    fontFamily: Fonts.POPPINS_REGULAR,
    color:'#2D2D2D',
  },
  line : {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: "100%",
  },
  headerContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:StatusBarHeight
  },
  headText:{
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 18,
    color: '#2D2D2D',
    alignSelf:'center'
  }
});