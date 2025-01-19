import {doc, getDoc, addDoc, updateDoc, deleteDoc, arrayUnion, getDocs, collection} from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import CryptoJS from "crypto-js";

const postCollection = collection(db, "posts");

export const fetchBlogPosts = async (showUnpublished = false) => {
    try{
      const queryDatabase = await getDocs(postCollection);
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
  
  export const deleteBlogPost = async (postId) => {
    if(!postId || !image) return("Please an postId of the post to delete is required!");
    try{
      const postReference = doc(postCollection, postId);
      await deleteDoc(postReference);
      // TODOif(image !== "") await deleteImageFromCloudinary(image)
      return {success: true, message: "post deleted successful"};
    } catch(error){
      console.error("Error deleting post", error);
    }
  };

/*TODO
const deleteImageFromCloudinary = async (publicId) => {
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  const timestamp = Math.floor(Date.now() / 1000);

  const signature = CryptoJS.SHA1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`).toString();

  const url = import.meta.env.VITE_CLOUDINARY_DELETE_KEY;
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  try {
    const response = await axios.post(url, formData);
    if (response.data.result === "ok") {
      console.log("Image deleted successfully:", response.data);
    } else {
      console.error("Failed to delete image:", response.data);
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};
*/


  export const addComment = async (postId, comment) => {
  try {
    const postReference = doc(postCollection, postId);
    const newComment = { ...comment, date: new Date().toISOString(), id: String(Date.now()), replies: [] };
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


export const handleLikePost = async (postId, userId) => {
  if (!postId || !userId) return "Missing userId or invalid postId";

  try {
    const postReference = doc(postCollection, postId);
    const postSnapshot = await getDoc(postReference);

    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      const likes = postData.likes || [];

      let updatedLikes;

      if (likes.includes(userId)) {
     updatedLikes = likes.filter((id) => id !== userId);
      } else {
        updatedLikes = [...likes, userId];
      }
      await updateDoc(postReference, { likes: updatedLikes });

      return {
        success: true,
        message: likes.includes(userId)
          ? "Post unliked successfully"
          : "Post liked successfully",
        likes: updatedLikes,
      };
    } else {
      throw new Error("Post not found");
    }
  } catch (error) {
    console.error("Error handling likes:", error);
    throw error;
  }
};
