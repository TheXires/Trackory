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
  imgUrl?: string;
  name: string;
  protein: number;
}

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
