import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HistoricScreen from "../screens/private/HistoricScreen";
import ProfileScreen from "../screens/private/ProfileScreen";
import AppointmentScreen from "../screens/private/AppointmentScreen";

import {
  AppointmentIcon,
  AppointmentFillIcon,
  HistoricIcon,
  HistoricFillIcon,
  ProfileIcon,
  ProfileFillIcon,
} from "../../assets/icons/IconTab";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent:
            | React.ComponentType<{ color: string; size: number }>
            | undefined;
          if (route.name === "Appointment") {
            IconComponent = focused ? AppointmentFillIcon : AppointmentIcon;
          } else if (route.name === "Historic") {
            IconComponent = focused ? HistoricFillIcon : HistoricIcon;
          } else if (route.name === "Profile") {
            IconComponent = focused ? ProfileFillIcon : ProfileIcon;
          }
          if (!IconComponent) return null;
          return <IconComponent color={color} size={size} />;
        },
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1A1A1A",
          height: 88,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarInactiveTintColor: "#fff",
        tabBarIconStyle: {
          marginTop: 25,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Appointment" component={AppointmentScreen} />
      <Tab.Screen name="Historic" component={HistoricScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
