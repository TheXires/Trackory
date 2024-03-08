/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable sort-keys */

import Realm from 'realm';

export class ItemSchema extends Realm.Object<ItemSchema> {
  _id!: Realm.BSON.ObjectId;

  calories!: number;

  carbohydrates: number = 0;

  fat: number = 0;

  image?: string;

  name!: string;

  protein: number = 0;

  static schema: Realm.ObjectSchema = {
    name: 'Item',
    properties: {
      _id: { type: 'objectId' },
      calories: 'double',
      carbohydrates: 'double',
      fat: 'double',
      image: 'string?',
      name: 'string',
      protein: 'double',
    },
    primaryKey: '_id',
  };
}
