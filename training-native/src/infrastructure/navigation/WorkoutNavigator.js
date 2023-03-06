import { View, Text } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import AddWorkoutScreen from "../../features/screens/add/MyWorkoutsScreen";
import ExercizesScreen from "../../features/screens/add/ExercizesScreen";

const WorkouStack = createStackNavigator();

const WorkoutNavigator = () => {
  return (
    <WorkouStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <WorkouStack.Screen name="MyWorkouts" component={AddWorkoutScreen} />
      <WorkouStack.Screen name="AddWorkout" component={ExercizesScreen} />
    </WorkouStack.Navigator>
  );
};

export default WorkoutNavigator;
