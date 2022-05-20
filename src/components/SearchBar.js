import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts } from "../constants";

const SearchBar = (props) => {
  return (
    <View style={styles.container}>
    <View
      style={
        !props.clicked
          ? styles.searchBar__unclicked
          : styles.searchBar__clicked
      }
    >
      <TextInput
         style={
            !props.clicked
              ? styles.input_unclicked
              : styles.input_clicked
          }
        placeholder="Search..."
        placeholderTextColor={ Colors.DARK_GREY }
        value={props.searchPhrase}
        onChangeText={props.setSearchPhrase}
        onFocus={() => {
            props.setClicked(true);
        }}
      />
      {!props.clicked && (
      <Feather
          name="search"
          size={20}
          color={ Colors.DARK_GREY }
      />
      )}
      
      {props.clicked && (
        <Feather name="x" size={20} color={ Colors.DARK_GREY } onPress={() => {
            props.setSearchPhrase(""),
            Keyboard.dismiss();
            props.setClicked(false);
        }}/>
      )}
    </View>
  </View>
  );
};


export default SearchBar;

const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
    },
    searchBar__unclicked: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: "#f3f3f3",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    searchBar__clicked: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: "#f3f3f3",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    input_unclicked: {
        fontSize: 13,
        width: "88%",
        color: Colors.BLACK,
        fontFamily:Fonts.POPPINS_REGULAR
    },
    input_clicked: {
        fontSize: 13,
        width: "88%",
        color: Colors.BLACK,
        fontFamily:Fonts.POPPINS_REGULAR
    },
  });