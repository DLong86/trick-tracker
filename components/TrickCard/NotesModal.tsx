import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
	ImageBackground,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function NoteModal({
	visible,
	onClose,
	onSave,
	initialNote,
}: {
	visible: boolean;
	onClose: () => void;
	onSave: (note: string) => void;
	initialNote?: string;
}) {
	const [note, setNote] = useState(initialNote || "");

	useEffect(() => {
		setNote(initialNote || "");
	}, [initialNote]);

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.overlay}>
				<ImageBackground
					source={require("../../assets/images/lined-paper-2.png")}
					style={styles.modal}
					imageStyle={{
						resizeMode: "stretch",
						width: "full",
						height: "100%",
						// borderRadius: 10,
					}}
				>
					{/* <Text style={styles.title}>Notes</Text> */}
					<TextInput
						multiline
						numberOfLines={4}
						value={note}
						onChangeText={setNote}
						style={styles.input}
						placeholder="take notes..."
						placeholderTextColor={"#666"}
					/>
					<View style={styles.buttonRow}>
						<TouchableOpacity onPress={onClose} style={styles.buttonCancel}>
							<Text style={styles.buttonText}>cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => onSave(note)}
							style={styles.buttonSave}
						>
							<Text style={styles.buttonText}>save</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.6)",
		justifyContent: "center",
		alignItems: "center",
	},
	modal: {
		backgroundColor: "#fafabe",
		padding: 10,
		borderRadius: 10,
		width: "80%",
		overflow: "hidden",
	},
	title: {
		fontSize: 22,
		marginBottom: 10,
		fontFamily: "PermanentMarker",
	},
	input: {
		padding: 10,
		borderRadius: 6,
		minHeight: 200,
		fontSize: 16,
		textAlignVertical: "top",
		fontFamily: "GloriaHallelujah",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10,
		gap: 10,
		margin: 10,
	},
	buttonSave: {
		borderWidth: 1,
		borderColor: "#222",
		backgroundColor: Colors.light.accent3,
		borderRadius: 6,
		padding: 2,
		paddingHorizontal: 10,
		// marginRight: 6,
		flexDirection: "row",
		alignItems: "center",
	},

	buttonCancel: {
		borderWidth: 1,
		borderColor: "#222",
		borderRadius: 6,
		padding: 2,
		paddingHorizontal: 10,
		backgroundColor: Colors.light.accent2,
		flexDirection: "row",
		alignItems: "center",
	},

	buttonText: {
		fontFamily: "GloriaHallelujah",
	},
});
