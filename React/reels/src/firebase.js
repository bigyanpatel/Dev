import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgf_CMm6Zfpuaj7kz-GOrr9reOVIhtZSM",
    authDomain: "reels-ef730.firebaseapp.com",
    projectId: "reels-ef730",
    storageBucket: "reels-ef730.appspot.com",
    messagingSenderId: "749222474359",
    appId: "1:749222474359:web:e0e8e332493f871196cc72",
    measurementId: "G-6ZJKCD8BMG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage()