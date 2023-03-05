import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../features/screens/home/HomeScreen";
import AddWorkout from "../../features/screens/add/AddWorkout";
import ScheduleScreen from "../../features/screens/schedule/ScheduleScreen";
import SettingsNavigator from "../../features/screens/settings/SettingsNavigator";
import PerformanceScreen from "../../features/screens/performance/PerformanceScreen";
import { Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Account: "user",
  Schedule: "back-in-time",
  Add: "plus",
  Settings: "cog",
  Performance: "battery",
};

const tabBarIcon =
  (iconName) =>
  ({ size, color }) =>
    (
      <Entypo
        name={iconName}
        size={iconName === "plus" ? 36 : size}
        color={color}
      />
    );

const screenOptions = ({ route }) => {
  const iconName = TAB_ICONS[route.name];
  return {
    tabBarIcon: tabBarIcon(iconName),
    tabBarActiveTintColor: "#DD8500",
    tabBarInactiveTintColor: "#939393",
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,

    tabBarStyle: {
      height: 75,
      paddingHorizontal: 12,
      paddingVertical: 0,
      backgroundColor: "#2C2B3A",
    },
  };
};

const AppNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Account" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Add" component={AddWorkout} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
      <Tab.Screen name="Performance" component={PerformanceScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
