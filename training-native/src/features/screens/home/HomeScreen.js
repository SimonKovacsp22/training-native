import { View, Text, Image, Button } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../reducers/authSlice";
import SafeArea from "../../../components/SafeArea";
import { ref, set, onValue, push } from "firebase/database";
import { database } from "../../../services/database.service";
import { saveNewTraining } from "../../../services/database.service";

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);
  const { user } = useSelector(authSelector);

  useEffect(() => {
    const userRef = ref(database, "users/" + user.id);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  }, []);

  return (
    <SafeArea>
      <View>
        <Text>{user.name}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: user.picture }}
        />
      </View>
      {userData !== null && <Text>{userData.email}</Text>}
      <Button
        title="Add training"
        onPress={() =>
          saveNewTraining(user.id, "training2", ["1", "2"], Date.now())
        }
      ></Button>
    </SafeArea>
  );
};
export default HomeScreen;
