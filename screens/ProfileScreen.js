import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image, StatusBar, Animated, ScrollView, FlatList, SafeAreaView } from "react-native";
import firebase from "firebase";
import ItemBox from '../components/ItemBox';

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
	const [CONTENT, setCONTENT] = useState([[]]);
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
				c.forEach(t => {
					array.push({ key: t.key, val: t.val() });
				});
				setMails(array);

			});
	}, []);



	firebase.database().ref('messages').on('child_added', (data) => {
		if (data !== null && data !== undefined && !mails.find(m => m.key === data.key)) {
			const array = [...mails, { key: data.key, val: data.val() }];
			setMails(array);

		};

	});

	firebase.database().ref('messages').on("child_removed", function (snapshot) {
		if (snapshot !== null && snapshot !== undefined) {
			const array = mails.filter(c => c.key !== snapshot.key);
			setMails(array);
		}
	});


	function deleteMail(key) {
		let userRef = firebase.database().ref("messages/" + key);
		userRef.remove();
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					style={styles.tinyLogo}
					source={{ uri: props.navigation.getParam("photo") }}
				/>
				<Text style={styles.textHeader}>
					{`Hi, ${props.navigation.getParam("username")}`}
				</Text>
				<Button
					title="Sign out"
					onPress={() => props.navigation.navigate("Login")}
				/>
			</View>

			<SafeAreaView style={styles.container}>
				{mails.map(m => {

					return (
						<ItemBox data={m} handleDelete={(key) => deleteMail(key)}/>
					)
				})}
			</SafeAreaView>
			<StatusBar backgroundColor="aqua" barStyle="light-content" />
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
		marginBottom: 50,
	},
	textHeader: {
		fontSize: 25,
		color: "#e07a5f",
	},
	listMail: {
		flex: 1,
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
