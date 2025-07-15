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
};

export default function AddTrickSection({
	onAddTrick,
	searchQuery,
	setSearchQuery,
	showFocusedOnly,
	setShowFocusedOnly,
}: Props) {
	const router = useRouter();
	const [visible, setVisible] = useState(false);

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
		outputRange: [0, 170], // adjusst to add more links, buttons etc
	});

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
			</TouchableOpacity>

			<Animated.View style={[styles.inner, { height: inputHeight }]}>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => router.push("/addTrick")}
				>
					<View style={styles.buttonContent}>
						<Text style={styles.addButtonText}>add a trick</Text>
					</View>
				</TouchableOpacity>

				<SlidingSearch
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<SortFilter
					showFocusedOnly={showFocusedOnly}
					setShowFocusedOnly={setShowFocusedOnly}
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
