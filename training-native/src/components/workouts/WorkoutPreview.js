import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getSeriesForWorkout } from "../../services/database.service";

const WorkoutPreview = ({ data }) => {
  const [series, setSeries] = useState([]);

  const getDataForSeries = () => {
    if (data == null) return;
    if (!data.series.length) return;
    const listOfSeries = getSeriesForWorkout(data.series);
    setSeries(listOfSeries);
  };

  useEffect(() => {
    getDataForSeries();
  }, []);

  if (data == null) return <Text>Something went wrong!</Text>;
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
          {data.name}
        </Text>
      </View>
      <View>
        {series.length > 0 &&
          series.slice(0, 3).map((serie) => (
            <Text
              className="mx-3 my-1"
              style={{ fontFamily: "DMSans_400Regular", color: "white" }}
            >
              {serie?.sets?.length} x {serie.exerciseName}
            </Text>
          ))}
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPreview;
