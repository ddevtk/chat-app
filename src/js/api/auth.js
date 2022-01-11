import db from '../db/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

const createUserProfile = (userProfile) => {
  db.collection('profiles').doc(userProfile.uid).set(userProfile);
};

export const getUserProfile = (uid) => {
  return db
    .collection('profiles')
    .doc(uid)
    .get()
    .then((snapshot) => snapshot.data());
};

export const register = async ({ email, password, username, avatar }) => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const userProfile = { uid: user.uid, username, email, avatar, joinedChats: [] };
    await createUserProfile(userProfile);
    return userProfile;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

export const logout = () => firebase.auth().signOut();

export const login = async ({ email, password }) => {
  const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
  const userProfile = await getUserProfile(user.uid);
  return userProfile;
};

export const onAuthStageChanges = (onAuth) => firebase.auth().onAuthStateChanged(onAuth);
