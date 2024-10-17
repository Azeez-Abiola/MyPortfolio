// src/services/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

/**
 * Sign up a new user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} - The user credential object.
 */
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    // Map Firebase error codes to user-friendly messages
    throw new Error(mapFirebaseError(error));
  }
};

/**
 * Log in an existing user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} - The user credential object.
 */
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error(mapFirebaseError(error));
  }
};

/**
 * Log out the current user.
 * @returns {Promise<void>}
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Failed to log out. Please try again.');
  }
};

/**
 * Map Firebase error codes to user-friendly messages.
 * @param {FirebaseError} error - The Firebase error object.
 * @returns {string} - A user-friendly error message.
 */
const mapFirebaseError = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already in use. Please try another one.';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/weak-password':
      return 'The password is too weak. Please choose a stronger password.';
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};