import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import type { Trick } from "../../types/Trick";

export default function TrickHeader({ trick }: { trick: Trick }) {
	return (
		<View>
			<Text style={[styles.title]}>{trick.name}</Text>

			<View>
				<Text style={styles.progressLabel}>{trick.progress}</Text>
			</View>

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
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontFamily: "PermanentMarker",
		fontSize: 28,
		color: "#222",
		transform: [{ rotate: "-2deg" }],
		paddingTop: 0,
		marginTop: -6,
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
		fontFamily: "PermanentMarker",
		fontSize: 18,
		color: "#222",
		marginBottom: 4,
	},
});
