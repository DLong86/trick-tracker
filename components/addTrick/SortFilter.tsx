import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	showFocusedOnly: boolean;
	setShowFocusedOnly: React.Dispatch<React.SetStateAction<boolean>>;
	// sortBy: "dateAsc" | "dateDesc" | "nameAsc" | "nameDesc";
	// setSortBy: React.Dispatch<
	// 	React.SetStateAction<"dateAsc" | "dateDesc" | "nameAsc" | "nameDesc">
	// >;
};

export default function SortFilterControls({
	showFocusedOnly,
	setShowFocusedOnly,
}: // sortBy,
// setSortBy,
Props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.focusedButton}
				onPress={() => setShowFocusedOnly((prev) => !prev)}
			>
				<Text style={styles.buttonText}>
					{showFocusedOnly ? "Show All Tricks" : "Show Focused Only"}
				</Text>
			</TouchableOpacity>

			{/* <TouchableOpacity
				style={styles.button}
				onPress={() => {
					setSortBy((prev) => {
						if (prev === "dateDesc") return "dateAsc";
						if (prev === "dateAsc") return "nameAsc";
						if (prev === "nameAsc") return "nameDesc";
						return "dateDesc";
					});
				}}
			>
				<Text style={styles.buttonText}>
					Sort:{" "}
					{sortBy === "dateDesc"
						? "Date ↓"
						: sortBy === "dateAsc"
						? "Date ↑"
						: sortBy === "nameAsc"
						? "Name A→Z"
						: "Name Z→A"}
				</Text>
			</TouchableOpacity> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "space-between",
		marginBottom: 10,
		// gap: 8,
	},
	focusedButton: {
		backgroundColor: Colors.light.background2,
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 8,
	},
	button: {
		// backgroundColor: "#ddd",
		// alignItems: "center",
		borderRadius: 6,
		marginTop: 8,
	},
	buttonText: {
		fontFamily: "GloriaHallelujah",
		color: "#333",
		fontSize: 16,
	},
});
