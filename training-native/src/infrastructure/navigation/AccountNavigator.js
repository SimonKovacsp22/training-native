import { View, Text } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/authSlice";
import { googleConfig } from "../../services/authentication.service";

const AccountNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    googleConfig();
  }, []);
  return (
    <View>
      <Text className="text-red-500">AccountNavigator</Text>
    </View>
  );
};

export default AccountNavigator;
