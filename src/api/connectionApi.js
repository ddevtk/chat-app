import firebase from 'firebase/app';
import 'firebase/database';
import db from '../db/firestore';

export const setUserOnlineStatus = (uid, isOnline) => {
  const userRef = db.collection('profiles').doc(uid);
  return userRef.update({
    state: isOnline,
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
