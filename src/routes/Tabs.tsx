import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppointmentScreen from "../screens/private/AppointmentScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Appoitment" component={AppointmentScreen} />
		</Tab.Navigator>
	);
}
