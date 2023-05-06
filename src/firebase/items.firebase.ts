import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ITEMS_LAST_UPDATED } from '../constants';
import { CustomError } from '../types/error';
import { ItemUpdates } from '../types/firebase';
import { Item } from '../types/item';
import { firebaseImageUpload } from './fileupload.firebase';
import { auth, db } from './init.firebase';

/**
 * get all items from firestore and updates the asyncStorage ITEM_LAST_UPDATED time
 *
 * @param lastUpdated time of the last item fetch in ms
 * @error auth/no-valid-user
 * @error unable-to-get-item
 * @returns array of available items
 */
export const firebaseGetAllItems = async (lastUpdated: number): Promise<ItemUpdates> => {
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await getDocs(
      query(
        collection(db, 'users', currentUserId, 'items'),
        where('lastModified', '>=', lastUpdated),
      ),
    );
    AsyncStorage.setItem(ITEMS_LAST_UPDATED, Date.now().toString());
    const updatedItems: Item[] = [];
    const deletedItemIds: string[] = [];
    response.docs.forEach((document) => {
      if (document.data()?.deleted) {
        deletedItemIds.push(document.id);
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
  } catch (error: any) {
    console.error('getAllItems error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-add-item', error);
  }
};

/**
 * get an item from firestore by id
 *
 * @param itemId id of the item to get
 * @error auth/no-valid-user
 * @error unable-to-get-item
 * @returns the item on success, otherwise null
 */
export const firebaseGetItem = async (itemId: string): Promise<Item | null> => {
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await getDoc(doc(db, 'users', currentUserId, 'items', itemId));
    if (!response.data()) return null;
    return {
      id: itemId,
      ...response.data(),
    } as Item;
  } catch (error: any) {
    console.error('getItem error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-add-item', error);
  }
};

/**
 * updates an existing item
 *
 * @error auth/no-valid-user
 * @error unable-to-update-item
 */
export const firebaseUpdateItem = async (item: Item): Promise<void> => {
  const updatedItem = item;
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    // need to check whether the url of the image starts with 'https://' or not
    // to know if the image is already uploaded and no action is necessary
    // or is the uri of a local image that needs to be uploaded
    if (item.imgUrl && !item.imgUrl?.startsWith('https://')) {
      const downloadUrl = await firebaseImageUpload(item.imgUrl);
      if (!downloadUrl) throw new CustomError('unable-to-upload-image');
      updatedItem.imgUrl = downloadUrl;
    }
    await updateDoc(doc(db, 'users', currentUserId, 'items', updatedItem.id), {
      ...updatedItem,
      lastModified: Date.now(),
    });
  } catch (error: any) {
    console.error('updateItem error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-add-item', error);
  }
};

/**
 * delete an item from firestore by id
 *
 * @param itemId
 * @error auth/no-valid-user
 * @error unable-to-remove-item
 * @returns
 */
export const firebaseRemoveItem = async (item: Item): Promise<void> => {
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    await updateDoc(doc(db, 'users', currentUserId, 'items', item.id), {
      calories: deleteField(),
      carbohydrates: deleteField(),
      deleted: true,
      fat: deleteField(),
      imgUrl: deleteField(),
      lastModified: Date.now(),
      name: deleteField(),
      protein: deleteField(),
    });
  } catch (error: any) {
    console.error('removeItem error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-add-item', error);
  }
};
