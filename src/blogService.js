// src/services/blogService.js
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';

export const createBlogPost = async (postData) => {
  try {
    const postsRef = collection(db, 'posts');
    const timestamp = new Date();
    const newPost = {
      ...postData,
      date: timestamp.toISOString(),
      createdAt: timestamp.getTime(),
      published: false, // Start as draft by default
      comments: [],
      lastModified: timestamp.toISOString()
    };
    
    const docRef = await addDoc(postsRef, newPost);
    console.log('Created post with ID:', docRef.id);
    
    return { 
      id: docRef.id, 
      ...newPost 
    };
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const fetchBlogPosts = async (includeUnpublished = false) => {
  try {
    const postsRef = collection(db, 'posts');
    let q;
    
    if (!includeUnpublished) {
      // Only fetch published posts for the blog page
      q = query(
        postsRef, 
        where('published', '==', true),
        orderBy('date', 'desc')
      );
      console.log('Fetching only published posts');
    } else {
      // Fetch all posts for admin dashboard
      q = query(postsRef, orderBy('date', 'desc'));
      console.log('Fetching all posts');
    }

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log(`Post ${doc.id}:`, {
        title: data.title,
        published: data.published,
        date: data.date
      });
      return {
        id: doc.id,
        ...data
      };
    });

    console.log('Total posts fetched:', posts.length);
    console.log('Published posts:', posts.filter(p => p.published).length);
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

const validatePostData = (postData) => {
  const requiredFields = ['title', 'content', 'published', 'date'];
  const missingFields = requiredFields.filter(field => !postData.hasOwnProperty(field));
  
  if (missingFields.length > 0) {
    console.error('Missing required fields:', missingFields);
    console.log('Post data:', postData);
    return false;
  }
  
  if (typeof postData.published !== 'boolean') {
    console.error('Published field is not a boolean:', postData.published);
    return false;
  }
  
  return true;
};

export const updateBlogPost = async (postId, updates) => {
  try {
    const postRef = doc(db, 'posts', postId);
    
    // First, get the current post data
    const currentPost = await getDoc(postRef);
    if (!currentPost.exists()) {
      throw new Error('Post not found');
    }

    const currentData = currentPost.data();
    const updatedData = {
      ...currentData,
      ...updates,
      lastModified: new Date().toISOString()
    };

    // Validate the data before updating
    if (!validatePostData(updatedData)) {
      throw new Error('Invalid post data structure');
    }

    // Update the document with validated data
    await updateDoc(postRef, updatedData);
    
    console.log('Successfully updated post:', {
      id: postId,
      ...updatedData
    });
    
    return { 
      id: postId,
      ...updatedData
    };
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    // Verify post exists before deletion
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) {
      throw new Error('Post not found');
    }
    await deleteDoc(postRef);
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export const fetchBlogPost = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      const post = { id: postDoc.id, ...postDoc.data() };
      console.log('Fetched single post:', post);
      return post;
    }
    throw new Error('Post not found');
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};