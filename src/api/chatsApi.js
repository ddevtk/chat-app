import db from '../db/firestore';

const toSnapshotData = (snapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const fetchChats = async () => {
  const snapshot = await db.collection('chats').get();
  return toSnapshotData(snapshot);
};

export const createChat = async (chat) => {
  try {
    const docRef = await db.collection('chats').add(chat);
    console.log(docRef);
    return docRef;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
