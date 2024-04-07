import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "chat-app-ac3b3.firebaseapp.com",
	projectId: "chat-app-ac3b3",
	storageBucket: "chat-app-ac3b3.appspot.com",
	messagingSenderId: "442272701722",
	appId: "1:442272701722:web:1b786c05cbd28da069a0a3",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
