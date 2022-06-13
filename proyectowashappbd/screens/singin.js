import React, { useState, useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
} from 'react-native';
import { Block, Checkbox, Text, theme } from 'galio-framework';



import { showMessage, hideMessage } from 'react-native-flash-message';

import firebase from '../database/firebase';
import { Button, Icon, Input } from '../components';
import { Images, argonTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

export default function SingIn({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.docs.forEach((doc) => {
          const { name, mail, password,profile } = doc.data();
          users.push({
            id: doc.id,
            name,
            mail,
            password,
            profile,
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
  
  const LogUser = () => {
    global.name = ' ';
    global.profile = '';
    var validacion = false;
    for (let clavevalor of users) {
      if (state.name.toLowerCase() == clavevalor.mail.toLowerCase() &&
          state.password == clavevalor.password)
       {
        showMessage({
          message: 'Bienvenido',
          description: 'Datos introducidos correctamente',
          type: 'success',
        });
        navigation.navigate('Hogar');
        validacion = true;
        global.name = clavevalor.name;
        global.profile = clavevalor.profile;
        global.mail = clavevalor.mail;
        
        break;
        
      }
    }

   


    if (validacion == false) {
      showMessage({
        message: 'Inicio de sesion no valido',
        description: 'El usuario o contraseña son incorrectos',
        type: 'danger',
      });
    }
  };

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={require('../assets/imgs/fondo.png')}
        style={{ width, height, zIndex: 1 }}>
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.06} middle></Block>
              <Block flex={0.06} middle></Block>
              <Block flex={0.3} middle>
                <Image
                  source={require('../assets/imgs/log.png')}
                  style={styles.logo2}
                />
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
                      placeholder="Correo"
                      onChangeText={(value) => handleChangeText(value, 'name')}
                      value={state.name}
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
                  </Block>
                  <Block flex={0.8} middle>
                    <Image source={Images.ArgonLogo} style={styles.logo} />
                  </Block>

                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={() => LogUser()}>
                      <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                        Iniciar Sesion
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
    height: height * 0.6,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 60,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 40,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 1,
    overflow: 'hidden',
  },
  logo: {
    paddingTop: '200',
    borderColor: '#8898AA',
    flex: 1,
    width: 200,
    zIndex: 2,
    position: 'relative',
  },
  logo2: {
    paddingTop: '200',
    borderColor: '#8898AA',
    flex: 1,
    width: 100,
    zIndex: 2,
    position: 'relative',
  },

  inputIcons: {
    marginRight: 12,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});
