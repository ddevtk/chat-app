import db from '../db/firestore';
import firebase from 'firebase/app';

const toSnapshotData = (snapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const fetchChats = async () => {
  const snapshot = await db.collection('chats').get();
  return toSnapshotData(snapshot);
};

export const createChat = async (chat) => {
  const docRef = await db.collection('chats').add(chat);
  return docRef.id;
};

export const joinChat = async (userId, chatId) => {
  const userRef = db.collection('profiles').doc(userId);
  const chatRef = db.collection('chats').doc(chatId);

  await userRef.update({
    joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef),
  });
  await chatRef.update({
    joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef),
  });
};
