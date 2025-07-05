import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/public/LoginScreen";
import RegisterScreen from "../screens/public/RegisterScreen";
import SendEmailScreen from "../screens/public/SendEmailScreen";
import ValidateScreen from "../screens/public/ValidateScreen";
import ResetPasswordScreen from "../screens/public/ResetPassword";



export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	SendEmail: undefined;
  	ValidateToken: undefined;
  	ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen name="SendEmail" component={SendEmailScreen} />
			<Stack.Screen name="ValidateToken" component={ValidateScreen} />
			<Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
		</Stack.Navigator>
	);
}

//Rotas publicas
