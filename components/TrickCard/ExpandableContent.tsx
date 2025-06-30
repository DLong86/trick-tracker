import { Colors } from "@/constants/Colors";
import useProgressIcons from "@/hooks/useProgressIcons";
import type { Trick } from "@/types/Trick";
import React from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import NoteModal from "./NotesModal";

export default function ExpandableContent({
	trick,
	tricks,
	setTricks,
	showModal,
	setShowModal,
	saveNote,
}: {
	trick: Trick;
	tricks: Trick[];
	setTricks: React.Dispatch<React.SetStateAction<Trick[]>>;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	saveNote: (note: string) => void;
}) {
	const updateProgress = (newStatus: Trick["progress"]) => {
		const updated = tricks.map((t) =>
			t.id === trick.id ? { ...t, progress: newStatus } : t
		);
		setTricks(updated);
	};

	const deleteTrick = () => {
		setTricks(tricks.filter((t) => t.id !== trick.id));
	};

	const progressIcons = useProgressIcons();

	return (
		<>
			<View style={styles.divider} />

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

			<TouchableOpacity onPress={() => setShowModal(true)} style={styles.notes}>
				<Image
					source={require("../../assets/images/notes.png")}
					style={styles.icon}
				/>
				<Text style={styles.notesText}>notes</Text>
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
						source={require("../../assets/images/delete.png")}
						style={styles.icon}
					/>
				</View>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	divider: {
		marginVertical: 8,
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

	notes: {
		flexDirection: "row",
		alignSelf: "flex-start",
		alignItems: "center",
		marginVertical: 6,
		paddingVertical: 6,
	},

	notesText: {
		fontFamily: "PermanentMarker",
		// color: "#222",
		paddingHorizontal: 4,
		fontSize: 16,
		color: Colors.light.accent1,
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

	// dateText: { fontFamily: "GloriaHallelujah", fontSize: 12 },

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
