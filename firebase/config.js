import { firebaseConfig } from "./firebase-keys";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
