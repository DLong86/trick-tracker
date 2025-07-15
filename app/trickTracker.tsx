import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	Animated,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import AddTrickSection from "../components/addTrick/AddTrickSection";
import TrickCard from "../components/TrickCard/TrickCard";
import type { Trick } from "../types/Trick";
import { loadTricks, saveTricks } from "../utils/storage";

export default function TrickTracker() {
	const [tricks, setTricks] = useState<Trick[]>([]);
	const [text, setText] = useState("");
	const [videoLink, setVideoLink] = useState("");
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [searchQuery, setSearchQuery] = useState("");
	const [showFocusedOnly, setShowFocusedOnly] = useState(false);

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, []);

	useFocusEffect(
		useCallback(() => {
			console.log("TrickTracker focused");

			const fetchTricks = async () => {
				const savedTricks = await loadTricks();
				setTricks(savedTricks);
			};
			fetchTricks();
		}, [])
	);

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
				progress: "not started",
				dateAdded: new Date().toISOString(),
			},
		]);
		setText("");
		setVideoLink("");
	};

	const filteredTricks = tricks.filter(
		(trick) =>
			trick.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
			(!showFocusedOnly || trick.focused)
	);

	const toggleFocus = (id: number) => {
		const updatedTricks = tricks.map((t) =>
			t.id === id ? { ...t, focused: !t.focused } : t
		);
		setTricks(updatedTricks);
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

					<AddTrickSection
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						showFocusedOnly={showFocusedOnly}
						setShowFocusedOnly={setShowFocusedOnly}
						onAddTrick={(name, video) => {
							setTricks([
								...tricks,
								{
									id: Date.now(),
									name,
									video,
									progress: "not started",
									dateAdded: new Date().toISOString(),
									focused: false,
								},
							]);
						}}
					/>

					{filteredTricks.map((trick) => (
						<TrickCard
							key={trick.id}
							trick={trick}
							tricks={tricks}
							setTricks={setTricks}
							toggleFocus={toggleFocus}
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
	},
	customHeader: {
		paddingTop: 4,
		paddingBottom: 10,
		fontSize: 28,
	},
	headerTitle: {
		fontFamily: "PermanentMarker",
		fontSize: 30,
		color: Colors.light.text,
		transform: [{ rotate: "-2deg" }],
	},
});
