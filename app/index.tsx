import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function HomeScreen() {
	const router = useRouter();

	return (
		<ImageBackground
			source={require("../assets/images/stardust.png")}
			style={styles.background}
		>
			<Stack.Screen options={{ headerShown: false }} />
			<View style={styles.container}>
				<TouchableOpacity onPress={() => router.push("/trickTracker")}>
					<View style={styles.tappableContent}>
						<Image
							source={require("../assets/images/skull.png")}
							style={styles.icon}
						/>
						<Text style={styles.title}>Trick Tracker</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push("/trickTracker")}>
					<Text style={styles.enterText}>enter</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		resizeMode: "cover",
		backgroundColor: Colors.light.accent3,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	tappableContent: {
		alignItems: "center",
	},
	icon: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	title: {
		fontFamily: "PermanentMarker",
		fontSize: 36,
		marginBottom: 10,
		color: "#222",
	},
	enterText: {
		fontFamily: "GloriaHallelujah",
		fontSize: 22,
		color: Colors.light.accent1,
	},
});
