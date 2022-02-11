import { firebaseAddItem } from '../firebase/items.firebase';
import { Item, NewItem, UpdateItem } from '../interfaces/item';

export const mergeItems = (updatedItem: UpdateItem, oldItem: Item): Item => {
  const mergedItem: Item = {
    calories: updatedItem.calories ?? oldItem.calories,
    carbohydrates: updatedItem.carbohydrates ?? oldItem.carbohydrates,
    fat: updatedItem.fat ?? oldItem.fat,
    id: oldItem.id,
    imgUrl: updatedItem.imgUri ?? oldItem.imgUrl,
    name: updatedItem.name ?? oldItem.name,
    protein: updatedItem.protein ?? oldItem.protein,
  };
  return mergedItem;
};

export const createNewItem = (item: NewItem) => {
  const newItem: NewItem = {
    calories: item.calories ?? 0,
    carbohydrates: item.carbohydrates ?? 0,
    fat: item.fat ?? 0,
    imgUri: item.imgUri ?? '',
    name: item.name,
    protein: item.protein ?? 0,
  };
  return newItem;
};
