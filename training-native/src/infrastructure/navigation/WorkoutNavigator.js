import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddWorkoutScreen from "../../features/screens/add/MyWorkoutsScreen";
import NewWorkoutScreen from "../../features/screens/add/NewWorkoutScreen";

const WorkouStack = createNativeStackNavigator();

const WorkoutNavigator = () => {
  return (
    <WorkouStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "containedModal",
      }}
    >
      <WorkouStack.Screen name="MyWorkouts" component={AddWorkoutScreen} />
      <WorkouStack.Screen name="AddWorkout" component={NewWorkoutScreen} />
    </WorkouStack.Navigator>
  );
};

export default WorkoutNavigator;
