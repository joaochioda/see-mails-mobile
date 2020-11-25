import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image, StatusBar, Animated } from "react-native";
import MailList from "../components/mailList";
import firebase from "firebase";
import Swipeable from "react-native-gesture-handler/Swipeable";

const firebaseConfig = {
	apiKey: "AIzaSyDLbQeqLKddeUfRf_5VvaoJft1lRyxG998",
	authDomain: "portfolio-joao.firebaseapp.com",
	databaseURL: "https://portfolio-joao.firebaseio.com",
	projectId: "portfolio-joao",
	storageBucket: "portfolio-joao.appspot.com",
	messagingSenderId: "149462281641",
	appId:
		"149462281641-r23b58n15ima692ehr55fao69u98vck4.apps.googleusercontent.com",
};

const ProfileScreen = (props) => {
	const [mails, setMails] = useState([]);
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}

	useEffect(() => {
		const array = [];
		firebase
			.database()
			.ref("messages")
			.once("value")
			.then((c) => {
				c.forEach((t) => {
					array.push(t.val());
				});
				setMails(array);
			});
	}, []);

	//  firebase.database().ref('messages').limitToLast(1).on('child_added', (data) => {
	//   console.log('bbbbbbbbbbbb',data.val());
	//  });

	const LeftActions = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [0, 100],
			outputRange: [0,1],
			extrapolate: 'clamp'
		})
		
		return (
			<View style={styles.leftAction}>
				<Animated.Text style={[styles.actionText, { transform: [{scale}]}]}>Ver email</Animated.Text>
			</View>
		);
	};

	const RightActions = () => {
		return (
			<View style={styles.rightAction}>
				<Text style={styles.actionText}>Deletar email</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					style={styles.tinyLogo}
					source={{ uri: props.navigation.getParam("photo") }}
				/>
				<Text style={styles.textHeader}>
					{props.navigation.getParam("username")}
				</Text>
				<Button
					title="Sign out"
					onPress={() => props.navigation.navigate("Login")}
				/>
			</View>
			<View style={styles.listMail}>
				{mails.map((c, index) => {
					return (
            <View>
						<Swipeable
							renderLeftActions={LeftActions}
							renderRightActions={RightActions}
							onSwipeableLeftOpen={()=> console.log('oi')}
						>
							<MailList mail={c} key={index} />
						</Swipeable>
            </View>
					);
				})}

				<StatusBar backgroundColor="aqua" barStyle="light-content" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#3d405b",
		color: "white",
		paddingTop: 60,
		paddingLeft: 10,
	},
	tinyLogo: {
		width: 80,
		height: 80,
		borderRadius: 50,
		fontSize: 20,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	textHeader: {
		fontSize: 25,
		color: "#e07a5f",
	},
	listMail: {
		paddingTop: 75,
	},
	leftAction: {
		backgroundColor: "green",
		justifyContent: "center",
		flex: 1,
	},
	rightAction: {
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "flex-end",
		flex: 1,
	},
	actionText: {
		color: "#fff",
		fontWeight: "600",
		padding: 20,
	},
});

export default ProfileScreen;
