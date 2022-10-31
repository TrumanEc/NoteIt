import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeModules } from "react-native";
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
import { Button } from "@rneui/themed";
import { Dialog } from "@rneui/themed";
import { Input } from "@rneui/themed";
import { Card } from "@rneui/themed";

export default function Notes({ navigation, route }) {
  const [visible, setvisible] = useState(false);
  const [note, setNote] = useState({ title: "", contnet: "" });
  const [notes, setnotes] = useState([]);

  const handleCreate = () => {
    setnotes([...notes, note]);
    setNote({ title: "", contnet: "" });
    setvisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{route.params.name}</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={"Crear Nota"}
          buttonStyle={{
            width: "100%",
            borderRadius: 20,
            backgroundColor: "#C62E65",
          }}
          onPress={() => setvisible(true)}
        ></Button>
      </View>
      <Dialog isVisible={visible} onBackdropPress={() => setvisible(false)}>
        <Dialog.Title title="Crear Nota" />
        <Text>Titulo</Text>
        <Input onChangeText={(e) => setNote({ ...note, title: e })}></Input>
        <Text>Contenido</Text>
        <Input onChangeText={(e) => setNote({ ...note, content: e })}></Input>

        <Dialog.Actions>
          <Dialog.Button title="Crear" onPress={handleCreate} />
        </Dialog.Actions>
      </Dialog>

      <View style={{ width: "100%", marginTop: 30 }}>
        {notes &&
          notes.map((n, i) => {
            return (
              <Card>
                <Card.Title>{n.title}</Card.Title>
                <Card.Divider></Card.Divider>
                <Text>{n.content}</Text>
              </Card>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D2C6E",
    flexDirection: "column",
    padding: 20,
    paddingTop: STATUSBAR_HEIGHT,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    borderBottomWidth: 3,
    padding: 10,
    borderColor: "#7A46AF",
    marginBottom: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
