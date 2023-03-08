import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../../services/database.service";
import SafeArea from "../../../components/SafeArea";
import Exercise from "../../../components/exercises/InstanceExercise";
import { textStyles } from "../../../theme/text.styles";
import { workoutSelector } from "../../../../reducers/workoutSlice";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const ExercisesScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [recent, setRecent] = useState([1, 2, 3, 4]);

  const { selectedExercises } = useSelector(workoutSelector);
  useEffect(() => {
    function getExercises() {
      const exercisesRef = ref(database, "exercises");
      onValue(exercisesRef, (snapshot) => {
        const data = snapshot.val();
        const dataArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setExercises(dataArray);
      });
    }

    getExercises();
  }, []);

  return (
    <SafeArea>
      <View className="flex-1 bg-training-bg-blue px-6 py-4 ">
        <View className="flex-row justify-between items-center">
          <Text style={textStyles.textAntonRegular}>Exercises</Text>
          <Entypo
            name={"back"}
            size={36}
            color={"white"}
            style={{ marginTop: 8 }}
            onPress={() => navigation.navigate("AddWorkout")}
          />
        </View>
        <ScrollView>
          <Text
            style={{ fontFamily: "DMSans_400Regular", color: "#d1d5db" }}
            className="mt-6 mb-4 "
          >
            Recent
          </Text>
          {recent.length > 0 && (
            <View>
              {/* {recent.map((e) => (
                <Exercise data={e} />
              ))} */}
            </View>
          )}

          <Text
            style={{ fontFamily: "DMSans_400Regular", color: "#d1d5db" }}
            className="mt-6 mb-4 "
          >
            All
          </Text>
          {exercises.length > 0 && (
            <View>
              {exercises.map((e) => (
                <Exercise data={e} key={e.id} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeArea>
  );
};

export default ExercisesScreen;
