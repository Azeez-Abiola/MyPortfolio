import {doc, getDoc, addDoc, updateDoc, deleteDoc, arrayUnion, getDocs, collection} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { db } from "../../firebase";
import axios from "axios";

const postCollection = collection(db, "posts"); //am just rerencing this pos collectio for resuability later on


export const fetchBlogPosts = async (showUnpublished = false) => {
    try{
      const queryDatabase = await getDocs(postCollection).orderBy("date", "desc").get();
      const posts = queryDatabase.docs.map(doc => ({id: doc.id, ...doc.data()}));
      return showUnpublished ? posts : posts.filter(post => post.published);
    } catch(error){
      console.error("Error Fetching entire posts in the database", error);
      throw error;
    }
  };
  
  export const fetchBlogPost = async (id) => {
    if(!id) return("id is required to fetch a post"); // so boss i just check if the id exists or the id passed in successfully before we do anything to avoid crashing
    
    // if it goes well then we can now do the logic
    try{
      const postDoc = await getDoc(doc(postCollection, id));
      // now we go come have to check if the doc with the id exists in our posts collection by using the built in .exists() method from firebase 
      if(postDoc.exists()){
        return {sucess: true, message: "all posts fetched", id: postDoc.id, ...postDoc.data()};
      } else{
        return("Post Not Found it doesn't exist in the post collection!");
      }
    } catch(error){
      console.error("error fetching post", error);
      throw error;
    }
  };
   
  export const createBlogPost = async (post) => {
   if(!post) return("No post or invalid post!");
    try{
      const newPostRef = await addDoc(postCollection, {...post, comments: []});
      return {sucess: true, message: "post created successfully", id: newPostRef.id, ...post};
    } catch(error){
      console.error("Error creating post", error);
      throw error;
    }
  };
  
  export const updateBlogPost = async (id, post) => {
    if(!id || !post) return("Please an id and a new updated post content is required!");
    try{
      const postReference = doc(postCollection, id);
      await updateDoc(postReference, post);
      return {success: true, message: "post updated successfully", id, ...post};
    } catch(error){
      console.error("Error updating post", error);
      throw error;
    }
  };
  
  export const deleteBlogPost = async (id) => {
    if(!id || !post) return("Please an id of the post to delete is required!");
    try{
      const postReference = doc(postCollection, id);
      await deleteDoc(postReference);
      return {success: true, message: "post deleted successful"};
    } catch(error){
      console.error("Error deleting post", error);
    }
  };
 

export const processImage = async (image) => {
  if (!image) return "Invalid image file";

  const cloudinaryUploadURL = import.meta.env.VITE_CLOUDINARY_KEY;

  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    const response = await axios.post(cloudinaryUploadURL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};

  
  export const addComment = async (postId, comment) => {
  try {
    const postReference = doc(postCollection, postId);
    const newComment = { ...comment, id: String(Date.now()), replies: [] };
    await updateDoc(postReference, {
      comments: arrayUnion(newComment),
    });
    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const addReply = async (postId, commentId, reply) => {
  try {
    const postReference = doc(postCollection, postId);
    const postSnapshot = await getDoc(postReference);

    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      const comments = postData.comments || [];

      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), { ...reply, id: String(Date.now()) }],
          };
        }
        return comment;
      });

      await updateDoc(postReference, { comments: updatedComments });
      return reply;
    } else {
      throw new Error("Post not found");
    }
  } catch (error) {
    console.error("Error adding reply:", error);
    throw error;
  }
};
