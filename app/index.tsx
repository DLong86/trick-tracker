import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import TrickCard from "../components/TrickCard";
import type { Trick } from "../types/Trick";

export default function IndexScreen() {
	const [tricks, setTricks] = useState<Trick[]>([]);
	const [text, setText] = useState("");
	const [videoLink, setVideoLink] = useState("");

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
			},
		]);
		setText("");
		setVideoLink("");
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Trick Tracker</Text>
			<TextInput
				placeholder="Trick Name"
				value={text}
				onChangeText={setText}
				style={styles.input}
				placeholderTextColor={"#fff"}
			/>
			<TextInput
				placeholder="Video URL"
				value={videoLink}
				onChangeText={setVideoLink}
				style={styles.input}
				placeholderTextColor={"#fff"}
			/>
			<TouchableOpacity style={styles.button} onPress={addTrick}>
				<Text style={styles.buttonText}>Add Trick</Text>
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
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
		backgroundColor: Colors.light.background,
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
		fontFamily: "SpaceMono",
		fontWeight: "bold",
		fontSize: 16,
		color: "#fff",
	},
	input: {
		borderWidth: 2,
		borderColor: Colors.light.icon,
		backgroundColor: Colors.light.accent3,
		color: Colors.light.text,
		padding: 10,
		marginBottom: 10,
		borderRadius: 6,
	},
});
