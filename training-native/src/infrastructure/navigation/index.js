import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AccountNavigator from "./AccountNavigator";
import AppNavigator from "./AppNavigator";

const isAuthenticated = true;

const Navigation = () => {
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
