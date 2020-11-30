import React from "react";
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import ItemBox from '../components/ItemBox';
import Header from '../components/Header';



const UnreadedMail = (props) => {

	return (
		<View style={styles.container}>

			<Header photo={props.photo} login={props.login} userName={props.userName}/>
			<SafeAreaView style={styles.container}>
				{props.mails.map(m => {

					return (
						<ItemBox key={m.key} data={m} handleDelete={(key) => props.deleteMail(key)} page={'unread'}  handleRead={(item) => props.handleRead(item)}/>
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

export default UnreadedMail;
