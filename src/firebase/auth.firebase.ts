import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { CustomError } from '../types/error';
import { auth, db } from './init.firebase';

/**
 * logs the the user in
 *
 * @param email
 * @param password
 * @error auth/invalid-email
 * @error auth/user-disabled
 * @error auth/user-not-found
 * @error auth/wrong-password
 * @error unexpectedError
 */
export const firebaseSignIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};

/**
 * creates a new user with some default values and logs the user in
 *
 * @param email
 * @param password
 * @error auth/email-already-in-use
 * @error auth/invalid-email
 * @error auth/operation-not-allowed
 * @error auth/weak-password
 * @error unexpectedError
 */
export const firebaseSignUp = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    // await firestore()
    //   .collection('users')
    //   .doc(response.user.uid)
    //   .set({ settings: { calorieTarget: 2000, wight: 0 } });
    await setDoc(doc(db, 'users', response.user.uid), {
      settings: { calorieTarget: 2000, wight: 0 },
    });
  } catch (error: any) {
    console.error('firebase signUp error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};

/**
 * loges the current firebase user out
 *
 * @error unexpectedError
 * @error unexpectedError
 */
export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('firebaseSignOut error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};

/**
 * changes the email of the current user
 *
 * @param currentPassword needed for additional security
 * @param newEmail
 * @error auth/email-already-in-use
 * @error auth/invalid-email
 * @error auth/no-valid-user
 * @error auth/requires-recent-login
 * @error auth/user-disabled
 * @error auth/user-not-found
 * @error auth/wrong-password
 * @error unexpectedError
 */
export const firebaseChangeEmail = async (currentPassword: string, newEmail: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new CustomError('auth/no-valid-user');
    const currentUserEmail = user.email;
    const currentUser = await signInWithEmailAndPassword(
      auth,
      currentUserEmail ?? '',
      currentPassword,
    );
    await updateEmail(currentUser.user, newEmail);
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};

/**
 * changes the password of the current user
 *
 * @param currentPassword needed for additional security
 * @param newPassword
 * @error auth/invalid-email
 * @error auth/no-valid-user
 * @error auth/user-disabled
 * @error auth/user-not-found
 * @error auth/wrong-password
 * @error auth/weak-password
 * @error auth/requires-recent-login
 * @error unexpectedError
 */
export const firebaseChangePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new CustomError('auth/no-valid-user');
    const currentUserEmail = user.email;
    const currentUser = await signInWithEmailAndPassword(
      auth,
      currentUserEmail ?? '',
      currentPassword,
    );
    await updatePassword(currentUser.user, newPassword);
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};

/**
 * sends an email containing a link to reset the users password
 *
 * @param email
 * @error auth/invalid-continue-uri
 * @error auth/invalid-email
 * @error auth/user-not-found
 * @error unexpectedError
 */
export const firebaseRequestPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};

/**
 * deletes all user data and user from firebase
 *
 * @error unexpectedError
 */
export const firebaseDeleteAccount = async () => {
  try {
    // TODO richtig implementieren
    // await functions().httpsCallable('deleteUser')();
    alert('Funktion "firebaseDeleteAccount" aktuell nicht verfügbar');
  } catch (error: any) {
    console.error('firebaseDeleteAccount:', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};
