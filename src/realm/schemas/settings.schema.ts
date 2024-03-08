/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable sort-keys */

import Realm from 'realm';

export class SettingsSchema extends Realm.Object<SettingsSchema> {
  _id!: Realm.BSON.ObjectId;

  key!: string;

  value!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Setting',
    properties: {
      _id: { type: 'objectId' },
      key: 'string',
      value: 'string',
    },
    primaryKey: '_id',
  };
}
