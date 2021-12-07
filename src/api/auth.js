import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../db/firestore';

const createUserProfile = async (userProfile) => {
  console.log(userProfile);
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
