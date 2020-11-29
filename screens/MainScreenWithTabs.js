import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image, StatusBar, Animated, ScrollView, FlatList, SafeAreaView } from "react-native";
import firebase from "firebase";
import ItemBox from '../components/ItemBox';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './BottomNavigator';

const MainScreenWithTabs = (props) => {
  return (
		<NavigationContainer>
		<MyTabs userName={props.navigation.getParam("username")} photo={props.navigation.getParam("photo")} login={() => props.navigation.navigate("Login")}/>
	</NavigationContainer>
	);
}

export default MainScreenWithTabs;