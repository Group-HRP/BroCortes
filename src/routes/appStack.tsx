// src/routes/appStack.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import AppointmentScreen from "../screens/private/AppointmentScreen";
import HistoricScreen from "../screens/private/HistoricScreen";
import ProfileScreen from "../screens/private/ProfileScreen";
import ServiceScreen from "../screens/private/ServiceScreen";
import { HoursScreen } from "../screens/private/HoursScreen";
import { AppointmentProvider } from "../context/AppointmentContext";

export type AppStackParamList = {
  Tabs: undefined;
  Profile: undefined;
  Historic: undefined;
  Appointment: undefined;
  Service: undefined;
};
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <AppointmentProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />
        <Stack.Screen name="Historic" component={HistoricScreen} />
		<Stack.Screen name="Hours" component={HoursScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Service" component={ServiceScreen} />
      </Stack.Navigator>
    </AppointmentProvider>
  );
}
// Rotas privadas
