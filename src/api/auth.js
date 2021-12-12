import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../db/firestore';

const createUserProfile = async (userProfile) => {
  await db.collection('profiles').doc(userProfile.uid).set(userProfile);
};

export const register = async ({ email, password, username, avatar }) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await createUserProfile({
      uid: user.uid,
      username,
      email,
      avatar,
      joinedChats: [],
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const login = async ({ email, password }) => {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  console.log(user);
};

export const logout = async () => {
  await firebase.auth().signOut();
};

export const onAuthStateChange = (onAuthFn) =>
  firebase.auth().onAuthStateChanged(onAuthFn);
