import { Colors } from "@/constants/Colors";
import React from "react";
import {
	Linking,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
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
				<Text style={styles.switchLabel}>Attempted</Text>
				<Switch
					value={trick.attempted}
					onValueChange={() => toggle("attempted")}
				/>
			</View>
			<View style={styles.row}>
				<Text style={styles.switchLabel}>Landed</Text>
				<Switch value={trick.landed} onValueChange={() => toggle("landed")} />
			</View>
			<TouchableOpacity style={styles.deleteButton} onPress={deleteTrick}>
				<Text style={styles.deleteButtonText}>Delete</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		backgroundColor: "#fefae0", // paper yellow
		borderRadius: 12,
		marginBottom: 16,
		borderWidth: 2,
		borderColor: "#000", // bold black border
		shadowColor: "#000",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},

	landed: {
		backgroundColor: Colors.light.accent2, // light green when landed
	},

	title: {
		fontFamily: "PermanentMarker",
		fontSize: 20,
		color: "#222",
		marginBottom: 8,
	},

	link: {
		fontFamily: "SpaceMono",
		color: "#00ffff", // aqua
		textDecorationLine: "underline",
		marginVertical: 8,
	},

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 6,
	},

	switchLabel: {
		fontFamily: "GloriaHallelujah",
		color: "#222",
		fontSize: 16,
	},

	deleteButton: {
		marginTop: 10,
		backgroundColor: "#ff69b4", // hot pink
		borderRadius: 8,
		padding: 10,
		alignItems: "center",
	},

	deleteButtonText: {
		color: "#000",
		fontFamily: "SpaceMono",
		fontWeight: "bold",
	},
});
