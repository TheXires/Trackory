import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

// eslint-disable-next-line import/prefer-default-export
export const firebaseImageUpload = async (
  itemId: string,
  imageUri: string,
): Promise<string | undefined> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw 'no current user found';
    await storage().ref(`${currentUserId}/images/${itemId}.jpg`).putFile(imageUri);
    const downloadUrl = await storage()
      .ref(`${currentUserId}/images/${itemId}.jpg`)
      .getDownloadURL();
    return downloadUrl;
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
