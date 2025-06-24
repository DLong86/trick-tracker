import type { Trick } from "@/types/Trick";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "TRICKS";

export const saveTricks = async (tricks: Trick[]) => {
	try {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tricks));
	} catch (error) {
		console.error("Error saving tricks:", error);
	}
};

export const loadTricks = async (): Promise<Trick[]> => {
	try {
		const json = await AsyncStorage.getItem(STORAGE_KEY);
		return json != null ? JSON.parse(json) : [];
	} catch (error) {
		console.error("Error loading tricks:", error);
		return [];
	}
};
