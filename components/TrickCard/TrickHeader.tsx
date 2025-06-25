import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import type { Trick } from "../../types/Trick";

export default function TrickHeader({ trick }: { trick: Trick }) {
	return (
		<View>
			<Text style={[styles.title]}>{trick.name}</Text>

			{trick.video ? (
				<View style={styles.linkRow}>
					<Image
						source={require("../../assets/images/photo-camera-hand-drawn-tool.png")}
						style={styles.linkIcon}
					/>
					<Text
						style={styles.link}
						onPress={() => Linking.openURL(trick.video)}
					>
						Watch Video
					</Text>
				</View>
			) : null}
			<View>
				<Text style={styles.progressLabel}>{trick.progress}</Text>
			</View>
			<Text style={styles.dateText}>
				Added: {new Date(trick.dateAdded).toLocaleDateString()}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	// headerRow: {
	// 	flexDirection: "row",
	// 	// alignItems: "center",
	// 	justifyContent: "space-between",
	// },
	title: {
		fontFamily: "PermanentMarker",
		fontSize: 24,
		color: "#222",
		transform: [{ rotate: "-2deg" }],
		// marginBottom: 8,
		paddingTop: 0,
		marginTop: 0,
	},

	linkRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 6,
	},
	link: {
		fontFamily: "SpaceMono",
		color: Colors.light.accent1,
		textDecorationLine: "underline",
		marginLeft: 6,
	},
	linkIcon: {
		width: 20,
		height: 20,
	},
	progressLabel: {
		fontFamily: "GloriaHallelujah",
		fontSize: 18,
		color: "#222",
		marginBottom: 4,
	},
	dateText: { fontFamily: "GloriaHallelujah", fontSize: 12 },
});
