/**
 * Default Item
 */
export interface Item {
  calories: number;
  carbohydrates: number;
  fat: number;
  id: string;
  imgUrl: string | undefined;
  name: string;
  protein: number;
}

/**
 * Special form of item without Id to create a new item
 */
export interface NewItem {
  calories: number;
  carbohydrates: number;
  fat: number;
  imgUrl: string | undefined;
  name: string;
  protein: number;
}
/**
 * All properties of NewItem as Type
 */
export type NewItemPropertyType =
  | 'calories'
  | 'carbohydrates'
  | 'fat'
  | 'imgUrl'
  | 'name'
  | 'protein';

  /**
   * Special form of Item where all values are optional to update an item
   */
export interface UpdateItem {
  calories: number | undefined;
  carbohydrates: number | undefined;
  fat: number | undefined;
  imgUrl: string | undefined;
  name: string | undefined;
  protein: number | undefined;
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
export interface ConsumedItem {
  calories: number;
  carbohydrates: number;
  fat: number;
  id: string;
  imgUrl: string | undefined;
  name: string;
  protein: number;
  quantity: number;
}

/**
 * Consumption with consumed items and date of consumption
 */
export interface Consumption {
  date: number;
  items: ConsumedItem[];
}
