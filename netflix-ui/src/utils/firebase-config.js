
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCaKrSDWbKxTaVeYvhO4swRL5ION2ZMfm4",
  authDomain: "react-netflix-clone-693fd.firebaseapp.com",
  projectId: "react-netflix-clone-693fd",
  storageBucket: "react-netflix-clone-693fd.appspot.com",
  messagingSenderId: "647256441307",
  appId: "1:647256441307:web:c888efbf9809c82c49e7fe",
  measurementId: "G-XH3MGMKTTX"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);



