import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDkDfoIJEiIp313imKyF4OcbfRjXMfx26M',
  authDomain: 'vue-music-1c631.firebaseapp.com',
  projectId: 'vue-music-1c631',
  storageBucket: 'vue-music-1c631.appspot.com',
  messagingSenderId: '841297038911',
  appId: '1:841297038911:web:0edded096561059b45f28a',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();

export const firestore = firebase.firestore();

export const usersCollection = firestore.collection('users');
