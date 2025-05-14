import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceScreen from "../screens/private/ServiceScreen";
import AppointmentScreen from "../screens/private/AppointmentScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Service" component={ServiceScreen} />
			<Tab.Screen name="Appoitment" component={AppointmentScreen} />
		</Tab.Navigator>
	);
}
