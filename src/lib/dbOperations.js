// src/lib/dbOperations.js
import { db } from './firebase'; // Adjust the path if necessary
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveUserProgress = async (userId, progressData) => {
  try {
    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, progressData, { merge: true });
    console.log('User progress saved successfully!');
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
};

export const fetchUserProgress = async (userId) => {
  try {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log('No such user document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }
};
