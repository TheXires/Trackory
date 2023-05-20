import { createRealmContext } from '@realm/react';
import { ConsumedItemSchema } from './schemas/consumedItem.schema';
import { ConsumptionSchema } from './schemas/consumption.schema';
import { ItemSchema } from './schemas/item.schema';
import { SettingsSchema } from './schemas/settings.schema';

/**
 * Realm context for the app.
 */
export const RealmContext = createRealmContext({
  schema: [ItemSchema, ConsumedItemSchema, ConsumptionSchema, SettingsSchema],
  schemaVersion: 2,
});
