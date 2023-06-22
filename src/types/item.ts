/**
 * Default Item
 */
export interface Item {
  _id: Realm.BSON.ObjectId;
  calories: number;
  carbohydrates: number;
  fat: number;
  image?: string;
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
  _id: Realm.BSON.ObjectId;
  date: string;
  items: ConsumedItem[];
}
