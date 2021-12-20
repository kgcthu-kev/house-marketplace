// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJD2no-gXfeAqKqEWWWgwsaeMBg_6BYbI',
  authDomain: 'house-marketplace-4f7e0.firebaseapp.com',
  projectId: 'house-marketplace-4f7e0',
  storageBucket: 'house-marketplace-4f7e0.appspot.com',
  messagingSenderId: '463655184893',
  appId: '1:463655184893:web:5ffd2b00c2959670855194',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
