import db from '../db/firestore';

export const fetchChats = () => {
  return db
    .collection('chats')
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        return { id: doc.id, ...doc.data() };
      });
    });
};
