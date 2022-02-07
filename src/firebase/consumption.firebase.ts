import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ConsumedItem, Item } from '../interfaces/item';
import { getStartOfDayInPast } from '../util/time';

/**
 * gets all consumptions of a specific day
 *
 * @param daysInThePast
 */
export const firebaseGetConsumptions = async (
  daysInThePast: number,
): Promise<ConsumedItem[]> => {
  const date = getStartOfDayInPast(daysInThePast);
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw 'no current user found';
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
  }
  return [];
};

/**
 * adds an item to consumed items, if it was not consumed on that day already,
 * changes the quantity of it, if it was, removes it, if the new quantity
 * would be less than one or removes the entire day, if there are no other items
 *
 * @param daysInThePast
 * @param item
 * @param amount number of items to add to existing ones
 */
export const firebaseConsumeItem = async (
  daysInThePast: number,
  item: Item,
  amount: number,
): Promise<1 | -1> => {
  const date = getStartOfDayInPast(daysInThePast);
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw 'no current user found';
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
      const response = await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('consumptions')
        .add({ date, items: [{ ...item, quantity: amount }] });
      if (!response) throw 'unable to create item in firestore';
    } else {
      const index = consumedItems.findIndex((element: Item) => element.id === item.id);
      if (index === -1) {
        consumedItems.push({ ...item, quantity: amount });
      } else {
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
          return 1;
        }
      }
      // if there already were consumptions and still are, after changing the amount
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('consumptions')
        .doc(consumptionID)
        .update({ items: consumedItems });
    }
    return 1;
  } catch (error) {
    console.error(`consumeItem error: ${error}`);
  }
  return -1;
};
