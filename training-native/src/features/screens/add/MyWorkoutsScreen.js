import { View, Text, TouchableOpacity } from "react-native";
import SafeArea from "../../../components/SafeArea";
import React, { useEffect, useState } from "react";
import Workouts from "../../../components/workouts/Workouts";
import { dataToArray, getMyWorkouts } from "../../../services/database.service";
import { onValue } from "firebase/database";
import { authSelector } from "../../../../reducers/authSlice";
import { useSelector } from "react-redux";

const AddWorkout = ({ navigation }) => {
  const { user } = useSelector(authSelector);
  const [workouts, setWorkouts] = useState([]);

  const queryWorkouts = () => {
    const trainings = getMyWorkouts(user.id);
    const val = onValue(
      trainings,
      (snapshot) => {
        const data = snapshot.val();
        const dataArray = dataToArray(data);
        setWorkouts(dataArray);
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    queryWorkouts();
  }, []);

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
        <Workouts data={workouts} />
        <View className="pt-3">
          <TouchableOpacity onPress={() => navigation.navigate("AddWorkout")}>
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
        </View>
      </View>
    </SafeArea>
  );
};

export default AddWorkout;
