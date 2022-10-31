import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/themed";

import { NativeModules } from "react-native";
import { useState } from "react";
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export default function Register({ navigation }) {
  const [user, setuser] = useState({ email: "", name: "" });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>INGRESAR</Text>
      <View style={styles.inputs}>
        <Input
          placeholder="Ingresa tu nombre"
          onChangeText={(name) => setuser({ ...user, name: name })}
        />
        <Input
          placeholder="Ingresa tu email"
          onChangeText={(email) => setuser({ ...user, email: email })}
        />
      </View>
      <Button
        title={"continuar"}
        color="secondary"
        buttonStyle={{ width: "100%" }}
        containerStyle={{ alignSelf: "flex-end" }}
        onPress={() => navigation.navigate("notas", { name: user.name })}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCD9E9",
    flexDirection: "column",
    padding: 20,
    paddingTop: STATUSBAR_HEIGHT,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 50,
    color: "#fff",
    padding: 10,
    backgroundColor: "#C62E65",
    fontWeight: "600",
    marginVertical: 100,
  },
  inputs: {
    width: "100%",
  },
});
