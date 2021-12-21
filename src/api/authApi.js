import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../db/firestore';

const createUserProfile = async (userProfile) => {
  await db.collection('profiles').doc(userProfile.uid).set(userProfile);
};

export const getUserProfile = async (uid) => {
  const snapshot = await db.collection('profiles').doc(uid).get();
  return snapshot.data();
};

export const register = async ({
  email,
  password,
  username,
  avatarUrl,
  avatarStorage,
}) => {
  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  const userProfile = {
    uid: user.uid,
    username,
    email,
    avatarUrl,
    avatarStorage,
    joinedChats: [],
  };
  await createUserProfile(userProfile);
  return userProfile;
};

export const login = async ({ email, password }) => {
  const { user } = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  const userProfile = await getUserProfile(user.uid);
  return userProfile;
};

export const logout = async () => {
  await firebase.auth().signOut();
};

export const onAuthStateChange = (onAuthFn) =>
  firebase.auth().onAuthStateChanged(onAuthFn);
