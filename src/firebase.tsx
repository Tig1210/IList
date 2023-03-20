import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyA9nlMbN8ndvF8rHx9gzKXqFKqGzVTGTC8',
  authDomain: 'ilist-467dd.firebaseapp.com',
  projectId: 'ilist-467dd',
  storageBucket: 'ilist-467dd.appspot.com',
  messagingSenderId: '570345339173',
  appId: '1:570345339173:web:8c032686c9429faa7582cc',
  measurementId: 'G-P9HM30314B',
}
const app = initializeApp(config)
export const db = getFirestore(app)
