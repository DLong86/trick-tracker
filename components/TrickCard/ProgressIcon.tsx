import useProgressIcons from "@/hooks/useProgressIcons";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import type { Trick } from "../../types/Trick";

export default function ProgressIcon({
	trick,
	scaleAnim,
}: {
	trick: Trick;
	scaleAnim: Animated.Value;
}) {
	const progressIcons = useProgressIcons();
	return (
		<View style={styles.row}>
			<Animated.Image
				source={progressIcons[trick.progress]}
				style={[styles.icon, { transform: [{ scale: scaleAnim }] }]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	icon: {
		position: "absolute",
		width: 35,
		height: 35,
		top: 0,
		right: 0,
		tintColor: "#222",
	},
	label: {
		fontFamily: "GloriaHallelujah",
		fontSize: 18,
		color: "#222",
	},
});
