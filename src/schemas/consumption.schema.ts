/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable sort-keys */

import { ConsumedItem } from '../types/item';

export class ConsumptionSchema extends Realm.Object<ConsumptionSchema> {
  _id!: Realm.BSON.ObjectId;

  date!: string;

  items!: Realm.List<ConsumedItem>;

  static schema: Realm.ObjectSchema = {
    name: 'Consumption',
    properties: {
      _id: 'objectId',
      date: 'string',
      items: {
        type: 'list',
        objectType: 'ConsumedItem',
      },
    },
    primaryKey: '_id',
  };
}
