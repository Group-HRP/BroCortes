// src/routes/appStack.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs"; // Seu navigator com abas

const Stack = createNativeStackNavigator();

export default function AppStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Tabs" component={Tabs} />
		</Stack.Navigator>
	);
}
// Rotas privadas
