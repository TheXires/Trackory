import { createRealmContext } from '@realm/react';
import { ConsumedItemSchema } from './schemas/consumedItem.schema';
import { ConsumptionSchema } from './schemas/consumption.schema';
import { ItemSchema } from './schemas/item.schema';

/**
 * Realm context for the app.
 */
export const RealmContext = createRealmContext({
  schema: [ItemSchema, ConsumedItemSchema, ConsumptionSchema],
  schemaVersion: 2,
});
