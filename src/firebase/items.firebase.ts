import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Item, NewItem } from '../interfaces/item';
import { firebaseImageUpload } from './fileupload.firebase';

/**
 * get all items from firestore
 *
 * @returns array of available items
 */
export const firebaseGetAllItems = async (): Promise<Item[]> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw 'no current user found';
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('items')
      .get();
    const items: Item[] = [];
    response.forEach((document) =>
      items.push({
        calories: document.data().calories,
        carbohydrates: document.data().carbohydrates,
        fat: document.data().fat,
        id: document.id,
        imgUrl: document.data().imgUrl ?? '',
        name: document.data().name,
        protein: document.data().protein,
      }),
    );
    return items;
  } catch (error) {
    console.error('getAllItems error: ', error);
  }
  return [];
};

/**
 * get an item from firestore by id
 *
 * @param itemId id of the item to get
 * @returns the item on success, otherwise null
 */
export const firebaseGetItem = async (itemId: string): Promise<Item | null> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw 'no current user found';
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('items')
      .doc(itemId)
      .get();
    if (!response.data()) return null;
    return {
      id: itemId,
      ...response.data(),
    } as Item;
  } catch (error) {
    console.error('getItem error: ', error);
  }
  return null;
};

/**
 * updates an existing item
 *
 * @returns 1 on success, otherwise -1
 */
export const firebaseUpdateItem = async (
  item: Item,
  newImageUri?: string,
): Promise<1 | -1> => {
  const updatedItem = item;
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw 'no current user found';
    let downloadUrl;
    if (newImageUri) {
      downloadUrl = await firebaseImageUpload(item.id, newImageUri);
      if (!downloadUrl) throw 'unable to upload image';
      updatedItem.imgUrl = downloadUrl;
    }
    await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('items')
      .doc(updatedItem.id)
      .set(updatedItem);
    return 1;
  } catch (error) {
    console.error('updateItem error: ', error);
  }
  return -1;
};

/**
 * adds an item to firestore and returns the document id
 *
 * @param newItem item to add to firestore
 * @returns document id on success, otherwise null
 */
export const firebaseAddItem = async (
  newItem: NewItem,
  imageUri?: string | undefined,
): Promise<Item | null> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw 'no current user found';
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('items')
      .add(newItem);
    if (!response) throw 'unable to create item in firestore';
    if (!imageUri) return { id: response.id, ...newItem };
    const downloadUrl = await firebaseImageUpload(response.id, imageUri);
    if (!downloadUrl) throw 'unable to upload image';
    const itemWithImg: Item = { id: response.id, ...newItem, imgUrl: downloadUrl };
    const updateResponse = await firebaseUpdateItem(itemWithImg);
    if (updateResponse === -1) throw 'unable to add image to item';
    return itemWithImg;
  } catch (error) {
    console.error('addNewItem error: ', error);
  }
  return null;
};

/**
 * delete an item from firestore by id
 *
 * @param itemId
 * @returns
 */
export const firebaseRemoveItem = async (itemId: string): Promise<void> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw 'no current user found';
    await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('items')
      .doc(itemId)
      .delete();
  } catch (error) {
    console.error('removeItem error: ', error);
    throw 'firebase/unknown';
  }
};
