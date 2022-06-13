import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Image,
  ImageBackground,
  Alert
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Circle,
} from 'react-native-maps';
import { showMessage, hideMessage } from 'react-native-flash-message';
import './singin';

console.log('Home');
console.log(global.mail);

import { Block, theme } from 'galio-framework';

import firebase from '../database/firebase';
import { Card } from '../components';
import articles from '../constants/articles';
import Images from '../constants/Images';
//import { mapStyle } from "../constants/mapStyle";

const GOOGLE_PLACES_API_KEY = 'AIzaSyAPIZhEq18tECuDaeMu6IrQ0hsufR-KoOw';

const { height, width } = Dimensions.get('screen');

export default function App() {
  const [pin, setPin] = React.useState({
    latitude: 19.22207,
    longitude: -70.52956,
  });
  const [region, setRegion] = React.useState({
    latitude: 19.22207,
    longitude: -70.52956,
    latitudeDelta: 0.00022,
    longitudeDelta: 0.0221,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.docs.forEach((doc) => {
          const { name, mail, password, profile, pedido } = doc.data();
          users.push({
            id: doc.id,
            name,
            mail,
            password,
            profile,
            pedido,
          });
        });
        setUsers(users);
      });
  }, []);

  //for (let clavevalor of users){
  //           console.log(clavevalor.password)
  //           };
  //

  const initalState = {
    name: '',
    password: '',
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const ConfirmacionViaje = () =>
    Alert.alert(
      'Confirmación',
      'Valide este pedido',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Realizar',
          onPress: () =>
            firebase.firestore().collection('users').add({
              mail: global.mail,
              pedido: state.pedido,
            }),
        },
      ],
      { cancelable: false }
    );

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: 10000,
        marginTop: 0,
        flex: 1,
      }}>
      <GooglePlacesAutocomplete
        color="black"
        placeholder="¿A dónde quieres que lleguemos?"
        onChangeText={(value) => handleChangeText(value, 'name')}
        value={state.name}
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          state.pedido = data.description;
          ConfirmacionViaje ();
          console.log(data.description);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.00022,
            longitudeDelta: 0.0221,
          });
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'ES',
          components: 'country:DO',
          types: 'establishment',
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            padding: 10,
            width: '100%',
            zIndex: 1,
            backgroundColor: 'rgba(108,186,216,0.5)',
          },
          listView: { backgroundColor: 'white' },
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.22207,
          longitude: -70.52956,
          latitudeDelta: 0.00022,
          longitudeDelta: 0.0221,
        }}
        provider="google">
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
        <Marker
          coordinate={pin}
          pinColor="#2C87BF"
          draggable={true}
          onDragStart={(e) => {
            console.log('Drag start', e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}>
          <Callout>
            <Text>Estoy aquí</Text>
          </Callout>
        </Marker>
        <Circle
          center={pin}
          radius={300}
          strokeColor={'#2C87BF'}
          fillColor={'rgba(108,186,216,0.5)'}
        />
      </MapView>

      <ScrollView style={{ marginTop: 10, flex: 1 }}>
        <Text style={styles.titleText}>Experiencias de nuestros usuarios </Text>
        <Card item={articles[3]} horizontal />
        <Card item={articles[4]} full />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 500,
  },
  titleText: {
    flex: 1,
    width: Dimensions.get('window').width,
    paddingVertical: theme.SIZES.BASE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#2C87BF',
    color: 'white',
    textDecorationStyle: 'solid',
  },
});
