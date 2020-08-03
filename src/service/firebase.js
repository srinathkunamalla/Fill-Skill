import * as app from 'firebase';
const config = {
  apiKey: "AIzaSyAvB34CK7Zdzp4-tikpRFZwszyR40y-xfg",
  authDomain: "gapfinder-a7fce.firebaseapp.com",
  databaseURL: "https://gapfinder-a7fce.firebaseio.com",
  projectId: "gapfinder-a7fce",
  storageBucket: "gapfinder-a7fce.appspot.com",
  messagingSenderId: "290191860208",
  appId: "1:290191860208:web:32ea802e52ca8e49693d35",
  measurementId: "G-T9XL0MZMPV"
}
const firebase = app.initializeApp(config);
export default firebase
