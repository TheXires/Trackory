import { Item, NewItem, UpdateItem } from '../interfaces/item';

/**
 * completes the item with values of the fallbackItem if value is undefined
 *
 * @param item the possibly not completed item
 * @param fallbackItem the item to fallback to
 * @returns the completed item
 */
export const mergeItems = (item: UpdateItem, fallbackItem: Item): Item => {
  const mergedItem: Item = {
    calories: item.calories ?? fallbackItem.calories,
    carbohydrates: item.carbohydrates ?? fallbackItem.carbohydrates,
    fat: item.fat ?? fallbackItem.fat,
    id: fallbackItem.id,
    imgUrl: item.imgUrl ?? fallbackItem.imgUrl,
    name: item.name ?? fallbackItem.name,
    protein: item.protein ?? fallbackItem.protein,
  };
  return mergedItem;
};

/**
 * completes the item with default values to save it to firebase
 *
 * @param item the item possibly not completed for saving to firebase
 * @returns the completed item
 */
export const createNewItem = (item: NewItem) => {
  const newItem: NewItem = {
    calories: item.calories ?? 0,
    carbohydrates: item.carbohydrates ?? 0,
    fat: item.fat ?? 0,
    imgUrl: item.imgUrl ?? '',
    name: item.name,
    protein: item.protein ?? 0,
  };
  return newItem;
};

/**
 * removes items from the items array if their id is in the deletedItemsIds array
 *
 * @param items
 * @param deletedItemIds
 * @returns the new items
 */
export const deleteItems = (items: Item[], deletedItemIds: string[]): Item[] => {
  deletedItemIds.forEach((id) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) items.splice(index, 1);
  });
  return items;
};

/**
 * updates an item array with items from an other array
 *
 * @param baseItems item array that should be updated
 * @param updatedItems item array with the updated items
 * @returns the updated item array
 */
export const mergeItemArrays = (baseItems: Item[], updatedItems: Item[]): Item[] => {
  const result: Item[] = [...baseItems];

  updatedItems.forEach((updatedItem) => {
    const index = result.findIndex((baseItem) => updatedItem.id === baseItem.id);
    if (index === -1) {
      result.push(updatedItem);
    } else {
      result[index] = updatedItem;
    }
  });

  return result;
};
