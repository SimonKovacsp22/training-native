import { View, Text, Button, Image } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/authSlice";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { saveUserInDb } from "../../services/database.service";
import {
  getUserFromStorage,
  saveUserInStorage,
} from "../../services/authentication.service";

WebBrowser.maybeCompleteAuthSession();

const AccountNavigator = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com",
    iosClientId:
      "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com",
    expoClientId:
      "397754311669-k7vf1v87pvc1htbb4219n08uubiv9hgc.apps.googleusercontent.com",
  });

  const getUserData = async () => {
    try {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      let data = await userInfoResponse.json();
      if (data != null) {
        const { email, name, picture, id } = data;
        dispatch(setUser({ email, name, picture, id }));
        saveUserInStorage(email, name, picture, id);
        saveUserInDb(id, name, email, picture);
      }
    } catch (error) {
      console.log("Get User data error ", e);
    }
  };

  const isUserInStorage = async () => {
    try {
      const user = await getUserFromStorage();
      if (user !== null) {
        dispatch(setUser({ ...user }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      setAuth(response.authentication);
    }
  }, [response]);

  useEffect(() => {
    isUserInStorage();
  }, []);

  useEffect(() => {
    if (auth === null) return;
    getUserData();
  }, [auth]);

  return (
    <View className="flex-1 items-center justify-center">
      <Button
        title={"Login With Google"}
        onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
      />
    </View>
  );
};

export default AccountNavigator;
