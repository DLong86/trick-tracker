import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

type Props = {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
};

export default function SlidingSearch({ searchQuery, setSearchQuery }: Props) {
	// const [visible, setVisible] = useState(false);
	// const widthAnim = useRef(new Animated.Value(0)).current;

	// const toggleInput = () => {
	// 	const willShow = !visible;
	// 	setVisible(willShow);
	// 	Animated.timing(widthAnim, {
	// 		toValue: willShow ? 340 : 45, // Expand or collapse width
	// 		duration: 300,
	// 		useNativeDriver: false,
	// 	}).start();
	// };

	return (
		<View style={styles.inputWrapper}>
			<Image
				source={require("../../assets/images/search.png")}
				style={styles.icon}
			/>
			<TextInput
				placeholder="Search..."
				value={searchQuery}
				onChangeText={setSearchQuery}
				style={styles.input}
				placeholderTextColor="#666"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 2,
		borderColor: Colors.light.icon,
		backgroundColor: Colors.light.accent3,
		borderRadius: 6,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},

	icon: {
		width: 20,
		height: 20,
		marginRight: 8,
	},

	input: {
		flex: 1,
		fontFamily: "GloriaHallelujah",
		color: "#222",
	},
});
