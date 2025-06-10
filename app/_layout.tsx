import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		GloriaHallelujah: require("../assets/fonts/GloriaHallelujah-Regular.ttf"),
		PermanentMarker: require("../assets/fonts/PermanentMarker-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return (
			<Text style={{ fontSize: 20, textAlign: "center", marginTop: 100 }}>
				Loading fonts...
			</Text>
		);
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
