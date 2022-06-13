import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  Alert,
} from 'react-native';
import { Block, Checkbox, Text, theme } from 'galio-framework';
import { showMessage, hideMessage } from 'react-native-flash-message';

import SingIn from '../screens/singin';
import Perfil from '../screens/Profile';

import Elementos from '../screens/Elements';

import firebase from '../database/firebase';

import { Button, Icon, Input } from '../components';
import { Images, argonTheme } from '../constants';

const { width, height } = Dimensions.get('screen');
const create3ButtonAlert = () =>
  Alert.alert(
    'Condiciones',
    'Esto serviría para redirigir',
    [{ text: 'Entendido', onPress: () => console.log('OK Pressed') }],
    { cancelable: false }
  );

export default function Register({ navigation }) {
  //const { navigation } = this.props;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
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

  const initalState = {
    name: '',
    mail: '',
    password: '',
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const SaveNewUser = async () => {
    var validacion = true;
    for (let clavevalor of users) {
      if (state.mail.toLowerCase() == clavevalor.mail.toLowerCase()) {
        showMessage({
          message: 'Lo sentimos',
          description: 'El correo indicado ya ha sido utilizado',
          type: 'danger',
        });
        validacion = false;
        break;
      }
    }
    if (state.password.length < 6) {
      validacion = false;
      showMessage({
        message: 'Ups!',
        description: 'Debe ingresar una contraseña de mas de 6 caracteres',
        type: 'danger',
      });
    }
    if (state.name === '' || state.mail == ' ' || state.password == ' ') {
      validacion = false;
      showMessage({
        message: 'Lo sentimos',
        description: 'Todas las entradas deben ser completadas',
        type: 'warning',
      });
    }

    if (validacion) {
      await firebase.firestore().collection('users').add({
        name: state.name,
        mail: state.mail,
        password: state.password,
      });
      showMessage({
        message: 'Usuario creado',
        description: 'Disfruta la experiencia',
        animationDuration: 450,
        duration: 3850,
        type: 'info',
      });
      global.name = state.name
      navigation.navigate('Hogar');
    }
  };

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}>
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.06} middle></Block>
              <Block flex={0.06} middle></Block>
              <Block flex={0.17} middle>
                <Image source={Images.ArgonLogo} style={styles.logo} />
              </Block>
              <Block flex={0.06} middle></Block>
              <Block flex={0.06} middle></Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Nombre y Apellido"
                      onChangeText={(value) => handleChangeText(value, 'name')}
                      value={state.name}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Correo"
                      onChangeText={(value) => handleChangeText(value, 'mail')}
                      value={state.mail}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      password
                      borderless
                      placeholder="Contraseña"
                      onChangeText={(value) =>
                        handleChangeText(value, 'password')
                      }
                      value={state.password}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                    <Block center style={styles.passwordCheck}>
                      <Text size={12} color={argonTheme.COLORS.MUTED}>
                        Llévame al
                      </Text>
                      <Button
                        onPress={() => navigation.navigate('SingIn')}
                        style={{ marginTop: -35, width: 800, height: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 18,
                        }}>
                        Inicio de sesion
                      </Button>
                    </Block>
                  </Block>
                  <Block row width={width * 0.4} marginTop={-50}>
                    <Checkbox
                      checkboxStyle={{
                        borderWidth: 3,
                      }}
                      color={argonTheme.COLORS.PRIMARY}
                      label="Acepto todas las "
                    />
                    <Button
                      onPress={create3ButtonAlert}
                      style={{ marginleft: 0, width: 100 }}
                      color="transparent"
                      textStyle={{
                        color: argonTheme.COLORS.PRIMARY,
                        fontSize: 16,
                      }}>
                      Condiciones
                    </Button>
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={() => SaveNewUser()}>
                      <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                        Crear Cuenta
                      </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  logo: {
    paddingTop: '200',
    borderColor: '#8898AA',
    flex: 1,
    width: 250,
    zIndex: 2,
    position: 'relative',
  },

  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
    marginTop: 10,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});
