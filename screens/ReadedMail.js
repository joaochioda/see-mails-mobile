import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image, StatusBar, Animated, ScrollView, FlatList, SafeAreaView } from "react-native";
import firebase from "firebase";
import ItemBox from '../components/ItemBox';
import Header from '../components/Header';

const ReadedMail = (props) => {
    return (
        <View style={styles.container}>

            <Header photo={props.photo} login={props.login} userName={props.userName} />
            <Text>Emails lidos</Text>
        </View>
    )
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#3d405b",
		color: "white",
		paddingTop: 60,
		paddingLeft: 10,
    },
})

export default ReadedMail;