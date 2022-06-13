import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Elementos from '../screens/Elements';
import firebase from "../database/firebase";

const Pro = (props, navigation) =>  {
  const initialState = {
    id: "",
    name: "",
    mail: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.firestore().collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.firestore().collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("Elementos");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Eliminando usuario",
      "¿Está seguro?",
      [
        { text: "Sí", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.firestore().collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      mail: user.mail,
      password: user.password,
    });
    setUser(initialState);
    navigation.navigate("Elementos");
  };

  useEffect(() => {
     getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="mail"
          placeholder="Correo"
          style={styles.inputGroup}
          value={user.mail}
          onChangeText={(value) => handleTextChange(value, "mail")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Contraseña"
          autoCompleteType="userpassword"
          style={styles.inputGroup}
          value={user.password}
          onChangeText={(value) => handleTextChange(value, "password")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default Pro;