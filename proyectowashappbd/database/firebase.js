import * as firebase from "firebase";

const config = {
  
apiKey: "AIzaSyARuwvS01EWoSSUmGc6fxYIuNGrCNvYiFw",
authDomain: "react-native-firebase-6a76b.firebaseapp.com",
projectId: "react-native-firebase-6a76b",
storageBucket: "react-native-firebase-6a76b.appspot.com",
messagingSenderId: "39220464750",
appId: "1:39220464750:web:0b1e38f31661e4ee84aa7f"
};


export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();



