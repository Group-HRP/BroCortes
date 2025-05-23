import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/public/LoginScreen";
import RegisterScreen from "../screens/public/RegisterScreen";
import AppointmentScreen from "../screens/private/AppointmentScreen";
import HistoricScreen from "../screens/private/HistoricScreen";
import ProfileScreen from "../screens/private/ProfileScreen";
import ServiceScreen from "../screens/private/ServiceScreen";
import { HoursScreen } from "../screens/private/HoursScreen";

export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	Appointment: undefined;
	Historic: undefined;
	Profile: undefined;
	Service: undefined;
	AppointmentHours: undefined
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="Historic" component={HistoricScreen} />
			<Stack.Screen name="Appointment" component={AppointmentScreen} />
			<Stack.Screen name="Service" component={ServiceScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
		</Stack.Navigator>
	);
}

//Rotas publicas
