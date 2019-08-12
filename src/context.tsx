import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import { createContext } from 'react';

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
  // tslint:disable-next-line: object-literal-sort-keys
  signInWithEmailAndPassword: null,
  createUserWithEmailAndPassword: null,
  favourites: [],
  error: null,
  addFavourite,
  removeFavourite,
  getFavourites
}
const UserContext = createContext(init);

export default UserContext