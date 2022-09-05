import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyCD9HERozweNiyF1jIGXJ0QcOL6Msm2KfM",
  authDomain: "todo-app-321.firebaseapp.com",
  projectId: "todo-app-321",
  databaseURL:
    "https://todo-app-321-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "todo-app-321.appspot.com",
  messagingSenderId: "131258921609",
  appId: "1:131258921609:web:2f6f0000c2720a44a80c58",
  measurementId: "G-2EBP71LLG6",
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const gAuth = getAuth(app)
export const firebaseStore = getFirestore(app)
export const database = getDatabase(app)
// Initialize Firebase Authentication and get a reference to the service
