import React from "react";
import { Button, Linking, StyleSheet, Switch, Text, View } from "react-native";
import type { Trick } from "../types/Trick";

type Props = {
	trick: Trick;
	tricks: Trick[];
	setTricks: React.Dispatch<React.SetStateAction<Trick[]>>;
};

export default function TrickCard({ trick, setTricks, tricks }: Props) {
	const toggle = (key: keyof Trick) => {
		const updated = tricks.map((t) =>
			t.id === trick.id ? { ...t, [key]: !t[key] } : t
		);
		setTricks(updated);
	};

	const deleteTrick = () => {
		setTricks(tricks.filter((t) => t.id !== trick.id));
	};

	return (
		<View style={[styles.card, trick.landed && styles.landed]}>
			<Text style={styles.title}>{trick.name}</Text>
			{trick.video ? (
				<Text style={styles.link} onPress={() => Linking.openURL(trick.video)}>
					Watch Video
				</Text>
			) : null}
			<View style={styles.row}>
				<Text>Attempted</Text>
				<Switch
					value={trick.attempted}
					onValueChange={() => toggle("attempted")}
				/>
			</View>
			<View style={styles.row}>
				<Text>Landed</Text>
				<Switch value={trick.landed} onValueChange={() => toggle("landed")} />
			</View>
			<Button title="Delete" color="red" onPress={deleteTrick} />
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		backgroundColor: "#fdfdfd",
		borderRadius: 8,
		marginBottom: 16,
		elevation: 2,
	},
	landed: {
		backgroundColor: "#d4edda", // light green
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	link: {
		color: "#007bff",
		textDecorationLine: "underline",
		marginVertical: 8,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 4,
	},
});
