import { Item } from './item';

export interface ItemUpdates {
  deletedItemIds: string[];
  updatedItems: Item[];
}
