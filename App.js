import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  PlatformConstants,
  View,
  Button,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeModules } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notes from "./pages/Notes";
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
const Stack = createNativeStackNavigator();

export default function App() {
  const handleClick = () => {};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Loader} />
        <Stack.Screen name="notas" component={Notes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const Loader = ({ navigation }) => {
  const handleClick = () => {
    navigation.navigate("notas");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <Text style={styles.loaderText}>NoteIt</Text>
      </View>
      <TouchableHighlight
        activeOpacity={0.8}
        style={styles.btn}
        onPress={handleClick}
      >
        <Text style={styles.textBtn}>Iniciar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: STATUSBAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    backgroundColor: "#D63AF9",
    padding: 20,
    borderRadius: "20%",
  },
  loaderText: {
    fontSize: "90%",
    fontWeight: "700",
    color: "#ffff",
  },
  btn: {
    marginTop: 20,
    width: "50%",
    padding: 20,
    backgroundColor: "transparent",
    borderColor: "#D63AF9",
    borderWidth: 3,
    borderRadius: 30,
  },
  textBtn: {
    textAlign: "center",
    paddingTop: "30",
    fontSize: 20,

    color: "#d63af9",
  },
});
