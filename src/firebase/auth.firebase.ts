import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { CustomError } from '../interfaces/error';

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
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};

/**
 * creates a new user and logs the user in
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
    const response = await auth().createUserWithEmailAndPassword(email, password);
    await firestore()
      .collection('users')
      .doc(response.user.uid)
      .set({ settings: { calorieTarget: 2100 } });
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
    await auth().signOut();
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
    const currentUserEmail = auth().currentUser?.email;
    if (!currentUserEmail) throw new CustomError('auth/no-valid-user');
    const currentUser = await auth().signInWithEmailAndPassword(currentUserEmail, currentPassword);
    await currentUser.user.updateEmail(newEmail);
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
    const currentUserEmail = auth().currentUser?.email;
    if (!currentUserEmail) throw new CustomError('auth/no-valid-user');
    const currentUser = await auth().signInWithEmailAndPassword(currentUserEmail, currentPassword);
    await currentUser.user.updatePassword(newPassword);
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
    await auth().sendPasswordResetEmail(email);
    throw new CustomError('invalid value');
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
    await functions().httpsCallable('deleteUser')();
  } catch (error: any) {
    console.error('firebaseDeleteAccount:', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};
