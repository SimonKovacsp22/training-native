import { View, Text, Button, Image, Platform } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/authSlice";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";

const AccountNavigator = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [auth, setAuth] = useState();
  const [requireRefresh, setRequireRefresh] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com",
    iosClientId:
      "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com",
    expoClientId:
      "397754311669-k7vf1v87pvc1htbb4219n08uubiv9hgc.apps.googleusercontent.com",
  });

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }
    );
    let data = await userInfoResponse.json();
    setUserData(data);
  };

  const getCLientId = () => {
    if (Platform.OS === "ios") {
      return "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com";
    } else if (Platform.OS === "android") {
      return "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com";
    } else {
      throw new Error("Not supported platform");
    }
  };

  const refreshToken = async () => {
    const clientId = getCLientId();

    const token = await AuthSession.refreshAsync(
      {
        clientId,
        refreshToken: auth.refreshToken,
      },
      {
        tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
      }
    );

    token.refreshToken = auth.refreshToken;

    setAuth(token);
    await AsyncStorage.setItem("auth", JSON.stringify(token));
    setRequireRefresh(false);
  };

  useEffect(() => {
    console.log(requireRefresh);
    const getPersistedAuth = async () => {
      try {
        const savedAuthJsonValue = await AsyncStorage.getItem("auth");
        if (savedAuthJsonValue != null) {
          const authJSON = JSON.parse(savedAuthJsonValue);
          setAuth(authJSON);

          setRequireRefresh(
            !AuthSession.TokenResponse.isTokenFresh({
              expiresIn: authJSON.expiresIn,
              issuedAt: authJSON.issuedAt,
            })
          );
        }
      } catch (e) {
        console.log("get data from AsyncStorage error" + e);
      }
    };

    getPersistedAuth();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      setAuth(response.authentication);

      const persistAuth = async () => {
        try {
          await AsyncStorage.setItem(
            "auth",
            JSON.stringify(response.authentication)
          );
        } catch (e) {
          console.log("persistAuth error" + e);
        }
      };

      persistAuth();
    }
  }, [response]);

  useEffect(() => {
    if (requireRefresh === false) return;
    refreshToken();
  }, [requireRefresh]);

  return (
    <View className="flex-1 items-center justify-center">
      <Button
        title={!!auth?.accessToken ? "Get User Data" : "Login"}
        onPress={
          !!auth
            ? getUserData
            : () => promptAsync({ useProxy: true, showInRecents: true })
        }
      />
      {!!userData && (
        <View>
          <Text>{userData.name}</Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: userData?.picture }}
          />
        </View>
      )}
    </View>
  );
};

export default AccountNavigator;
