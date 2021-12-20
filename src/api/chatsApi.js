import db from '../db/firestore';
import firebase from 'firebase/app';

export const fetchChats = async () => {
  const snapshot = await db.collection('chats').get();

  const chats = snapshot.docs.map((doc) => {
    const chat = doc.data();
    return { id: doc.id, ...chat };
  });
  return chats;
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

export const subscribeToChat = async (chatId) => {
  const snapshot = await db.collection('chats').doc(chatId).get();
  const chat = { id: snapshot.id, ...snapshot.data() };
  return chat;
};
