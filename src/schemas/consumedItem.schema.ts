/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable sort-keys */

export class consumedItemSchema extends Realm.Object<consumedItemSchema> {
  _id!: Realm.BSON.ObjectId;

  calories!: number;

  carbohydrates: number = 0;

  fat: number = 0;

  image?: ArrayBuffer;

  imgUrl?: string;

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
      image: 'data?',
      imgUrl: 'string?',
      name: 'string',
      protein: 'double',
      quantity: 'int',
    },
    primaryKey: '_id',
  };
}
