
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdpgQ4PmmQjYHxZS-Mhei0FMuphRQS-PY",
  authDomain: "miniblog-e548a.firebaseapp.com",
  projectId: "miniblog-e548a",
  storageBucket: "miniblog-e548a.firebasestorage.app",
  messagingSenderId: "720118202245",
  appId: "1:720118202245:web:8d215d2623e453d7e44eec",
  measurementId: "G-H79YCYBHYC"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

export { db, app, analytics };
             