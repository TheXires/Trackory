/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable sort-keys */

import Realm from 'realm';

export class ConsumedItemSchema extends Realm.Object<ConsumedItemSchema> {
  _id!: Realm.BSON.ObjectId;

  calories!: number;

  carbohydrates: number = 0;

  fat: number = 0;

  image?: string;

  name!: string;

  protein: number = 0;

  quantity!: number;

  static schema: Realm.ObjectSchema = {
    name: 'ConsumedItem',
    properties: {
      _id: 'objectId',
      calories: 'double',
      carbohydrates: 'double',
      fat: 'double',
      image: 'string?',
      name: 'string',
      protein: 'double',
      quantity: 'int',
    },
  };
}
