import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import type { Trick } from "../../types/Trick";
import ExpandableContent from "./ExpandableContent";
import ProgressIcon from "./ProgressIcon";
import TrickHeader from "./TrickHeader";

type Props = {
	trick: Trick;
	tricks: Trick[];
	setTricks: React.Dispatch<React.SetStateAction<Trick[]>>;
};

const progressIcons: { [key in Trick["progress"]]: any } = {
	"not started": require("../../assets/images/idea.png"),
	attempted: require("../../assets/images/flash.png"),
	trying: require("../../assets/images/cone.png"),
	landed: require("../../assets/images/bomb.png"),
	"on lock": require("../../assets/images/trophy.png"),
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

	// const toggle = (key: keyof Trick) => {
	// 	const updated = tricks.map((t) =>
	// 		t.id === trick.id ? { ...t, [key]: !t[key] } : t
	// 	);
	// 	setTricks(updated);
	// };

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
			<View
				style={[
					styles.card,
					// trick.landed && styles.landed,
					// { transform: [{ rotate: `${trick.tilt || 0}deg` }] },
				]}
			>
				<ProgressIcon trick={trick} scaleAnim={scaleAnim} />
				<TrickHeader key={trick.id} trick={trick} />

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
		borderColor: "#000", // bold black border
		shadowColor: "#000",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		position: "relative",
	},
});
