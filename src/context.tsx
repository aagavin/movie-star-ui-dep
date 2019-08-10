import { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

const addFavourite = async (uid: string, fav: {}) => {
  return firebase
    .firestore()
    .collection('favs')
    .doc(uid)
    .set(fav, { merge: true });
};

const removeFavourite = async (uid: string, delId) => {
  const delFav = {};
  delFav[delId] = firebase.firestore.FieldValue.delete();
  return firebase
    .firestore()
    .collection('favs')
    .doc(uid)
    .update(delFav);
}

const getFavourites = async (uid: string) => {
  return firebase
    .firestore()
    .collection('favs')
    .doc(uid)
    .get();
}
export const init = {
  user: {},
  signInWithEmailAndPassword: null,
  createUserWithEmailAndPassword: null,
  favourites: [],
  error: null,
  addFavourite,
  removeFavourite,
  getFavourites
}
const UserContext = createContext({});

export default UserContext