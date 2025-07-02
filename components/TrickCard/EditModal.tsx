import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function EditModal({
	visible,
	onClose,
	onSave,
	initialName,
	initialVideo,
}: {
	visible: boolean;
	onClose: () => void;
	onSave: (name: string, video: string) => void;
	initialName: string;
	initialVideo: string;
}) {
	const [name, setName] = useState(initialName);
	const [video, setVideo] = useState(initialVideo || "");

	useEffect(() => {
		setName(initialName);
		setVideo(initialVideo || "");
	}, [initialName, initialVideo]);

	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<TextInput
						value={name}
						onChangeText={setName}
						placeholder="trick name"
						style={styles.input}
						placeholderTextColor={"#666"}
					/>
					<TextInput
						value={video}
						onChangeText={setVideo}
						placeholder="video link"
						style={styles.input}
						placeholderTextColor={"#666"}
					/>
					<View style={styles.buttons}>
						<TouchableOpacity onPress={onClose} style={styles.button}>
							<Text style={styles.buttonText}>cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => onSave(name, video)}
							style={styles.saveButton}
						>
							<Text style={styles.buttonText}>save</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.6)",
		// justifyContent: "center",
		paddingTop: 110,
		alignItems: "center",
	},
	modal: {
		backgroundColor: Colors.light.accent2,
		padding: 16,
		borderRadius: 10,
		width: "80%",
		overflow: "hidden",
	},
	input: {
		borderColor: "#222",
		borderWidth: 1,
		borderRadius: 6,
		padding: 10,
		marginVertical: 8,
		fontFamily: "GloriaHallelujah",
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10,
		gap: 10,
	},
	button: {
		borderWidth: 1,
		borderColor: "#222",
		backgroundColor: Colors.light.accent1,

		borderRadius: 6,
		padding: 2,
		paddingHorizontal: 10,
	},
	saveButton: {
		borderWidth: 1,
		borderColor: "#222",
		backgroundColor: Colors.light.accent3,
		borderRadius: 6,
		padding: 2,
		paddingHorizontal: 10,
	},
	buttonText: {
		fontFamily: "GloriaHallelujah",
		color: "#000",
	},
});
