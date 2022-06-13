import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { Images, argonTheme } from '../constants';

import firebase from "../database/firebase";
import Hogar from "../screens/Home";
import SingIn from '../screens/singin';
import Pro from '../screens/Pro';


export default function Elements({navigation}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, mail, password } = doc.data();
        users.push({
          id: doc.id,
          name,
          mail,
          password,
        });
      });
      setUsers(users);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => navigation.navigate("Hogar")}
        title="Regresar al inicio"
      > </Button>
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
             onPress={() => {
              navigation.navigate("Pro", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.mail}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
}

