import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

// ✅ Use environment variable for apiKey
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || process.env.REACT_APP_API_KEY,
  authDomain: "eduverse-673a8.firebaseapp.com",
  projectId: "eduverse-673a8",
  storageBucket: "eduverse-673a8.appspot.com",
  messagingSenderId: "281129383970",
  appId: "1:281129383970:web:71ab9a1333ae1dd8e2b27b",
  measurementId: "G-TM94GMQ274"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubprovider = new GithubAuthProvider();

export { auth, googleProvider, facebookProvider, githubprovider };
