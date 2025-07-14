import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	Easing,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import SlidingSearch from "./SlidingSearch";
import SortFilter from "./SortFilter";

type Props = {
	onAddTrick: (name: string, video: string) => void;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	showFocusedOnly: boolean;
	setShowFocusedOnly: React.Dispatch<React.SetStateAction<boolean>>;
	// sortBy: "dateAsc" | "dateDesc" | "nameAsc" | "nameDesc";
	// setSortBy: React.Dispatch<
	// 	React.SetStateAction<"dateAsc" | "dateDesc" | "nameAsc" | "nameDesc">
	// >;
};

export default function AddTrickSection({
	onAddTrick,
	searchQuery,
	setSearchQuery,
	showFocusedOnly,
	setShowFocusedOnly,
}: // sortBy,
// setSortBy,
Props) {
	const router = useRouter();
	const [visible, setVisible] = useState(false);
	// const [text, setText] = useState("");
	// const [videoLink, setVideoLink] = useState("");

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
		outputRange: [0, 170], // Adjust this if you add more content
	});

	// const handleAdd = () => {
	// 	if (text.trim()) {
	// 		onAddTrick(text, videoLink);
	// 		setText("");
	// 		setVideoLink("");
	// 	}
	// };

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
				{/* <TextInput
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
				/> */}

				<TouchableOpacity
					style={styles.addButton}
					onPress={() => router.push("/addTrick")}
				>
					<View style={styles.buttonContent}>
						<Text style={styles.addButtonText}>add a trick</Text>
						{/* <Image
							source={require("../../assets/images/right-arrow.png")}
							style={styles.icon}
						/> */}
					</View>
				</TouchableOpacity>
				{/* <View style={styles.sortFilterRow}>
					<TouchableOpacity
						onPress={() => setShowFocusedOnly(!showFocusedOnly)}
					>
						<Text style={styles.sortFilterText}>
							{showFocusedOnly ? "Show All Tricks" : "Show Focused Only"}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							setSortBy((prev) => {
								if (prev === "dateDesc") return "dateAsc";
								if (prev === "dateAsc") return "nameAsc";
								if (prev === "nameAsc") return "nameDesc";
								return "dateDesc";
							});
						}}
					>
						<Text style={styles.sortFilterText}>
							Sort:{" "}
							{sortBy === "dateDesc"
								? "Date ↓"
								: sortBy === "dateAsc"
								? "Date ↑"
								: sortBy === "nameAsc"
								? "Name A→Z"
								: "Name Z→A"}
						</Text>
					</TouchableOpacity>
				</View> */}
				<SlidingSearch
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<SortFilter
					showFocusedOnly={showFocusedOnly}
					setShowFocusedOnly={setShowFocusedOnly}
					// sortBy={sortBy}
					// setSortBy={setSortBy}
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
		backgroundColor: Colors.light.accent3,
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
	sortFilterRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
		paddingHorizontal: 4,
	},
	sortFilterText: {
		fontFamily: "GloriaHallelujah",
		fontSize: 14,
		color: "#333",
	},
});
