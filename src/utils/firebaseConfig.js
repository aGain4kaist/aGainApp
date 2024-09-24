// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDSw153L7JKyvNudgdYpZVUiA_MRRGF9_s',
  authDomain: 'again-server-5156a.firebaseapp.com',
  projectId: 'again-server-5156a',
  storageBucket: 'again-server-5156a.appspot.com',
  messagingSenderId: '476144887234',
  appId: '1:476144887234:web:84452d61eb6b2391cda25b',
  measurementId: 'G-KZE6H374G2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
