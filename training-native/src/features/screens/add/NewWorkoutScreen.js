import { View, Text, Button } from "react-native";
import React from "react";
import SafeArea from "../../../components/SafeArea";
import { saveNewTraining } from "../../../services/database.service";

import { authSelector } from "../../../../reducers/authSlice";
import { useSelector } from "react-redux";

const NewWorkoutScreen = ({ navigation }) => {
  const { user } = useSelector(authSelector);
  console.log(user.id);

  const createWorkout = () => {
    saveNewTraining(user.id, "First workout", ["1"], " 08/03/2023");
  };
  return (
    <SafeArea>
      <Button
        title="Choose Exercise"
        onPress={() => navigation.navigate("Exercises")}
      ></Button>
      <Button
        title="Create Training"
        onPress={() =>
          saveNewTraining(user?.id, "training3", ["1", "2"], Date.now())
        }
      ></Button>
    </SafeArea>
  );
};

export default NewWorkoutScreen;
