import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeModules } from "react-native";
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
import { Button } from "@rneui/themed";
import { Dialog } from "@rneui/themed";
import { Input } from "@rneui/themed";
import { Card } from "@rneui/themed";
import axios from "axios";
//import { supabase } from "../components/supabase";
//db password: NoteIt2023-

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZG92dW9ya3RpbXVkc3Nzb3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5NTI5MjUsImV4cCI6MTk5MjUyODkyNX0.i90U5CHaVRrDKRYflRJCiZ09ennmOfWkroEI-sPrhK0";

export default function Notes({ navigation, route }) {
  const [visible, setvisible] = useState(false);
  const [note, setNote] = useState({ fecha: "", asunto: "", actividad: "" });
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const data = await axios.get(
        "https://dpdovuorktimudsssovp.supabase.co/rest/v1/notes?select=*",
        {
          headers: { apikey: apiKey, Authorization: `Bearer ${apiKey}` },
        }
      );
      setnotes(data.data);
    } catch (error) {
      console.error(error);
    }
    // setnotes(data);
    // setNote({});
    // setvisible(false);
  };
  const handleCreate = async () => {
    try {
      const data = await axios.post(
        "https://dpdovuorktimudsssovp.supabase.co/rest/v1/notes",
        { ...note },
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
        }
      );
      setNote({});
      setvisible(false);
      data && getNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Tus notas</Text>
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
        <Text>Fecha</Text>
        <Input onChangeText={(e) => setNote({ ...note, fecha: e })}></Input>
        <Text>Asunto</Text>
        <Input onChangeText={(e) => setNote({ ...note, asunto: e })}></Input>
        <Text>Actividad</Text>
        <Input onChangeText={(e) => setNote({ ...note, actividad: e })}></Input>

        <Dialog.Actions>
          <Dialog.Button title="Crear" onPress={handleCreate} />
        </Dialog.Actions>
      </Dialog>

      <View style={{ width: "100%", marginTop: 30 }}>
        {notes.length > 0 &&
          notes.map((n, i) => {
            return (
              <Card>
                <Card.Title
                  style={{
                    textAlign: "right",
                    fontSize: 12,
                    marginBottom: 12,
                    color: "#C62E65",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  {n.fecha}
                </Card.Title>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    marginTop: 12,
                    marginBottom: 12,
                    color: "#7A46AF",
                  }}
                >
                  {n.asunto}
                </Text>
                <Card.Divider></Card.Divider>
                <Text>{n.actividad}</Text>
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
