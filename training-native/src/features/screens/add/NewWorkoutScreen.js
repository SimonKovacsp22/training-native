import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import SafeArea from "../../../components/SafeArea";
import {
  saveNewSerie,
  saveNewTraining,
} from "../../../services/database.service";

import { authSelector } from "../../../../reducers/authSlice";
import { useSelector } from "react-redux";

const NewWorkoutScreen = ({ navigation }) => {
  const { user } = useSelector(authSelector);

  const createWorkout = () => {
    const docId = saveNewTraining(
      user.id,
      "First workout",
      ["-NPw2v31KGRP5z7Oj02A", "-NQ4dlg0W33msHVPmHHl"],
      " 09/03/2023"
    );
    console.log(docId);
  };
  return (
    <SafeArea>
      <Button
        title="Choose Exercise"
        onPress={() => navigation.navigate("Exercises")}
      ></Button>
      <Button title="Create Training" onPress={createWorkout}></Button>
      <Button
        title="New Serie"
        onPress={() => saveNewSerie("-NQ0ntaW4j4ECV8-K8IT", [1, 2, 3, 4])}
      />
    </SafeArea>
  );
};

export default NewWorkoutScreen;
