import firebase from 'firebase/app';
import db from '../db/firestore';

export const setUserOnlineStatus = async (uid, isOnline) => {
  const userRef = db.collection('profiles').doc(uid);
  await userRef.update({
    state: isOnline,
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
