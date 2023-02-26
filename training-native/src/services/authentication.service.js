import { initializeApp } from "firebase/app";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";

// webClinetId = 493381787421-ffh7q873rffm02l6csb6m34grr244jpm.apps.googleusercontent.com

const firebaseConfig = {
  apiKey: "AIzaSyDu7u6BhKzEl2simJoUhMUtvMmHIKidBdM",
  authDomain: "food-to-go-376717.firebaseapp.com",
  projectId: "food-to-go-376717",
  storageBucket: "food-to-go-376717.appspot.com",
  messagingSenderId: "493381787421",
  appId: "1:493381787421:web:c861124155317ffb340bf4",
};

const app = initializeApp(firebaseConfig);

export const googleConfig = () => {
  GoogleSignin.configure({
    scopes: ["email"], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      "493381787421-ffh7q873rffm02l6csb6m34grr244jpm.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { accessToken, idToken } = await GoogleSignin.signIn();
  } catch (e) {
    console.log(e);
  }
};
