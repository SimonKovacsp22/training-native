import { View, Text, TouchableOpacity } from "react-native";
import { textStyles } from "../../theme/text.styles";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExercise } from "../../../reducers/workoutSlice";

const InstanceExercise = ({ data }) => {
  const { name, type, id } = data;
  const [selected, setSelected] = useState(false);

  const addToSelected = () => {
    dispatch(addExercise({ id }));
    setSelected((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      className="flex-row space-x-2 py-4"
      style={selected && { backgroundColor: "blue" }}
      onPress={addToSelected}
    >
      <Text style={textStyles.textDMMedium}>{name}</Text>
      <Text style={textStyles.textDMMedium}>({type})</Text>
    </TouchableOpacity>
  );
};

export default InstanceExercise;
