import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../reducers/authSlice";
import SafeArea from "../../../components/SafeArea";

const HomeScreen = () => {
  const { user } = useSelector(authSelector);
  console.log("User :", user);
  return (
    <SafeArea>
      <View>
        <Text>{user.name}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: user.picture }}
        />
      </View>
    </SafeArea>
  );
};

export default HomeScreen;
