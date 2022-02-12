import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ITEMS_LAST_UPDATED } from '../constants';
import { CustomError } from '../interfaces/error';
import { ItemUpdates } from '../interfaces/firebase';
import { Item, NewItem } from '../interfaces/item';
import { firebaseImageUpload } from './fileupload.firebase';

/**
 * get all items from firestore and updates the asyncStorage ITEM_LAST_UPDATED time
 *
 * @param lastUpdated time of the last item fetch in ms
 * @error auth/no-valid-user
 * @returns array of available items
 */
export const firebaseGetAllItems = async (lastUpdated: number): Promise<ItemUpdates> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('items')
      .where('lastModified', '>=', lastUpdated)
      .get();
    AsyncStorage.setItem(ITEMS_LAST_UPDATED, Date.now().toString());
    const updatedItems: Item[] = [];
    const deletedItemIds: string[] = [];
    response.forEach((document) => {
      if (document.data()?.deleted) {
        deletedItemIds.push(document.data().id);
      } else {
        updatedItems.push({
          calories: document.data().calories,
          carbohydrates: document.data().carbohydrates,
          fat: document.data().fat,
          id: document.id,
          imgUrl: document.data().imgUrl ?? '',
          name: document.data().name,
          protein: document.data().protein,
        });
      }
    });
    return { deletedItemIds, updatedItems };
  } catch (error) {
    console.error('getAllItems error: ', error);
    throw error;
  }
};

/**
 * get an item from firestore by id
 *
 * @param itemId id of the item to get
 * @error auth/no-valid-user
 * @returns the item on success, otherwise null
 */
export const firebaseGetItem = async (itemId: string): Promise<Item | null> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
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
    throw error;
  }
};

/**
 * updates an existing item
 *
 * @error auth/no-valid-user
 */
export const firebaseUpdateItem = async (item: Item, newImageUri?: string): Promise<void> => {
  const updatedItem = item;
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
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
      .set({ ...updatedItem, lastModified: Date.now() });
  } catch (error) {
    console.error('updateItem error: ', error);
    throw error;
  }
};

/**
 * adds an item to firestore and returns the document id
 *
 * @param newItem item to add to firestore
 * @error auth/no-valid-user
 * @returns document id on success, otherwise null
 */
export const firebaseAddItem = async (
  newItem: NewItem,
  imageUri?: string | undefined,
): Promise<void> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('items')
      .add({ ...newItem, lastModified: Date.now() });
    if (!imageUri) return;
    const downloadUrl = await firebaseImageUpload(response.id, imageUri);
    const itemWithImg: Item = { id: response.id, ...newItem, imgUrl: downloadUrl };
    await firebaseUpdateItem(itemWithImg);
  } catch (error) {
    console.error('addNewItem error: ', error);
    throw error;
  }
};

/**
 * delete an item from firestore by id
 *
 * @param itemId
 * @error auth/no-valid-user
 * @returns
 */
export const firebaseRemoveItem = async (item: Item): Promise<void> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('items')
      .doc(item.id)
      .update({
        calories: firestore.FieldValue.delete(),
        carbohydrates: firestore.FieldValue.delete(),
        deleted: true,
        fat: firestore.FieldValue.delete(),
        imgUrl: firestore.FieldValue.delete(),
        lastModified: Date.now(),
        name: firestore.FieldValue.delete(),
        protein: firestore.FieldValue.delete(),
      });
  } catch (error) {
    console.error('removeItem error: ', error);
    throw error;
  }
};
