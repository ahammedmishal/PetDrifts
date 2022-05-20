import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons  from  'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import { Colors, Fonts } from "../constants";
  
const CheckBox = (props) => {

    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress}>
                {
                    props.isChecked ?
                    <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={18} color="#000" />
                    :
                    <Feather name="check-circle" size={18} color={Colors.PRIMARY}/>
                }
            </Pressable>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.title2}>Terms and Conditions.</Text>
            </View>
        </View>
    );
};
  
export default CheckBox;
  
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 13,
        color: "#000",
        marginLeft: 5,
        fontFamily: Fonts.POPPINS_REGULAR,
    },
    title2: {
      fontSize: 13,
      color: Colors.PRIMARY,
      marginLeft: 30,
      fontFamily: Fonts.POPPINS_SEMI_BOLD,
    },
});
