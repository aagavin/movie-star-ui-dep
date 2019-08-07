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

const UserContext = createContext(
  {
    user: {},
    signInWithEmailAndPassword: null,
    createUserWithEmailAndPassword: null,
    error: null,
    addFavourite,
    removeFavourite,
    getFavourites
  }
);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext