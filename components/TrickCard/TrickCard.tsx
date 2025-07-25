import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import type { Trick } from "../../types/Trick";
import ExpandableContent from "./ExpandableContent";
import ProgressIcon from "./ProgressIcon";
import TrickHeader from "./TrickHeader";

type Props = {
	trick: Trick;
	tricks: Trick[];
	setTricks: React.Dispatch<React.SetStateAction<Trick[]>>;
	toggleFocus: (id: number) => void;
};

const progressIcons: { [key in Trick["progress"]]: any } = {
	"not started": require("../../assets/images/idea.png"),
	attempted: require("../../assets/images/flash.png"),
	trying: require("../../assets/images/cone.png"),
	landed: require("../../assets/images/bomb.png"),
	"on lock": require("../../assets/images/trophy.png"),
};

export default function TrickCard({
	trick,
	setTricks,
	tricks,
	toggleFocus,
}: Props) {
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

	const saveVideo = (video: string) => {
		const updated = tricks.map((t) =>
			t.id === trick.id ? { ...t, video } : t
		);
		setTricks(updated);
	};

	const deleteTrick = () => {
		setTricks(tricks.filter((t) => t.id !== trick.id));
	};

	return (
		<TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={1}>
			<View style={[styles.card]}>
				<ProgressIcon trick={trick} scaleAnim={scaleAnim} />
				<TrickHeader key={trick.id} trick={trick} />

				<View style={styles.focusSwitchContainer}>
					<Text style={styles.focusText}>
						{trick.focused ? "focused" : "set focus"}
					</Text>
					<Switch
						value={trick.focused}
						onValueChange={() => toggleFocus(trick.id)}
						thumbColor={trick.focused ? "pink" : "fff"}
						trackColor={{ true: Colors.light.accent1, false: "#f4f3f4" }}
					/>
				</View>

				{expanded && (
					<ExpandableContent
						trick={trick}
						tricks={tricks}
						setTricks={setTricks}
						setShowModal={setShowModal}
						showModal={showModal}
						saveNote={saveNote}
						saveVideo={saveVideo}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 16,
		paddingTop: 10,
		backgroundColor: "#fafabe", // paper yellow
		borderRadius: 12,
		marginBottom: 16,
		borderWidth: 2,
		borderColor: "#222",
		shadowColor: "#222",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		position: "relative",
	},

	focusButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		padding: 0,
		alignSelf: "flex-start",
	},

	focusIcon: {
		width: 30,
		height: 30,
		tintColor: Colors.light.accent1,
		flexShrink: 1,
	},

	focusText: {
		fontSize: 18,
		fontFamily: "GloriaHallelujah",
		color: "222",
	},

	focusSwitchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
	},
});
