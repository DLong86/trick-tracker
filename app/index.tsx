import { useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput } from "react-native";
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
			<TextInput
				placeholder="Trick Name"
				value={text}
				onChangeText={setText}
				style={styles.input}
			/>
			<TextInput
				placeholder="Video URL"
				value={videoLink}
				onChangeText={setVideoLink}
				style={styles.input}
			/>
			<Button title="Add Trick" onPress={addTrick} />
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
		padding: 16,
		// backgroundColor: "#fff",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginBottom: 10,
		borderRadius: 6,
		color: "#fff",
	},
});
