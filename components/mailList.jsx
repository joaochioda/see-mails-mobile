import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
// import { GestureHandler } from 'expo';
// const { Swipeable } = GestureHandler;

const MailList = ({ mail }) => {
	return (
		<View style={styles.box}>
			<Entypo name="mail" size={24} color="#e07a5f" />
			<Text style={styles.text}>{mail.subject}</Text>
			<FontAwesome5 name="trash" size={24} color="#e07a5f" />
		</View>
	);
};

const styles = StyleSheet.create({

	box: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
        backgroundColor: "#3d405b",
        height: 75
	},
	text: {
		color: "#e07a5f",
		fontSize: 16,
		paddingLeft: 5,
		paddingRight: 5,
	},
});

export default MailList;
