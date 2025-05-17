import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function useLoadFonts() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		async function loadFonts() {
			await Font.loadAsync({
				"Satoshi-Black": require("../../assets/fonts/Satoshi-Black.otf"),
				"Satoshi-Bold": require("../../assets/fonts/Satoshi-Bold.otf"),
				"Satoshi-Medium": require("../../assets/fonts/Satoshi-Medium.otf"),
				"Satoshi-Regular": require("../../assets/fonts/Satoshi-Regular.otf"),
				"Satoshi-Light": require("../../assets/fonts/Satoshi-Light.otf"),
			});
			setFontsLoaded(true);
		}
		loadFonts();
	}, []);

	return useLoadFonts;
}
