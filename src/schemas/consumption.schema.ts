/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable sort-keys */

import { ConsumedItem } from '../types/item';

export class ConsumptionSchema extends Realm.Object<ConsumptionSchema> {
  id!: Realm.BSON.ObjectId;

  date!: string;

  items!: ConsumedItem[];

  static schema: Realm.ObjectSchema = {
    name: 'Consumption',
    properties: {
      _id: { type: 'objectId', mapTo: 'id' },
      date: 'string',
      items: 'ConsumedItem[]',
    },
    primaryKey: 'id',
  };
}
