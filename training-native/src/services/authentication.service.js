import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCLientId = (Platform) => {
  if (Platform.OS === "ios") {
    return "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com";
  } else if (Platform.OS === "android") {
    return "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com";
  } else {
    console.log("Invalid platform - not handled");
  }
};

export const getUserFromStorage = async () => {
  const storedData = await AsyncStorage.getItem("user");
  if (storedData != null) {
    return JSON.parse(storedData);
  } else return null;
};

export const saveUserInStorage = async (email, name, picture, id) => {
  await AsyncStorage.setItem(
    "user",
    JSON.stringify({ email, name, picture, id })
  );
};

// const refreshToken = async () => {
//   const clientId = getCLientId();
//   console.log("TOKEN: ", auth.refreshToken);

//   try {
//     const tokenResult = await AuthSession.refreshAsync(
//       {
//         clientId,
//         refreshToken: auth.refreshToken,
//       },
//       {
//         tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
//       }
//     );

//     tokenResult.refreshToken = auth.refreshToken;
//     setAuth(tokenResult);
//     await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
//     setRequireRefresh(false);
//   } catch (error) {
//     console.log(error);
//   }
// };

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

// await AsyncStorage.setItem(
//   "user",
//   JSON.stringify({ email, name, picture, id })
// );
