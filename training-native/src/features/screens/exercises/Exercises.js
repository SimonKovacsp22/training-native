import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../../services/database.service";
import SafeArea from "../../../components/SafeArea";

const ExercisesScreen = () => {
  const [exercises, setExercises] = useState([]);
  const [recent, setRecent] = useState([1, 2, 3, 4]);

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
      <View className="flex-1 bg-training-bg-blue px-6 py-4">
        <Text style={styles.textAntonRegular}>Exercises</Text>
        <ScrollView>
          <Text
            style={{ fontFamily: "DMSans_400Regular", color: "#d1d5db" }}
            className="mt-6 mb-4 "
          >
            Recent
          </Text>
          {recent.length > 0 && (
            <View>
              {recent.map((e) => (
                <View key={e} className="flex-row space-x-2">
                  <Text style={styles.textDMMedium}>{e}</Text>
                  <Text style={styles.textDMMedium}>({e})</Text>
                </View>
              ))}
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
                <View key={e.id} className="flex-row space-x-2">
                  <Text style={styles.textDMMedium}>{e.name}</Text>
                  <Text style={styles.textDMMedium}>({e.type})</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  textDMMedium: {
    fontFamily: "DMSans_500Medium",
    color: "white",
    fontSize: 16,
  },
  textAntonRegular: {
    fontFamily: "Anton_400Regular",
    fontSize: 32,
    color: "white",
  },
});

export default ExercisesScreen;
