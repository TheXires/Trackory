export interface Item {
  calories: number;
  carbohydrates: number;
  fat: number;
  id: string;
  imgUrl?: string;
  name: string;
  protein: number;
}

export interface NewItem {
  calories: number;
  carbohydrates: number;
  fat: number;
  imgUrl: string | undefined;
  name: string;
  protein: number;
}
export type NewItemPropertyType =
  | 'calories'
  | 'carbohydrates'
  | 'fat'
  | 'imgUri'
  | 'name'
  | 'protein';

export interface UpdateItem {
  calories: number | undefined;
  carbohydrates: number | undefined;
  fat: number | undefined;
  imgUrl: string | undefined;
  name: string | undefined;
  protein: number | undefined;
}
export type UpdateItemPropertyType =
  | 'calories'
  | 'carbohydrates'
  | 'fat'
  | 'imgUri'
  | 'name'
  | 'protein';

export interface ConsumedItem {
  calories: number;
  carbohydrates: number;
  fat: number;
  id: string;
  imgUrl?: string;
  name: string;
  protein: number;
  quantity: number;
}

export interface Consumption {
  date: number;
  items: ConsumedItem[];
}
