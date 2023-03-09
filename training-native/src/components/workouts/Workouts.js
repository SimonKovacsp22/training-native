import { View, Text, ScrollView } from "react-native";
import React from "react";
import WorkoutPreview from "./WorkoutPreview";

const Workouts = ({ data }) => {
  if (data.length == 0) {
    return <Text>You dont have any workouts</Text>;
  }
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
        {data?.map((workout) => (
          <WorkoutPreview key={workout.id} data={workout} />
        ))}
      </ScrollView>
    </>
  );
};

export default Workouts;
