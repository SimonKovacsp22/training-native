import { StatusBar } from "expo-status-bar";
import store from "./store";
import { Provider } from "react-redux";
import {
  useFonts as useAnton,
  Anton_400Regular,
} from "@expo-google-fonts/anton";
import {
  useFonts as useDMSans,
  DMSans_400Regular,
  DMSans_500Medium,
} from "@expo-google-fonts/dm-sans";
import Navigation from "./src/infrastructure/navigation";
import "react-native-gesture-handler";
import { Text } from "react-native";

export default function App() {
  const [antonLoaded] = useAnton({
    Anton_400Regular,
  });
  const [latoLoaded] = useDMSans({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  if (!antonLoaded || !latoLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
    </Provider>
  );
}
