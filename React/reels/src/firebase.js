import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJVsiPRPp5diCCYVBUcWJbB2a_CE6Nxls",
  authDomain: "reels-4d89b.firebaseapp.com",
  projectId: "reels-4d89b",
  storageBucket: "reels-4d89b.appspot.com",
  messagingSenderId: "970552855223",
  appId: "1:970552855223:web:92921ab1b6f294b9839b32"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage()