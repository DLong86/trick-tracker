import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
	showFocusedOnly: boolean;
	setShowFocusedOnly: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SortFilterControls({
	showFocusedOnly,
	setShowFocusedOnly,
}: Props) {
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	focusedButton: {
		backgroundColor: Colors.light.background2,
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 8,
	},
	button: {
		borderRadius: 6,
		marginTop: 8,
	},
	buttonText: {
		fontFamily: "GloriaHallelujah",
		color: "#333",
		fontSize: 16,
	},
});
