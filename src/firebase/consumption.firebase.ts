import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CustomError } from '../interfaces/error';
import { ConsumedItem, Item } from '../interfaces/item';
import { getStartOfDay } from '../util/time';

/**
 * gets all consumptions of a specific day
 *
 * @param daysInThePast
 * @error auth/no-valid-user
 * @return
 */

/**
 * gets all consumptions of a specific day if they are modified after last update
 *
 * @param lastUpdated time of last update. 0 to fetch all
 * @param daysInThePast
 * @returns array with new consumed items or undefined if there are no changes after last update
 */
export const firebaseGetConsumptions = async (
  lastUpdated: number,
  daysInThePast: number,
): Promise<ConsumedItem[] | undefined> => {
  const date = getStartOfDay(daysInThePast);
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('consumptions')
      .where('date', '==', date)
      .where('lastModified', '>=', lastUpdated)
      .get();
    if (response.docs.length < 1) return undefined;
    if (response.docs[0].data().deleted) return [];
    return response.docs[0].data().items;
  } catch (error) {
    console.error(`getConsumptions error: ${error}`);
    throw error;
  }
};

// TODO funktion vereinfachen, da sie zu komplex ist
/**
 * adds an item to consumed items, if it was not consumed on that day already,
 * changes the quantity of it, if it was, removes it, if the new quantity
 * would be less than one or removes the entire day, if there are no other items
 *
 * @param daysInThePast
 * @param item
 * @param amount number of items to add to existing ones
 * @error auth/no-valid-user
 */
export const firebaseConsumeItem = async (
  daysInThePast: number,
  item: Item,
  amount: number,
): Promise<void> => {
  const date = getStartOfDay(daysInThePast);
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');

    const res = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('consumptions')
      .where('date', '==', date)
      .get();

    const document = res.docs[0];
    const consumedItems = res.docs[0]?.data().items;

    if (!document) {
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('consumptions')
        .add({
          date,
          deleted: false,
          items: [{ ...item, quantity: amount }],
          lastModified: Date.now(),
        });
      return;
    }

    if (document && document.data().deleted) {
      await document.ref.update({
        deleted: false,
        items: [{ ...item, quantity: amount }],
        lastModified: Date.now(),
      });
      return;
    }

    const index = consumedItems.findIndex((element: Item) => element.id === item.id);
    if (index === -1) {
      consumedItems.push({ ...item, quantity: amount });
    } else {
      consumedItems[index].quantity += amount;
      if (consumedItems[index].quantity <= 0) consumedItems.splice(index, 1);
      if (consumedItems.length <= 0) {
        await document.ref.update({
          date,
          deleted: true,
          items: firestore.FieldValue.delete(),
          lastModified: Date.now(),
        });
        return;
      }
    }

    await document.ref.update({ items: consumedItems, lastModified: Date.now() });
    return;
  } catch (error: any) {
    console.error(`consumeItem error: ${error}`);
    throw error;
  }
};
