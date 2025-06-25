import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Animated,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import TrickCard from "../components/TrickCard/TrickCard";
import type { Trick } from "../types/Trick";
import { loadTricks, saveTricks } from "../utils/storage";

export default function TrickTracker() {
	const [tricks, setTricks] = useState<Trick[]>([]);
	const [text, setText] = useState("");
	const [videoLink, setVideoLink] = useState("");
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, []);

	// useEffect(() => {
	// 	StatusBar.style("dark-content");
	// }, []);

	// load tricks when starting the app
	useEffect(() => {
		(async () => {
			const savedTricks = await loadTricks();
			setTricks(savedTricks);
		})();
	}, []);

	// save tricks when there is a change
	useEffect(() => {
		saveTricks(tricks);
	}, [tricks]);

	const addTrick = () => {
		if (text.trim() === "") return;
		setTricks([
			...tricks,
			{
				id: Date.now(),
				name: text,
				video: videoLink,
				attempted: false,
				landed: false,
				progress: "not started",
				dateAdded: new Date().toISOString(),
				// tilt: (Math.random() * 4 - 2).toFixed(1),
			},
		]);
		setText("");
		setVideoLink("");
	};

	return (
		<ImageBackground
			source={require("../assets/images/stardust.png")}
			style={styles.background}
		>
			{/* <StatusBar style="dark" backgroundColor={Colors.light.background} /> */}
			<Animated.View style={{ flex: 1, opacity: fadeAnim }}>
				<ScrollView contentContainerStyle={styles.container}>
					<Stack.Screen options={{ headerShown: false }} />
					<View style={styles.customHeader}>
						<Text style={styles.headerTitle}>Trick Tracker</Text>
					</View>
					{/* <Text style={styles.title}>Trick Tracker</Text> */}

					<TextInput
						placeholder="Trick Name"
						value={text}
						onChangeText={setText}
						style={styles.input}
						placeholderTextColor={"#666"}
					/>
					<TextInput
						placeholder="Video URL"
						value={videoLink}
						onChangeText={setVideoLink}
						style={styles.input}
						placeholderTextColor={"#666"}
					/>
					<TouchableOpacity style={styles.button} onPress={addTrick}>
						{/* <Text style={styles.buttonText}>Add Trick</Text> */}
						<View style={styles.buttonContent}>
							<Text style={styles.buttonText}>Add Trick</Text>
							<Image
								source={require("../assets/images/plus-hand-drawn-sign.png")}
								style={styles.icon}
							/>
						</View>
					</TouchableOpacity>
					{tricks.map((trick) => (
						<TrickCard
							key={trick.id}
							trick={trick}
							tricks={tricks}
							setTricks={setTricks}
						/>
					))}
				</ScrollView>
			</Animated.View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		resizeMode: "cover",
		backgroundColor: Colors.light.background,
	},
	container: {
		flexGrow: 1,
		padding: 16,
		// backgroundColor: Colors.light.background,
	},
	customHeader: {
		// backgroundColor: Colors.light.background,
		paddingTop: 4,
		paddingBottom: 10,
		fontSize: 28,
	},
	headerTitle: {
		fontFamily: "PermanentMarker",
		fontSize: 30,
		color: Colors.light.text,
		transform: [{ rotate: `${Math.random() * 2 - 2}deg` }],
	},

	title: {
		fontFamily: "PermanentMarker",
		fontSize: 28,
		marginBottom: 16,
		color: Colors.light.text,
	},
	button: {
		backgroundColor: Colors.light.accent1,
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
	},
	buttonText: {
		fontFamily: "GloriaHallelujah",
		fontWeight: "bold",
		fontSize: 16,
		color: "#222",
	},
	input: {
		borderWidth: 2,
		borderColor: Colors.light.icon,
		backgroundColor: Colors.light.accent3,
		color: "#222",
		padding: 10,
		marginBottom: 10,
		borderRadius: 6,
		fontFamily: "GloriaHallelujah",
	},
	buttonContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 20,
		height: 20,
		marginLeft: 8,
	},
});
