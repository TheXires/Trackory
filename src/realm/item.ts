/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable sort-keys */

export class ItemSchema extends Realm.Object<ItemSchema> {
  calories!: number;

  carbohydrates: number = 0;

  fat: number = 0;

  id!: string;

  imgUrl?: string;

  name!: string;

  protein: number = 0;

  static schema: Realm.ObjectSchema = {
    name: 'Item',
    properties: {
      calories: 'double',
      carbohydrates: 'double',
      fat: 'double',
      // TODO muss id bestimmter datentyp sein?
      id: 'string',
      imgUrl: 'string?',
      name: 'string',
      protein: 'double',
    },
    primaryKey: 'id',
  };
}

export const ItemSchema2 = {
  name: 'Item',
  properties: {
    calories: 'double',
    carbohydrates: 'double',
    fat: 'double',
    id: 'string',
    imgUrl: { type: 'string', optional: true },
    name: 'string',
    protein: 'double',
  },
  primaryKey: 'id',
};
