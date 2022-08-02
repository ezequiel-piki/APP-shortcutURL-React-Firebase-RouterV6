// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"      ;
import {   getAuth     } from'firebase/auth'      ;
import { getFirestore  } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOreCQj9ZbrqyO6qFH7G5fyj4LtX5-ekI",
  authDomain: "react-julio-agosto.firebaseapp.com",
  projectId: "react-julio-agosto",
  storageBucket: "react-julio-agosto.appspot.com",
  messagingSenderId: "383778804544",
  appId: "1:383778804544:web:4a25306f50f8af7ced60a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db  =getFirestore(app);

export{auth,db};