
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAUMeJWULzCGnN5qX5TUcXGjOWK6CwQ2vM",
  authDomain: "relatetv-c544b.firebaseapp.com",
  projectId: "relatetv-c544b",
  storageBucket: "relatetv-c544b.appspot.com",
  messagingSenderId: "137448032427",
  appId: "1:137448032427:web:29252769dd8bb1c05b4fee",
  measurementId: "G-8FW86C8NPH"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);