/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable sort-keys */

export class consumedItemSchema extends Realm.Object<consumedItemSchema> {
  calories!: number;

  carbohydrates: number = 0;

  fat: number = 0;

  id!: Realm.BSON.ObjectId;

  imgUrl?: string;

  name!: string;

  protein: number = 0;

  quantity!: number;

  static schema: Realm.ObjectSchema = {
    name: 'ConsumedItem',
    properties: {
      _id: { type: 'objectId', mapTo: 'id' },
      calories: 'double',
      carbohydrates: 'double',
      fat: 'double',
      imgUrl: 'string?',
      name: 'string',
      protein: 'double',
      quantity: 'int',
    },
    primaryKey: 'id',
  };
}
