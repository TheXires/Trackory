import { Item } from './item';

/**
 * All changed items 
 */
export interface ItemUpdates {
  deletedItemIds: string[];
  updatedItems: Item[];
}
