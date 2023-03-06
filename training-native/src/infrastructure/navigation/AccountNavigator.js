import { View, Text, Button, Image } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/authSlice";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { saveUserInDb } from "../../services/database.service";

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
        saveUserInDb(id, name, email, picture);
      }
    } catch (error) {
      console.log("Get User data error ", e);
    }

    // await AsyncStorage.setItem(
    //   "user",
    //   JSON.stringify({ email, name, picture, id })
    // );
  };

  useEffect(() => {
    if (response?.type === "success") {
      setAuth(response.authentication);

      // const persistAuth = async () => {
      //   try {
      //     await AsyncStorage.setItem(
      //       "auth",
      //       JSON.stringify(response.authentication)
      //     );
      //   } catch (e) {
      //     console.log("persistAuth error" + e);
      //   }
      // };

      // persistAuth();
    }
  }, [response]);

  useEffect(() => {
    if (auth === null) return;
    getUserData();
  }, [auth]);

  // useEffect(() => {
  //   const getPersistedAuth = async () => {
  //     try {
  //       const savedAuthJsonValue = await AsyncStorage.getItem("auth");
  //       if (savedAuthJsonValue != null) {
  //         const authJSON = JSON.parse(savedAuthJsonValue);
  //         setAuth(authJSON);

  //         setRequireRefresh(
  //           !AuthSession.TokenResponse.isTokenFresh({
  //             expiresIn: authJSON.expiresIn,
  //             issuedAt: authJSON.issuedAt,
  //           })
  //         );
  //       }
  //     } catch (e) {
  //       console.log("get data from AsyncStorage error " + e);
  //     }
  //   };

  //   getPersistedAuth();
  // }, []);

  // useEffect(() => {
  //   const getPersistedUser = async () => {
  //     try {
  //       const user = await AsyncStorage.getItem("user");
  //       const userObject = JSON.parse(user);
  //       dispatch(setUser({ ...userObject }));
  //       console.log(user);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   getPersistedUser();
  // }, []);

  // useEffect(() => {
  //   console.log("REFRESH REQUIRED: ", requireRefresh);
  //   if (requireRefresh === false) return;
  //   refreshToken();
  // }, [requireRefresh]);

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
