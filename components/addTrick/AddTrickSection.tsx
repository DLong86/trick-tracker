import { Colors } from "@/constants/Colors";
import React, { useRef, useState } from "react";
import {
	Animated,
	Easing,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import SlidingSearch from "./SlidingSearch";

export default function AddTrickSection({
	onAddTrick,
	searchQuery,
	setSearchQuery,
}: {
	onAddTrick: (name: string, video: string) => void;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [visible, setVisible] = useState(false);
	const [text, setText] = useState("");
	const [videoLink, setVideoLink] = useState("");

	const slideAnim = useRef(new Animated.Value(0)).current;

	const toggleVisible = () => {
		setVisible((prev) => !prev);
		Animated.timing(slideAnim, {
			toValue: visible ? 0 : 1,
			duration: 300,
			easing: Easing.out(Easing.ease),
			useNativeDriver: false,
		}).start();
	};

	const inputHeight = slideAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 240], // Adjust this if you add more content
	});

	const handleAdd = () => {
		if (text.trim()) {
			onAddTrick(text, videoLink);
			setText("");
			setVideoLink("");
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.toggleButton} onPress={toggleVisible}>
				{visible ? (
					<View style={styles.buttonContent}>
						<Text style={styles.toggleText}>close</Text>
						<Image
							source={require("../../assets/images/up-arrow.png")}
							style={styles.icon}
						/>
					</View>
				) : (
					<View style={styles.buttonContent}>
						<Text style={styles.toggleText}>add tricks</Text>
						<Image
							source={require("../../assets/images/down-arrow.png")}
							style={styles.icon}
						/>
					</View>
				)}
				{/* <Text style={styles.toggleText}>
					{visible ? "close" : "add tricks"}
				</Text> */}
			</TouchableOpacity>

			<Animated.View style={[styles.inner, { height: inputHeight }]}>
				<TextInput
					placeholder="Trick Name"
					value={text}
					onChangeText={setText}
					style={styles.input}
					placeholderTextColor={"#666"}
				/>
				<TextInput
					placeholder="Video URL"
					value={videoLink}
					onChangeText={setVideoLink}
					style={styles.input}
					placeholderTextColor={"#666"}
				/>

				<TouchableOpacity style={styles.addButton} onPress={handleAdd}>
					<View style={styles.buttonContent}>
						<Text style={styles.addButtonText}>add trick</Text>
						<Image
							source={require("../../assets/images/plus-hand-drawn-sign.png")}
							style={styles.icon}
						/>
					</View>
				</TouchableOpacity>
				<SlidingSearch
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
		marginTop: 6,
	},
	toggleButton: {
		// flexDirection: "row",
		backgroundColor: Colors.light.accent1,
		padding: 8,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 8,
	},
	toggleText: {
		fontFamily: "GloriaHallelujah",
		fontSize: 16,
		color: "#222",
	},
	inner: {
		overflow: "hidden",
	},
	input: {
		borderWidth: 2,
		borderColor: Colors.light.icon,
		backgroundColor: Colors.light.accent3,
		color: "#222",
		padding: 10,
		marginBottom: 10,
		borderRadius: 6,
		fontFamily: "GloriaHallelujah",
	},
	addButton: {
		backgroundColor: Colors.light.accent1,
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 8,
	},
	addButtonText: {
		fontFamily: "GloriaHallelujah",
		fontSize: 16,
		color: "#222",
	},
	buttonContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 20,
		height: 20,
		marginLeft: 8,
	},
});
