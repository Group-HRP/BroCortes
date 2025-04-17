import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceScreen from "../screens/private/ServiceScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Service" component={ServiceScreen} />
		</Tab.Navigator>
	);
}
