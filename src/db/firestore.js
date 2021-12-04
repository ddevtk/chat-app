import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCgqk4kWClwLstQ5VWMdJ_v0ocQanqXi44',
  authDomain: 'chat-app-electron-b2308.firebaseapp.com',
  projectId: 'chat-app-electron-b2308',
  storageBucket: 'chat-app-electron-b2308.appspot.com',
  messagingSenderId: '402675671435',
  appId: '1:402675671435:web:37cad28ddddfb7c4a98f8e',
  measurementId: 'G-5D6S6K0KG2',
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;
