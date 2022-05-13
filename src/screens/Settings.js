import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,StatusBar
} from "react-native";
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { Fonts } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons'
import FormButton from "../components/FormButton";

const Settings = () => {
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

//   const Action = ({title,icon}) =>{
//     return(
//         <View style={styles.action}>
//             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//                 <Text style={styles.heading}>Account</Text>
//                 <Icon name="md-chevron-forward" size={20} color="black"/>
//             </View>
//         </View>
//     )
//   }

  return (
    <View style={styles.container}>
           <StatusBar
        barStyle="dark-content" 
        backgroundColor={"#fff"}
        translucent
     />
     <View>
      <SearchBar
       searchPhrase={searchPhrase}
       setSearchPhrase={setSearchPhrase}
       clicked={clicked}
       setClicked={setClicked}
      />
      <Text style={styles.title}>GENERAL SETTINGS</Text>

      <List
        searchPhrase={searchPhrase}
        data={data}
        setClicked={setClicked}
      />
    </View> 

    <FormButton
        buttonTitle="Save"
     />

    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    padding: 20,
    justifyContent:'space-between'
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
  }
});