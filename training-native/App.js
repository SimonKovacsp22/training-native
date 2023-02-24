import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
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

export default function App() {
  const [antonLoaded] = useAnton({
    Anton_400Regular,
  });
  const [latoLoaded] = useDMSans({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  if (!antonLoaded || !latoLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
