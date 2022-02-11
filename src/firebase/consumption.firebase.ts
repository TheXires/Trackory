import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CustomError } from '../interfaces/error';
import { ConsumedItem, Item } from '../interfaces/item';
import { getStartOfDayInPast } from '../util/time';

/**
 * gets all consumptions of a specific day
 *
 * @param daysInThePast
 * @error auth/no-valid-user
 */
export const firebaseGetConsumptions = async (
  daysInThePast: number,
): Promise<ConsumedItem[]> => {
  const date = getStartOfDayInPast(daysInThePast);
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('consumptions')
      .where('date', '==', date)
      .get();
    if (response.docs.length < 1) return [];
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
  const date = getStartOfDayInPast(daysInThePast);
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const res = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('consumptions')
      .where('date', '==', date)
      .get();
    const consumedItems = res.docs[0]?.data().items;
    const consumptionID = res.docs[0]?.id;
    // if there are no consumptions for the date
    if (consumedItems == null) {
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('consumptions')
        .add({ date, items: [{ ...item, quantity: amount }] });
      return;
    }
    const index = consumedItems.findIndex((element: Item) => element.id === item.id);
    if (index === -1) {
      // if there already were items but not this item
      consumedItems.push({ ...item, quantity: amount });
    } else {
      // if there already was this item
      consumedItems[index].quantity += amount;
      if (consumedItems[index].quantity <= 0) consumedItems.splice(index, 1);
      // if there are no consumptions after changing the amount
      if (consumedItems.length <= 0) {
        await firestore()
          .collection('users')
          .doc(currentUserId)
          .collection('consumptions')
          .doc(consumptionID)
          .delete();
        return;
      }
    }
    await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('consumptions')
      .doc(consumptionID)
      .update({ items: consumedItems });
    return;
  } catch (error: any) {
    console.error(`consumeItem error: ${error}`);
    throw error;
  }
};
