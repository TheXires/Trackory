/**
 * Default Item
 */
export interface Item {
  _id: Realm.BSON.ObjectId;
  calories: number;
  carbohydrates: number;
  fat: number;
  image?: ArrayBuffer;
  imgUrl?: string;
  name: string;
  protein: number;
}

/**
 * All properties of NewItem as Type
 */
export type ItemPropertyType =
  | '_id'
  | 'calories'
  | 'carbohydrates'
  | 'fat'
  | 'image'
  | 'imgUrl'
  | 'name'
  | 'protein';

/**
 * Special form of Item where all values are optional to update an item
 */
export interface UpdateItem {
  calories?: number;
  carbohydrates?: number;
  fat?: number;
  imgUrl?: string;
  name?: string;
  protein?: number;
}
/**
 * All properties of UpdateItem as Type
 */
export type UpdateItemPropertyType =
  | 'calories'
  | 'carbohydrates'
  | 'fat'
  | 'imgUrl'
  | 'name'
  | 'protein';

/**
 * Special form of Item with quantity as number of consumptions
 */
export interface ConsumedItem extends Item {
  quantity: number;
}

/**
 * Consumption with consumed items and date of consumption
 */
export interface Consumption {
  date: string;
  items: ConsumedItem[];
}
