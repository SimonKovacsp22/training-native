import { Platform, SafeAreaView } from "react-native";
import React from "react";

const isAndroid = Platform.OS === "android";

const SafeArea = ({ children, style }) => {
  return (
    <SafeAreaView
      style={{ ...style }}
      className={`${isAndroid && "mt-6"} flex-1`}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
