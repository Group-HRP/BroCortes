import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceScreen from "../screens/private/ServiceScreen";
import AppointmentScreen from "../screens/private/AppointmentScreen";
import { HoursScreen } from "../screens/private/HoursScreen";
import { AppointmentProvider } from "../context/AppointmentContext";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<AppointmentProvider>
			<Tab.Navigator>
				<Tab.Screen name="Service" component={ServiceScreen} />
				<Tab.Screen name="Appoitment" component={AppointmentScreen} />
				<Tab.Screen name="Hours" component={HoursScreen} />
			</Tab.Navigator>
		</AppointmentProvider>
	);
}
