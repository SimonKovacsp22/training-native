import { View, Text, ScrollView } from "react-native";
import React from "react";
import InstanceWorkout from "./InstanceWorkout";

const dummyWOrkouts = [1, 2, 3, 4];

const Workouts = () => {
  return (
    <>
      <View>
        <Text
          style={{ fontFamily: "DMSans_400Regular", color: "#d1d5db" }}
          className="mt-6 mb-4 text-2xl"
        >
          My Workouts
        </Text>
      </View>
      <ScrollView>
        {dummyWOrkouts.map((work) => (
          <InstanceWorkout key={work} />
        ))}
      </ScrollView>
    </>
  );
};

export default Workouts;
