import { View, Text, Image, Button } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logUserOut } from "../../../../reducers/authSlice";
import SafeArea from "../../../components/SafeArea";
import { ref, set, onValue, push, update } from "firebase/database";
import {
  database,
  saveNewSerie,
  saveNewTraining,
  saveNewExercise,
} from "../../../services/database.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const { user } = useSelector(authSelector);

  const dispatch = useDispatch();

  const logOut = async () => {
    dispatch(logUserOut());
    await AsyncStorage.removeItem("user");
  };

  const getDataForTrainings = () => {
    const trainings = ref(database, "/trainings");
    onValue(trainings, (snapshot) => {
      const data = snapshot.val();
    });
  };

  useEffect(() => {
    getDataForTrainings();
  }, []);

  const updateSerie = () => {
    const updates = {};
    updates["/series/" + "-NPw2v31KGRP5z7Oj02A" + "/sets"] = ["1", "2", "4"];
    return update(ref(database), updates);
  };

  return (
    <SafeArea>
      {user !== null && (
        <View>
          <Text>{user.name}</Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: user.picture }}
          />
          <Button
            title="Add training"
            onPress={() =>
              saveNewTraining(user?.id, "training3", ["1", "2"], Date.now())
            }
          ></Button>
          <Button title="Log Out" onPress={logOut}></Button>
          <Button
            title="Add Exercise"
            onPress={() => saveNewExercise("Squat", "weight")}
          ></Button>
        </View>
      )}
    </SafeArea>
  );
};
export default HomeScreen;
