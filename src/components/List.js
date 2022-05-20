import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Colors, Fonts } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons'
import { windowHeight } from "../utils/Dimenstions";
// definition of the Item, which will be rendered in the FlatList
const Item = ({ name }) => (
 <View>
    <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Icon name="md-chevron-forward" size={20} color={Colors.BLACK}/>
    </View>
   <View style={styles.line}/>
 </View>
);

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item name={item.name}  />;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name}  />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
 
    height: windowHeight / 2.3,
    width: "100%",
  },
  item: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.BLACK
  },
  line : {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: "100%",
  }
});