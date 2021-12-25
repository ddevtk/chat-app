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

export const subscribeToChat = (chatId, onSubscribe) => {
  return db
    .collection('chats')
    .doc(chatId)
    .onSnapshot((snapshot) => {
      const chat = { id: snapshot.id, ...snapshot.data() };
      onSubscribe(chat);
    });
};

export const subscribeToJoinedUser = (userId, onSubscribe) => {
  return db
    .collection('profiles')
    .doc(userId)
    .onSnapshot((snapshot) => {
      onSubscribe(snapshot.data());
    });
};

export const sendMessage = (message, chatId) => {
  return db
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .doc(message.timestamp)
    .set(message);
};

export const subscribeToMessage = (chatId, onSubscribe) => {
  return db
    .doc(`chats/${chatId}`)
    .collection('messages')
    .onSnapshot((snapshot) => {
      onSubscribe(snapshot.docChanges());
    });
};
