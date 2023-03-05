export const getCLientId = (Platform) => {
  if (Platform.OS === "ios") {
    return "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com";
  } else if (Platform.OS === "android") {
    return "397754311669-hqbf8hmrkrgrah1sk6dq4du140mbni5i.apps.googleusercontent.com";
  } else {
    console.log("Invalid platform - not handled");
  }
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
