   // src/firebase.js
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';
   import { getStorage } from 'firebase/storage';

   const firebaseConfig = {
     apiKey: "AIzaSyAIqOaZ-_sZsYN8S6-i99Mow093zHZYVBM",
     authDomain: "abiolaportfolio.firebaseapp.com",
     projectId: "abiolaportfolio",
     storageBucket: "abiolaportfolio.appspot.com",
     messagingSenderId: "723518009678",
     appId: "1:723518009678:web:a49848dafae83ff13fee1f"

   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const storage = getStorage(app);