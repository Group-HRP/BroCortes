import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/private/HomeScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
		</Tab.Navigator>
	);
}
