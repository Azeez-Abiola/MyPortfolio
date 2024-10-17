// src/services/blogService.js
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// Add a new blog post
export const addBlogPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};

// Fetch all blog posts
export const fetchBlogPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return posts;
  } catch (e) {
    console.error('Error fetching documents: ', e);
    throw e;
  }
};