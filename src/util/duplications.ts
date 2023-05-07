/* eslint-disable no-restricted-syntax */
import { Consumption, Item } from '../types/item';

export const findDuplicateItems = (
  newItems: Item[],
  currentItems: Realm.Results<Item & Realm.Object<unknown, never>>,
): boolean => {
  if (currentItems.length === 0) return false;

  for (const newItem of newItems) {
    for (const currentItem of currentItems) {
      console.log('currentItem._id:', currentItem._id);
      console.log('newItem._id:', newItem._id);
      if (currentItem._id.equals(newItem._id)) return true;
    }
  }

  return false;
};

export const findDuplicateConsumptions = (
  newConsumptions: Consumption[],
  currentConsumptions: Realm.Results<Consumption & Realm.Object<unknown, never>>,
): boolean => {
  if (currentConsumptions.length === 0) return false;

  for (const newConsumption of newConsumptions) {
    for (const currentConsumption of currentConsumptions) {
      console.log('currentConsumption:', currentConsumption);
      console.log('newConsumption:', newConsumption);
      if (
        currentConsumption._id.equals(newConsumption._id) ||
        currentConsumption.date === newConsumption.date
      )
        return true;
    }
  }

  return false;
};
