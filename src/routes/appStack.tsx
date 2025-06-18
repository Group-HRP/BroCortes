// src/routes/appStack.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import AppointmentScreen from "../screens/private/AppointmentScreen";
import HistoricScreen from "../screens/private/HistoricScreen";
import ProfileScreen from "../screens/private/ProfileScreen";
import ServiceScreen from "../screens/private/ServiceScreen";
import { HoursScreen } from "../screens/private/HoursScreen";
import PersonalInfoScreen from "../screens/private/PersonalInfoScreen";
import {
  type Appointment,
  AppointmentProvider,
} from "../context/AppointmentContext";
import ReviewAppointmentScreen from "../screens/private/ReviewAppointmentScreen";
import ViewAppointmentScreen from "../screens/private/ViewAppointmentScreen";

export type AppStackParamList = {
  AppStack: undefined;	
  Tabs: undefined;
  Profile: undefined;
  Historic: undefined;
  Appointment: undefined;
  Service: undefined;
  ReviewAppointment: undefined;
  ViewAppointment: { viewAppointment: Appointment };
  Hours: undefined;
  ConfirmAppointment: undefined;
  PersonalInfoScreen: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <AppointmentProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />
        <Stack.Screen name="Historic" component={HistoricScreen} />
        <Stack.Screen name="Hours" component={HoursScreen} />
        <Stack.Screen
          name="ReviewAppointment"
          component={ReviewAppointmentScreen}
        />
        <Stack.Screen
          name="ViewAppointment"
          component={ViewAppointmentScreen}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
        <Stack.Screen name="Service" component={ServiceScreen} />
        <Stack.Screen
          name="ConfirmAppointment"
          component={ReviewAppointmentScreen}
        />
      </Stack.Navigator>
    </AppointmentProvider>
  );
}
// Rotas privadas
