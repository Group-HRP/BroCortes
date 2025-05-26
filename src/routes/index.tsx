// src/routes/index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./authStack";
import AppStack from "./appStack";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function Routes() {
	const { user } = useAuth();
	const { isLoading } = useAuth();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size={"large"} color={"#8B4513"} />
			</View>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{user ? (
					<Stack.Screen name="AppStack" component={AppStack} />
				) : (
					<Stack.Screen name="AuthStack" component={AuthStack} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
