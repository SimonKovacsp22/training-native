import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const InstanceWorkout = () => {
  return (
    <TouchableOpacity
      className="p-2 border-2 border-white rounded my-2 "
      style={{ borderColor: "#f1f5f9" }}
    >
      <View className="m-1">
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            color: "white",
            fontSize: 16,
          }}
        >
          Workout 1
        </Text>
      </View>
      <View>
        <Text
          className="mx-3 my-1"
          style={{ fontFamily: "DMSans_400Regular", color: "white" }}
        >
          3 x Workout 1
        </Text>
        <Text
          className="mx-3 my-2"
          style={{ fontFamily: "DMSans_400Regular", color: "white" }}
        >
          3 x Workout 2
        </Text>

        <Text
          className="mx-3 my-1"
          style={{ fontFamily: "DMSans_400Regular", color: "white" }}
        >
          3 x Workout 3
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default InstanceWorkout;
