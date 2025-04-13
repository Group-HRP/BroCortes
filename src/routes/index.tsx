// src/routes/index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./authStack";
import AppStack from "./appStack";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function Routes() {
	const { user } = useAuth();

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
