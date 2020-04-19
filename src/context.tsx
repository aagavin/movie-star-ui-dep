import * as firebase from 'firebase/app';
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
};

export const getFavourites = async (uid: string) => {
  return firebase
    .firestore()
    .collection('favs')
    .doc(uid)
    .get();
};

export const setContext = (contextFx: React.Dispatch<any>, context: any, properties: any, favourites: any = []) => {
  contextFx({
    ...init,
    ...context,
    user: properties.user,
    signOut: properties.signOut,
    signInWithEmailAndPassword: properties.signInWithEmailAndPassword,
    createUserWithEmailAndPassword: properties.createUserWithEmailAndPassword,
    favourites,
    error: properties.error,
  });
};

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
const UserContext = createContext(init);

export default UserContext