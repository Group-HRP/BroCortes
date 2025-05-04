import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/public/LoginScreen";
import RegisterScreen from "../screens/public/RegisterScreen";
import { HoursScreen } from "../screens/private/HoursScreen";

export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	Appointment: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="Appointment" component={HoursScreen} /> */}
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
		</Stack.Navigator>
	);
}

//Rotas publicas
