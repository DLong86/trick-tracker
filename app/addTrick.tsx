import { Colors } from "@/constants/Colors";
import type { Trick } from "@/types/Trick";
import { loadTricks, saveTricks } from "@/utils/storage";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

export default function AddTrickScreen() {
	const router = useRouter();
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const [name, setName] = useState("");
	const [video, setVideo] = useState("");

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, []);

	const handleAddTrick = async () => {
		if (!name.trim()) return;

		const existing: Trick[] = await loadTricks();

		const newTrick: Trick = {
			id: Date.now(),
			name: name.trim(),
			video: video.trim(),
			progress: "not started",
			dateAdded: new Date().toISOString(),
		};

		const updated = [...existing, newTrick];
		await saveTricks(updated);

		router.back(); // go back to TrickTracker screen
	};

	return (
		<ImageBackground
			source={require("../assets/images/stardust.png")}
			style={styles.background}
		>
			<Animated.View style={{ flex: 1, opacity: fadeAnim }}>
				<ScrollView contentContainerStyle={styles.container}>
					<Stack.Screen options={{ headerShown: false }} />
					<View style={styles.customHeader}>
						<Text style={styles.headerTitle}>Trick Tracker</Text>
					</View>

					<TextInput
						placeholder="Trick Name"
						value={name}
						onChangeText={setName}
						style={styles.input}
						placeholderTextColor="#666"
					/>

					<TextInput
						placeholder="Video URL"
						value={video}
						onChangeText={setVideo}
						style={styles.input}
						placeholderTextColor="#666"
					/>

					<TouchableOpacity style={styles.addButton} onPress={handleAddTrick}>
						<View style={styles.buttonContent}>
							<Text style={styles.addButtonText}>add trick</Text>
							<Image
								source={require("../assets/images/plus-hand-drawn-sign.png")}
								style={styles.icon}
							/>
						</View>
					</TouchableOpacity>
				</ScrollView>
			</Animated.View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		resizeMode: "cover",
		backgroundColor: Colors.light.background2,
	},
	container: {
		flexGrow: 1,
		padding: 16,
	},
	customHeader: {
		paddingTop: 4,
		paddingBottom: 10,
		fontSize: 28,
		marginBottom: 6,
	},
	headerTitle: {
		fontFamily: "PermanentMarker",
		fontSize: 30,
		color: Colors.light.text,
		transform: [{ rotate: "-2deg" }],
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
	addButton: {
		backgroundColor: Colors.light.accent1,
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 8,
	},
	addButtonText: {
		fontFamily: "GloriaHallelujah",
		fontSize: 16,
		color: "#222",
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
