import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import type { Trick } from "../types/Trick";
import NoteModal from "./NotesModal";

type Props = {
	trick: Trick;
	tricks: Trick[];
	setTricks: React.Dispatch<React.SetStateAction<Trick[]>>;
};

const progressIcons: { [key in Trick["progress"]]: any } = {
	"not started": require("../assets/images/idea.png"),
	attempted: require("../assets/images/flash.png"),
	trying: require("../assets/images/cone.png"),
	landed: require("../assets/images/bomb.png"),
	"on lock": require("../assets/images/trophy.png"),
};

export default function TrickCard({ trick, setTricks, tricks }: Props) {
	const [expanded, setExpanded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const scaleAnim = useRef(new Animated.Value(1)).current;

	// Animate on progress change
	useEffect(() => {
		Animated.sequence([
			Animated.timing(scaleAnim, {
				toValue: 1.2,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 150,
				useNativeDriver: true,
			}),
		]).start();
	}, [trick.progress]);

	const toggle = (key: keyof Trick) => {
		const updated = tricks.map((t) =>
			t.id === trick.id ? { ...t, [key]: !t[key] } : t
		);
		setTricks(updated);
	};

	const updateProgress = (newStatus: Trick["progress"]) => {
		const updated = tricks.map((t) =>
			t.id === trick.id ? { ...t, progress: newStatus } : t
		);
		setTricks(updated);
	};

	const saveNote = (note: string) => {
		const updated = tricks.map((t) =>
			t.id === trick.id ? { ...t, notes: note } : t
		);
		setTricks(updated);
		setShowModal(false);
	};

	const deleteTrick = () => {
		setTricks(tricks.filter((t) => t.id !== trick.id));
	};

	return (
		<TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={1}>
			<View
				style={[
					styles.card,
					trick.landed && styles.landed,
					// { transform: [{ rotate: `${trick.tilt || 0}deg` }] },
				]}
			>
				<Animated.Image
					source={progressIcons[trick.progress]}
					style={[styles.progressIcon, { transform: [{ scale: scaleAnim }] }]}
				/>
				<View style={styles.titleRow}>
					<Text
						style={[
							styles.title,
							trick.attempted && !trick.landed && styles.attemptedTitle,
							trick.landed && styles.landedTitle,
						]}
					>
						{trick.name}
					</Text>
				</View>
				{trick.video ? (
					<View style={styles.linkContent}>
						<Image
							source={require("../assets/images/photo-camera-hand-drawn-tool.png")}
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
				<View style={styles.progressRow}>
					<Text style={styles.progressLabel}>{trick.progress}</Text>
				</View>
				<Text style={styles.dateText}>
					Added: {new Date(trick.dateAdded).toLocaleDateString()}
				</Text>
				{expanded && (
					<>
						<View style={styles.divider} />
						{/* <Text>Status:</Text> */}
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.progressScroll}
						>
							{(
								[
									"not started",
									"attempted",
									"trying",
									"landed",
									"on lock",
								] as Trick["progress"][]
							).map((p) => (
								<TouchableOpacity
									key={p}
									style={[
										styles.statusButton,
										trick.progress === p && styles.statusSelected,
									]}
									onPress={() => updateProgress(p)}
								>
									<Image source={progressIcons[p]} style={styles.statusIcon} />
									<Text style={styles.statusText}>{p}</Text>
								</TouchableOpacity>
							))}
						</ScrollView>

						<TouchableOpacity
							onPress={() => setShowModal(true)}
							style={styles.notes}
						>
							<Image
								source={require("../assets/images/notes.png")}
								style={styles.icon}
							/>
							<Text
								style={{
									fontFamily: "GloriaHallelujah",
									color: "#222",
									backgroundColor: "#fff",
								}}
							>
								Notes
							</Text>
						</TouchableOpacity>

						<NoteModal
							visible={showModal}
							onClose={() => setShowModal(false)}
							onSave={saveNote}
							initialNote={trick.notes}
						/>

						<TouchableOpacity style={styles.deleteButton} onPress={deleteTrick}>
							<View style={styles.buttonContent}>
								<Text style={styles.deleteButtonText}>Bin It</Text>
								<Image
									source={require("../assets/images/delete.png")}
									style={styles.icon}
								/>
							</View>
						</TouchableOpacity>
					</>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		backgroundColor: "#fafabe", // paper yellow
		borderRadius: 12,
		marginBottom: 16,
		borderWidth: 2,
		borderColor: "#000", // bold black border
		shadowColor: "#000",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		position: "relative",
	},

	landed: {
		backgroundColor: Colors.light.accent2, // light green when landed
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		// justifyContent: "space-between",
	},

	title: {
		fontFamily: "PermanentMarker",
		fontSize: 24,
		color: "#222",
		marginBottom: 8,
		marginTop: 0,
		padding: 0,
		// lineHeight: 26,
		transform: [{ rotate: `${Math.random() * 2 - 3}deg` }],
	},

	titleIcon: {
		width: 20,
		height: 20,
		alignSelf: "center",
		// tintColor: Colors.light.accent1,
		marginBottom: 6,
	},

	attemptedTitle: {
		color: Colors.light.accent1, // hot pink
		fontFamily: "GloriaHallelujah", // jittery hand-drawn font
		transform: [{ rotate: "-2deg" }], // slightly off for jitter effect
	},

	landedTitle: {
		color: "#222",
		fontFamily: "PermanentMarker", // bold crayon style
		fontWeight: "bold",
	},

	linkContent: {
		flexDirection: "row",
		alignItems: "center",
	},

	link: {
		fontFamily: "SpaceMono",
		color: Colors.light.accent1,
		textDecorationLine: "underline",
		marginVertical: 0,
		paddingVertical: 0,
		marginLeft: 6, // clean space from icon
		includeFontPadding: false, // Android fix
		textAlignVertical: "center", // Android fix
	},

	divider: {
		marginVertical: 8,
	},

	progressRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},

	progressIcon: {
		position: "absolute",
		width: 30,
		height: 30,
		top: 10,
		right: 10,
		// marginRight: 6,
		// tintColor: Colors.light.accent1,
	},

	progressLabel: {
		fontFamily: "GloriaHallelujah",
		fontSize: 18,
		color: "#222",
		// color: Colors.light.accent1,
	},

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 6,
	},

	// switchLabel: {
	// 	fontFamily: "GloriaHallelujah",
	// 	color: "#222",
	// 	fontSize: 16,
	// },

	notes: {
		flexDirection: "row",
		// justifyContent: "space-between",
		backgroundColor: " #fff",
		alignItems: "center",
		marginVertical: 6,
	},

	deleteButton: {
		marginTop: 10,
		backgroundColor: "#ff69b4", // hot pink
		borderRadius: 8,
		padding: 10,
		alignItems: "center",
	},

	buttonContent: {
		flexDirection: "row",
		alignItems: "center",
	},

	// statusOptions: {
	// 	flexDirection: "row",
	// 	// justifyContent: "space-between",
	// 	marginVertical: 8,
	// },
	progressScroll: {
		flexDirection: "row",
		marginVertical: 8,
	},
	statusButton: {
		borderWidth: 1,
		borderColor: "#222",
		borderRadius: 6,
		padding: 4,
		paddingHorizontal: 6,
		marginRight: 6,
		flexDirection: "row",
		alignItems: "center",
	},
	statusIcon: {
		width: 20,
		height: 20,
		marginRight: 2,
	},
	statusText: {
		fontFamily: "GloriaHallelujah",
	},
	statusSelected: {
		backgroundColor: Colors.light.accent3,
	},

	dateText: { fontFamily: "GloriaHallelujah", fontSize: 12 },

	deleteButtonText: {
		fontFamily: "GloriaHallelujah",
		fontWeight: "bold",
		color: "#000",
		fontSize: 16,
	},

	icon: {
		width: 20,
		height: 20,
		marginLeft: 8,
	},

	linkIcon: {
		width: 20,
		height: 20,
	},
});
