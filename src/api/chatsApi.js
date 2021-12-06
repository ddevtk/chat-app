import db from '../db/firestore';

const toSnapshotData = (snapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const fetchChats = async () => {
  const snapshot = await db.collection('chats').get();
  return toSnapshotData(snapshot);
};
