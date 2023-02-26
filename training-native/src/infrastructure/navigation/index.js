import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../reducers/authSlice";
import AccountNavigator from "./AccountNavigator";
import AppNavigator from "./AppNavigator";

const Navigation = () => {
  const { isAuthenticated, user } = useSelector(authSelector);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
