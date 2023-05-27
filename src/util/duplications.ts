/* eslint-disable no-restricted-syntax */
import { Consumption, Item } from '../types/item';

/**
 * Checks if there are any duplicate items
 *
 * @param newItems
 * @param currentItems
 * @returns
 */
export const findDuplicateItems = (
  newItems: Item[],
  currentItems: Realm.Results<Item & Realm.Object<unknown, never>>,
): boolean => {
  if (currentItems.length === 0) return false;

  for (const newItem of newItems) {
    for (const currentItem of currentItems) {
      if (currentItem._id.equals(newItem._id)) return true;
    }
  }

  return false;
};

/**
 * Checks if there are any duplicate consumptions
 *
 * @param newConsumptions
 * @param currentConsumptions
 * @returns
 */
export const findDuplicateConsumptions = (
  newConsumptions: Consumption[],
  currentConsumptions: Realm.Results<Consumption & Realm.Object<unknown, never>>,
): boolean => {
  if (currentConsumptions.length === 0) return false;

  for (const newConsumption of newConsumptions) {
    for (const currentConsumption of currentConsumptions) {
      if (
        currentConsumption._id.equals(newConsumption._id) ||
        currentConsumption.date === newConsumption.date
      )
        return true;
    }
  }

  return false;
};
