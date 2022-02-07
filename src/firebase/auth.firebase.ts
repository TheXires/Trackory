import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * logs the the user in
 *
 * @param email
 * @param password
 */
export const firebaseSignIn = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error: any) {
    console.error(error);
    throw error.code;
  }
};

/**
 * creates a new user and logs the user in
 *
 * @param email
 * @param password
 */
export const firebaseSignUp = async (email: string, password: string) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(email, password);
    await firestore()
      .collection('users')
      .doc(response.user.uid)
      .set({ settings: { calorieTarget: 2100 } });
  } catch (error) {
    console.error('firebase signUp error: ', error);
    throw error;
  }
};

/**
 * loges the current firebase user out
 */
export const firebaseSignOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error('firebaseSignOut error: ', error);
    throw error;
  }
};
