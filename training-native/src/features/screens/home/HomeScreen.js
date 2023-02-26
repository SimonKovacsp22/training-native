import { View, Text, TouchableOpacity } from "react-native";
import SafeArea from "../../../components/SafeArea";
import React from "react";
import Workouts from "../../../components/Workouts";

const HomeScreen = () => {
  return (
    <SafeArea>
      <View className="flex-1 bg-training-bg-blue px-6 py-4">
        <Text
          style={{
            fontFamily: "Anton_400Regular",
            fontSize: 32,
            color: "white",
          }}
        >
          Training
        </Text>
        <View className="mt-24"></View>
        <TouchableOpacity>
          <View className="bg-training-button-blue py-3 rounded">
            <Text
              style={{
                fontFamily: "Anton_400Regular",
                fontSize: 20,
                color: "white",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Create Template
            </Text>
          </View>
        </TouchableOpacity>
        <Workouts />
      </View>
    </SafeArea>
  );
};

export default HomeScreen;
