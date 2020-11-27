import React, { Component, Fragment, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image, StatusBar, Animated, ScrollView } from "react-native";
import MailList from "../components/mailList";
import firebase from "firebase";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { ExpandableListView } from 'react-native-expandable-listview';

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
				mountContent(array);
			});
	}, []);

	const mountContent = (arr) => {
		let items = [];
		arr.forEach((array, idx) => {
			items[idx] = [{
				id: array.key, categoryName: array.val.subject,

				subCategory: [

					{ id: idx + 1, name: array.val.message },
					{
						customInnerItem: (
							<View style={{ flexDirection: 'column', backgroundColor: "#3d405b" }}>
								<Text style={{ color: '#e07a5f', margin: 10, fontWeight: "bold" }}>{array.val.name}</Text>
								<View style={{ flexDirection: 'column', marginLeft: 10, backgroundColor: "#3d405b" }}>

									<Text style={{ color: '#e07a5f', fontWeight: "bold" }} >{array.val.email}</Text>
								</View>
							</View>
						),
						id: '1',
						name: '',
					}
				]
			}
			];
		}
		);
		setCONTENT(items);
		setMails(arr);

	}

	firebase.database().ref('messages').on('child_added', (data) => {
		if (data !== null && data !== undefined && !mails.find(m => m.key === data.key)) {
			const array = [...mails, { key: data.key, val: data.val() }];
			mountContent(array);
		};

	});

	firebase.database().ref('messages').on("child_removed", function (snapshot) {
		if (snapshot !== null && snapshot !== undefined) {
			const array = mails.filter(c => c.key !== snapshot.key);
			mountContent(array);
		}
	});

	const LeftActions = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [0, 100],
			outputRange: [0, 1],
			extrapolate: 'clamp'
		})

		return (
			<View style={styles.leftAction}>
				<Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Ver email</Animated.Text>
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

	function handleItemClick({ index }) {
	};

	function handleInnerItemClick({ innerIndex, item, itemIndex }) {
	};

	function deleteMail(key) {
		let userRef = firebase.database().ref("messages/" + key[0].id);
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
					{props.navigation.getParam("username")}
				</Text>
				<Button
					title="Sign out"
					onPress={() => props.navigation.navigate("Login")}
				/>
			</View>
			<View style={styles.listMail}>
				<ScrollView>
					{CONTENT.map((c, idx) =>
						<View>

							<Swipeable
								renderLeftActions={LeftActions}
								renderRightActions={RightActions}
								onSwipeableLeftOpen={() => console.log('oi')}
								onSwipeableRightOpen={() => deleteMail(CONTENT[idx])}
							>

								<ExpandableListView
									data={CONTENT[idx]} // required
									onInnerItemClick={handleInnerItemClick}
									onItemClick={handleItemClick}
									customChevron={{}}
									itemContainerStyle={{ backgroundColor: "#3d405b" }}
									itemLabelStyle={{ color: 'white' }}
									innerItemLabelStyle={{ color: '#e07a5f', backgroundColor: "#3d405b" }}
								/>
							</Swipeable>
						</View>
					)}
				</ScrollView>

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
