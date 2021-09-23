import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDkDfoIJEiIp313imKyF4OcbfRjXMfx26M',
  authDomain: 'vue-music-1c631.firebaseapp.com',
  projectId: 'vue-music-1c631',
  storageBucket: 'vue-music-1c631.appspot.com',
  messagingSenderId: '841297038911',
  appId: '1:841297038911:web:0edded096561059b45f28a',
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
