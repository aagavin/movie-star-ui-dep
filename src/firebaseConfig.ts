import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDxGeRlnsizPn-A3KUx6y6HPif602aOFtM",
  authDomain: "movie-star-py.firebaseapp.com",
  databaseURL: "https://movie-star-py.firebaseio.com",
  projectId: "movie-star-py",
  storageBucket: "movie-star-py.appspot.com",
  messagingSenderId: "587247640415",
  appId: "1:587247640415:web:db8136284066efab"
};

export const firebaseApp = firebase.initializeApp(config);

export const firebaseAppAuth = firebaseApp.auth();

export const providers = {
  // emailProvider: new firebase.auth.EmailAuthProvider(),
  // googleProvider: new firebase.auth.GoogleAuthProvider(),
};
