import React from "react";
import { View, StyleSheet, Button } from "react-native";

import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
	"149462281641-3l7d15brug5uccqt75jlhe00kaf46evo.apps.googleusercontent.com";
const ANDROID_CLIENT_ID = "your-android-client-id";

const LoginScreen = (props) => {
	const signInWithGoogle = async () => {
		try {
			// const result = await Google.logInAsync({
			//   iosClientId: IOS_CLIENT_ID,
			//   androidClientId: ANDROID_CLIENT_ID,
			//   scopes: ["profile", "email"]
			// });

			const result = {
				type: "success",
				user: {
					email: "joaobenetasso@gmail.com",
					givenName: "joao",
					photoUrl:
						"https://lh3.googleusercontent.com/a-/AOh14GhbexJOJtG1cYkR5tUzK5r09oxbIVLEYY--WolklA=s96-c",
				},
			};

			if (result.type === "success") {
				if (result.user.email === "joaobenetasso@gmail.com") {
					props.navigation.navigate("MainScreenWithTabs", {
						username: result.user.givenName,
						photo: result.user.photoUrl,
					}); //after Google login redirect to Profile
					return result.accessToken;
				} else {
					return { cancelled: true };
				}
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	};

	return (
		<View style={styles.container}>
			<Button title="Login with Google" onPress={() => signInWithGoogle()} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default LoginScreen;
