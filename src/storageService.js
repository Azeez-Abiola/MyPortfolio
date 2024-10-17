// src/services/storageService.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

// Upload an image and get its URL
export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log('File available at', url);
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};